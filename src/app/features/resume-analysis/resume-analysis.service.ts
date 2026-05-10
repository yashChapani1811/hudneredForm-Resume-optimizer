import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { OpenRouterChatResponse, ResumeAnalysis } from './resume-analysis.types';

const SYSTEM_PROMPT = `You are an expert resume reviewer, ATS (Applicant Tracking System) evaluator, and career coach with deep knowledge of modern hiring practices across tech and non-tech industries.

Your task is to analyze a resume and provide a detailed, structured evaluation.

IMPORTANT RULES:

* Respond with ONLY a valid JSON object
* Do NOT include markdown, explanations, or extra text
* Be specific, practical, and actionable
* Think like a recruiter and ATS system
* Evaluate both content quality and keyword optimization

---

SCORING CRITERIA (strict evaluation):

1. Structure & Formatting (20 points)

* Clear sections (Summary, Skills, Experience, Projects, Education)
* Proper headings and readability
* Bullet points usage

2. Content Quality (25 points)

* Clear, concise, professional language
* Avoid generic words (hardworking, responsible)
* Strong action verbs (developed, built, optimized)

3. Experience Impact (25 points)

* Measurable achievements (numbers, % improvements)
* Real impact shown (not just responsibilities)
* Role clarity and progression

4. Skills & Keywords (15 points)

* Relevant technical or domain skills
* ATS keyword optimization
* Matching industry standards

5. Completeness (15 points)

* Contact details (email, phone, LinkedIn)
* Projects (especially for freshers)
* No missing critical sections

---

OUTPUT FORMAT (STRICT):

{
"overallScore": <number 0-100>,

"summary": "<2-4 sentences summarizing resume quality, ATS readiness, and main gaps>",

"strengths": [
"<specific strength>",
"<specific strength>"
],

"improvements": [
{
"title": "<short issue name>",
"detail": "<clear actionable fix>"
}
],

"atsNotes": [
"<keyword or ATS optimization tip>",
"<formatting or parsing tip>"
],

"redFlags": [
"<major issue if any, else empty>"
]
}

---

ANALYSIS INSTRUCTIONS:

* Penalize resumes that:

  * Lack measurable achievements
  * Use generic phrases
  * Have poor structure
  * Miss important sections

* Reward resumes that:

  * Show impact with numbers
  * Use strong action verbs
  * Are ATS-friendly and keyword-rich

* If resume is weak:
  → Be honest but constructive

* If resume is strong:
  → Still suggest improvements

* If important information is missing:
  → Mention clearly in "improvements" or "redFlags"

---

TONE:

* Professional
* Direct
* Helpful (not harsh)
* Specific (no vague advice)

---

RESUME TEXT:
{{PASTE_RESUME_TEXT_HERE}}
`;

const MAX_RESUME_CHARS = 16_000;

