export interface ResumeAnalysis {
  overallScore: number;
  summary: string;
  strengths: string[];
  improvements: Array<{ title: string; detail: string }>;
  atsNotes: string[];
  redFlags?: string[];
}

export interface OpenRouterChatResponse {
  choices?: Array<{
    message?: { role?: string; content?: string | null };
    finish_reason?: string;
    error?: {
      code?: number;
      message?: string;
      metadata?: { error_type?: string; provider_name?: string };
    };
  }>;
  error?: { message?: string; code?: number };
}