@Injectable({ providedIn: 'root' })
export class ResumeAnalysisService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);

  readonly extractedText = signal('');
  readonly hasUploadedFile = signal(false);
  readonly analysis = signal<ResumeAnalysis | null>(null);
  readonly isAnalyzing = signal(false);
  readonly analysisError = signal<string | null>(null);

  readonly hasExtractedText = computed(() => this.extractedText().trim().length > 0);
  readonly showWaitingHint = computed(
    () => !this.hasExtractedText() && !this.isAnalyzing() && !this.analysis() && !this.analysisError(),
  );

  syncAfterExtraction(text: string): void {
    this.extractedText.set(text);
    this.analysis.set(null);
    this.analysisError.set(null);
  }

  markFileUploaded(uploaded: boolean): void {
    this.hasUploadedFile.set(uploaded);
  }

  async runAnalysis(): Promise<void> {
    const text = this.extractedText().trim();
    if (!text) {
      return;
    }

    const { api_key: apiKey, api_url: configuredUrl, model_name: model } = environment.ai_model;
    const usesSameOriginProxy = configuredUrl.startsWith('/');
    if (!apiKey && !usesSameOriginProxy) {
      this.analysisError.set(
        'No API key configured and no same-origin proxy URL. Set environment.ai_model.api_url to a path like /api/openrouter/v1/chat/completions or provide api_key for direct browser calls.',
      );
      return;
    }

    const apiUrl = this.resolveApiUrl(configuredUrl);

    this.isAnalyzing.set(true);
    this.analysisError.set(null);
    this.analysis.set(null);

    const clipped =
      text.length > MAX_RESUME_CHARS ? `${text.slice(0, MAX_RESUME_CHARS)}\n\n[truncated for length]` : text;

    const origin =
      (typeof this.document.defaultView !== 'undefined' && this.document.defaultView?.location?.origin) ||
      'http://localhost:4200';

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (!usesSameOriginProxy) {
      headers = headers.set('HTTP-Referer', origin).set('X-Title', 'HundredForm Resume Optimizer');
    }
    if (apiKey) {
      headers = headers.set('Authorization', `Bearer ${apiKey}`);
    }

    const body = {
      model,
      temperature: 0.35,
      max_tokens: 2500,
      messages: [
        { role: 'system' as const, content: SYSTEM_PROMPT },
        {
          role: 'user' as const,
          content: `Resume text:\n\n${clipped}`,
        },
      ],
    };

    try {
      const res = await lastValueFrom(this.http.post<OpenRouterChatResponse>(apiUrl, body, { headers }));
      const errMsg = res.error?.message;
      if (errMsg) {
        throw new Error(errMsg);
      }
      const firstChoice = res.choices?.[0];
      const choiceError = firstChoice?.error?.message;
      if (choiceError) {
        const provider = firstChoice?.error?.metadata?.provider_name;
        const code = firstChoice?.error?.code;
        throw new Error(
          `Model provider error${provider ? ` (${provider})` : ''}${code ? ` [${code}]` : ''}: ${choiceError}`,
        );
      }

      const raw = firstChoice?.message?.content?.trim();
      if (!raw) {
        throw new Error(
          'The model returned no content. This usually means provider-side failure or truncated generation; retry once or switch model.',
        );
      }
      const parsed = this.parseAnalysisJson(raw);
      this.analysis.set(parsed);
    } catch (e) {
      const message = this.formatAnalysisFailure(e, configuredUrl);
      this.analysisError.set(message);
      console.error('Resume AI analysis failed:', e);
    } finally {
      this.isAnalyzing.set(false);
    }
  }

  private resolveApiUrl(configuredUrl: string): string {
    if (!configuredUrl.startsWith('/')) {
      return configuredUrl;
    }
    const win = this.document.defaultView;
    if (win?.location?.origin) {
      return `${win.location.origin}${configuredUrl}`;
    }
    return configuredUrl;
  }

  private formatAnalysisFailure(e: unknown, configuredApiUrl: string): string {
    if (e instanceof HttpErrorResponse) {
      const apiErr = this.parseOpenRouterErrorPayload(e.error);
      const nestedMsg = apiErr?.message;
      const nestedCode = apiErr?.code;

      // OpenRouter returns HTTP 401 with body like { "error": { "message": "User not found.", "code": 401 } }
      if (e.status === 401 || nestedCode === 401) {
        if (typeof nestedMsg === 'string' && nestedMsg.includes('No user or org id found in auth cookie')) {
          return (
            'OpenRouter received this request without valid auth context. In production, your backend proxy must send ' +
            '`Authorization: Bearer <OPENROUTER_API_KEY>` on every call. If you use Angular SSR server, set OPENROUTER_API_KEY ' +
            'for the Node process that runs `dist/.../server/server.mjs` and restart it. If you use another proxy, set ' +
            'the API key there (do not rely on browser cookies).'
          );
        }
        const head = nestedMsg || 'Unauthorized';
        return (
          `${head} OpenRouter rejected this API key. Fix: open https://openrouter.ai/settings/keys — create a new key if needed, ` +
          `copy the full \`sk-or-v1-…\` value into repo-root \`.env\` as OPENROUTER_API_KEY=… (no quotes, no spaces around \`=\`), ` +
          `restart landing-server or your Node proxy, then verify in a terminal: ` +
          `curl -s -H "Authorization: Bearer YOUR_KEY" https://openrouter.ai/api/v1/auth/key`
        );
      }

      const metaRaw = apiErr?.metadataRaw;
      const providerName = apiErr?.providerName;

      // OpenRouter upstream / routing (HTTP 503 or error.code 503), not our proxy "missing key"
      if (
        (e.status === 503 || nestedCode === 503) &&
        (metaRaw === 'no healthy upstream' ||
          nestedMsg === 'Provider returned error' ||
          (typeof nestedMsg === 'string' && nestedMsg.includes('Provider returned error')))
      ) {
        return (
          `OpenRouter could not route this request to a healthy model host` +
          (providerName ? ` (provider: ${providerName})` : '') +
          (metaRaw ? ` — ${metaRaw}` : '') +
          `. Often temporary: retry in a minute. If it persists, change ` +
          `\`environment.ts\` → \`ai_model.model_name\` to \`openrouter/free\` or another model from ` +
          `https://openrouter.ai/models (free tiers can be flaky; paid models are steadier).`
        );
      }

      if (nestedMsg) {
        return nestedMsg;
      }

      if (e.status === 503 && configuredApiUrl.startsWith('/')) {
        return 'The AI proxy is running but OPENROUTER_API_KEY is not set on the server. Set that environment variable and restart the Node server.';
      }
      if ((e.status === 404 || e.status === 405) && configuredApiUrl.startsWith('/')) {
        return (
          'HTTP ' +
          e.status +
          ' on the AI proxy path. Static hosts (serve, http-server, Python http.server, IIS static, etc.) ' +
          'usually return 404/405 for POST. Run the Angular Node server instead, for example: ' +
          'set OPENROUTER_API_KEY=your_key & set PORT=8080 & node dist/hundredForm-converter/server/server.mjs ' +
          '(PowerShell: $env:OPENROUTER_API_KEY="..."; $env:PORT=8080; node dist/hundredForm-converter/server/server.mjs).'
        );
      }
      if (e.status === 0) {
        return 'Network error (no response). If you use a same-origin OpenRouter proxy, confirm the dev server or Node app is running and OPENROUTER_API_KEY is set for ng serve / the server process.';
      }
      return e.message || `HTTP ${e.status}`;
    }
    if (e instanceof Error) {
      return e.message;
    }
    return 'Request failed';
  }

  private parseOpenRouterErrorPayload(body: unknown): {
    message?: string;
    code?: number;
    metadataRaw?: string;
    providerName?: string;
  } | null {
    if (body == null) {
      return null;
    }
    const fromError = (err: { message?: string; code?: number; metadata?: unknown }) => {
      const meta =
        err.metadata && typeof err.metadata === 'object'
          ? (err.metadata as { raw?: unknown; provider_name?: unknown })
          : null;
      return {
        message: typeof err.message === 'string' ? err.message : undefined,
        code: typeof err.code === 'number' ? err.code : undefined,
        metadataRaw: typeof meta?.raw === 'string' ? meta.raw : undefined,
        providerName: typeof meta?.provider_name === 'string' ? meta.provider_name : undefined,
      };
    };

    if (typeof body === 'string') {
      try {
        const o = JSON.parse(body) as { error?: { message?: string; code?: number; metadata?: unknown } };
        if (o?.error && typeof o.error.message === 'string') {
          return fromError(o.error);
        }
      } catch {
        return { message: body };
      }
      return null;
    }
    if (typeof body === 'object') {
      const o = body as { error?: { message?: string; code?: number; metadata?: unknown }; message?: string };
      if (o.error && typeof o.error.message === 'string') {
        return fromError(o.error);
      }
      if (typeof o.message === 'string') {
        return { message: o.message };
      }
    }
    return null;
  }

  private parseAnalysisJson(content: string): ResumeAnalysis {
    const raw = this.normalizeModelJsonText(content);
    const data = this.parseLooseJson(raw);

    if (!data || typeof data !== 'object') {
      throw new Error('Invalid analysis payload from model.');
    }

    const o = data as Record<string, unknown>;
    const score = Number(o['overallScore']);
    const summary = typeof o['summary'] === 'string' ? o['summary'] : '';
    const strengths = Array.isArray(o['strengths'])
      ? o['strengths'].filter((x): x is string => typeof x === 'string')
      : [];
    const improvementsRaw = Array.isArray(o['improvements']) ? o['improvements'] : [];
    const improvements = improvementsRaw
      .map((item) => {
        if (!item || typeof item !== 'object') return null;
        const r = item as Record<string, unknown>;
        const title = typeof r['title'] === 'string' ? r['title'] : '';
        const detail = typeof r['detail'] === 'string' ? r['detail'] : '';
        if (!title && !detail) return null;
        return { title: title || 'Suggestion', detail: detail || title };
      })
      .filter((x): x is { title: string; detail: string } => x !== null);

    const atsNotes = Array.isArray(o['atsNotes'])
      ? o['atsNotes'].filter((x): x is string => typeof x === 'string')
      : [];

    const redFlags = Array.isArray(o['redFlags'])
      ? o['redFlags'].filter((x): x is string => typeof x === 'string')
      : undefined;

    const clamped = Number.isFinite(score) ? Math.min(100, Math.max(0, Math.round(score))) : 0;

    return {
      overallScore: clamped,
      summary: summary || 'No summary provided.',
      strengths,
      improvements,
      atsNotes,
      redFlags: redFlags?.length ? redFlags : undefined,
    };
  }

  private normalizeModelJsonText(content: string): string {
    let raw = content.trim();
    const fence = raw.match(/^```(?:json)?\s*([\s\S]*?)```$/i);
    if (fence) {
      raw = fence[1].trim();
    }

    // Some providers prepend/append plain text around JSON.
    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
      raw = raw.slice(firstBrace, lastBrace + 1);
    }
    return raw;
  }

  private parseLooseJson(raw: string): unknown {
    try {
      return JSON.parse(raw);
    } catch {
      // Repair common LLM JSON mistakes:
      // 1) missing comma between adjacent quoted strings in arrays/objects
      // 2) trailing commas before } or ]
      const repaired = raw
        .replace(/"\s*\n\s*"/g, '",\n"')
        .replace(/,\s*([}\]])/g, '$1');
      try {
        return JSON.parse(repaired);
      } catch {
        throw new Error('Could not parse AI response as JSON. Try again or use a different model.');
      }
    }
  }
}
