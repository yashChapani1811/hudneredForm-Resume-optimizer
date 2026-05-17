import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = 'https://hunderedform.com';
const ogImage = `${baseUrl}/media/hunderedform-og-card.png`;
const gaId = 'G-S0Q62HTX5L';

const commonKeywords = [
  'ATS resume checker',
  'free resume analyzer',
  'ATS score checker',
  'resume optimizer free',
  'AI resume checker',
  'resume keyword checker',
  'ATS friendly resume',
  'resume scoring tool',
  'free resume checker 2026',
];

const pages = [
  {
    slug: 'ats-score-checker',
    title: 'Free ATS Score Checker - Check Your Resume Score Instantly',
    description:
      "Check your resume's ATS score for free. See if hiring software will reject your resume before a human reads it. Get a score out of 100 in seconds.",
    eyebrow: 'ATS Score Checker',
    h1: 'Check Your ATS Resume Score - 100% Free',
    intro:
      'Drop your resume and get instant ATS compatibility feedback. See exactly what to fix, from missing keywords to formatting issues, before the next application.',
    sections: [
      ['What Is an ATS Score and Why Does It Matter?', 'An ATS score estimates how well your resume matches hiring software rules, job keywords, and readable formatting.'],
      ['How Our ATS Score Checker Works', 'Hunderedform reviews structure, keyword coverage, clarity, and role fit, then turns the results into a clear score with prioritized fixes.'],
      ['What a Good ATS Score Looks Like', 'A strong resume is easy to parse, tailored to the job description, and clear enough for both software and recruiters to scan quickly.'],
      ['Fix Your ATS Score in Minutes', 'Use the resume analyzer and optimizer to improve weak bullet points, add missing keywords, and clean up formatting issues.'],
    ],
  },
  {
    slug: 'resume-analyzer',
    title: 'Free Resume Analyzer - AI-Powered Resume Review',
    description:
      'Get a detailed AI analysis of your resume in seconds. Check ATS compatibility, keyword gaps, weak bullet points, and formatting issues.',
    eyebrow: 'Resume Analyzer',
    h1: 'Free AI Resume Analyzer - Get Instant Feedback',
    intro:
      'Hunderedform reads your resume like a recruiter and an ATS at the same time, then gives clear feedback you can act on before sending the next application.',
    sections: [
      ['AI Resume Review Built for Real Applications', 'Get practical feedback on clarity, structure, action verbs, bullet strength, and job relevance.'],
      ['ATS Compatibility Feedback', 'See whether your file, formatting, headings, and keyword coverage are likely to pass automated screening.'],
      ['Keyword Gap Analysis', 'Compare your resume against employer language and find missing terms that matter for the role.'],
      ['Clear Next Steps', 'Hunderedform prioritizes the fixes that can improve your resume fastest, from bullets to summary to skills.'],
    ],
  },
  {
    slug: 'resume-optimizer',
    title: 'AI Resume Optimizer - Fix Keywords & Beat ATS Filters Free',
    description:
      'Our AI compares your resume to the job description and shows missing keywords, weak bullet points, and formatting issues you can fix for free.',
    eyebrow: 'Resume Optimizer',
    h1: 'AI Resume Optimizer for ATS Keywords',
    intro:
      'Paste a job description and tune your resume for the role with better keywords, stronger bullet points, and cleaner ATS formatting.',
    sections: [
      ['Resume Keyword Optimizer', 'Find the skills, tools, titles, and industry terms that your target role expects to see.'],
      ['Bullet Point Improvement', 'Turn vague responsibilities into stronger accomplishment-focused bullets with measurable impact.'],
      ['Job Description Matching', 'Compare your resume with the job description so your application feels relevant from the first scan.'],
      ['ATS-Friendly Formatting', 'Spot formatting choices that may confuse hiring software and make your resume harder to parse.'],
    ],
  },
  {
    slug: 'free-resume-checker',
    title: 'Free Resume Checker - Instant ATS & AI Feedback',
    description:
      'Check your resume for free. Hunderedform scores your resume out of 100, finds missing keywords, and suggests fixes. No signup needed to start.',
    eyebrow: 'Free Resume Checker',
    h1: 'Free Resume Checker with ATS Feedback',
    intro:
      'Use Hunderedform to check your resume online before you apply. You get an ATS score, AI feedback, keyword gaps, and prioritized improvements.',
    sections: [
      ['Check My Resume Free', 'Start with a quick upload and get instant guidance without paying upfront.'],
      ['Resume Score Out of 100', 'See a simple score backed by specific feedback, not a vague pass or fail.'],
      ['AI Resume Feedback', 'Improve clarity, structure, bullet strength, and role fit with practical suggestions.'],
      ['Better Applications Faster', 'Fix the highest-impact issues first so every application starts stronger.'],
    ],
  },
  {
    slug: 'pricing',
    title: 'Pricing - Free & Pro Resume Checker Plans | Hunderedform',
    description:
      'Hunderedform is free to start. Upgrade to Pro for more resume reviews, full ATS checks, keyword matching, templates, and priority support.',
    eyebrow: 'Pricing',
    h1: 'Hunderedform Pricing for Resume Checks',
    intro:
      'Start with the free resume checker and upgrade only when you need more reviews, deeper ATS feedback, and faster optimization tools.',
    sections: [
      ['Free Resume Checker Plan', 'Run a resume review, see your score, and get the most important fixes before applying.'],
      ['Pro Resume Optimization', 'Unlock more reviews, deeper keyword matching, templates, and priority feedback for active job searches.'],
      ['Simple Monthly Billing', 'Choose the plan that fits your search and cancel when you no longer need it.'],
      ['Built for Job Seekers', 'Hunderedform keeps pricing clear so you can focus on better applications.'],
    ],
  },
  {
    slug: 'resume-templates',
    title: 'ATS Resume Templates - Free Friendly Formats | Hunderedform',
    description:
      'Explore ATS-friendly resume templates and formatting rules that help hiring software read your resume clearly before recruiters review it.',
    eyebrow: 'Resume Templates',
    h1: 'ATS Resume Templates for Job Seekers',
    intro:
      'Use clear, ATS-friendly resume formats that keep sections readable, keywords visible, and recruiter scanning simple.',
    sections: [
      ['ATS-Friendly Resume Format', 'Use standard headings, clean spacing, and readable text so automated systems can parse your resume.'],
      ['Simple Templates Work Best', 'Avoid complex graphics and columns when a role depends on ATS screening.'],
      ['Template Checklist', 'Include summary, experience, skills, education, dates, and role-specific keywords.'],
      ['Check Before You Apply', 'Run the finished resume through Hunderedform to catch formatting and keyword issues.'],
    ],
  },
  ...[
    ['compare/resumeworded-alternative', 'ResumeWorded', 'Best ResumeWorded Alternative - Free ATS Checker 2026', 'Looking for a free ResumeWorded alternative? Hunderedform gives ATS scoring, keyword matching, and bullet point rewrites to start free.'],
    ['compare/jobscan-alternative', 'Jobscan', 'Best Jobscan Alternative - Free ATS Resume Checker', 'Looking for a free Jobscan alternative? Hunderedform offers ATS score checking, keyword matching, and resume optimization to start free.'],
    ['compare/zety-alternative', 'Zety', 'Best Zety Alternative - Free Resume Checker & Optimizer', 'Looking for a free Zety alternative? Hunderedform checks ATS compatibility, finds keyword gaps, and helps you fix your resume.'],
    ['compare/resume-io-alternative', 'Resume.io', 'Best Resume.io Alternative - Free ATS Resume Analyzer', 'Looking for a free Resume.io alternative? Hunderedform analyzes your resume, gives an ATS score, and helps you improve it in minutes.'],
  ].map(([slug, competitor, title, description]) => ({
    slug,
    title,
    description,
    eyebrow: `${competitor} Alternative`,
    h1: `Best ${competitor} Alternative for Free ATS Resume Checks`,
    intro: `${description} Compare it with Hunderedform and start with a free resume score before choosing a paid workflow.`,
    sections: [
      [`Why Job Seekers Compare Hunderedform with ${competitor}`, 'Resume tools should make ATS feedback easy to understand, fast to act on, and affordable while you are applying.'],
      ['Free ATS Resume Checker Access', 'Hunderedform lets job seekers start with a free resume check, score, and prioritized suggestions.'],
      ['Keyword Matching and Resume Optimization', 'Find missing role keywords, improve bullets, and make your resume clearer for both software and recruiters.'],
      [`When ${competitor} May Still Fit`, 'If you already use another tool in your workflow, Hunderedform can still be a quick second opinion before you apply.'],
    ],
  })),
];

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function jsonLd(page) {
  const url = `${baseUrl}/${page.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Hunderedform',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/media/hunderedform_logo.png`,
          width: 200,
          height: 100,
        },
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${baseUrl}/#website` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: page.eyebrow, item: url },
        ],
      },
    ],
  };
}

function head(page) {
  const url = `${baseUrl}/${page.slug}/`;
  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="keywords" content="${escapeHtml(commonKeywords.join(', '))}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="en" href="${url}">
    <link rel="alternate" hreflang="en-US" href="${url}">
    <link rel="alternate" hreflang="en-IN" href="${url}">
    <link rel="alternate" hreflang="en-GB" href="${url}">
    <link rel="alternate" hreflang="x-default" href="${url}">
    <meta name="author" content="Hunderedform">
    <meta name="publisher" content="Hunderedform">
    <meta name="theme-color" content="#0a0b14">
    <meta name="application-name" content="Hunderedform">
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Hunderedform AI Resume Optimizer - Get your resume score and fix it">
    <meta property="og:site_name" content="Hunderedform">
    <meta property="og:locale" content="en_US">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg">
    <link rel="shortcut icon" href="/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="manifest" href="/favicon/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { page_path: window.location.pathname });
    </script>
    <script type="application/ld+json">
${JSON.stringify(jsonLd(page), null, 2)}
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'primary-blue': '#2563EB',
                        'primary-purple': '#7C3AED',
                    },
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        html { scroll-behavior: smooth; }
        body { font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
        .noise-overlay {
            position: absolute;
            inset: 0;
            opacity: 0.03;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .vignette {
            position: absolute;
            inset: 0;
            background: radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%);
            pointer-events: none;
        }
        .surface-glass {
            background: linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.05) 45%, rgba(124, 58, 237, 0.08) 100%);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.14);
            box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.12) inset, 0 24px 48px -12px rgba(0, 0, 0, 0.45);
        }
        .glass {
            background: linear-gradient(155deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.04) 40%, rgba(99, 102, 241, 0.07) 100%);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.14);
            box-shadow: 0 0 0 1px rgba(59, 130, 246, 0.08) inset, 0 16px 40px -16px rgba(0, 0, 0, 0.5);
        }
        .glow-button { position: relative; overflow: hidden; }
        .glow-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s;
        }
        .glow-button:hover::before { left: 100%; }
        .polish-btn { transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease; }
        .polish-btn:hover { transform: translateY(-1px) scale(1.02); }
        .hero-upload-card { transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease; }
        .hero-upload-card:hover {
            transform: scale(1.01);
            border-color: rgba(255, 255, 255, 0.32);
            box-shadow: 0 0 0 1px rgba(147, 197, 253, 0.15), 0 24px 48px -12px rgba(0, 0, 0, 0.35);
        }
        .legal-copy p, .seo-copy p { color: rgba(255,255,255,.62); line-height: 1.75; font-weight: 300; }
        ::-webkit-scrollbar {
            width: 8px;
        }

        ::-webkit-scrollbar-button,
        ::-webkit-scrollbar-button:single-button,
        ::-webkit-scrollbar-button:vertical:decrement,
        ::-webkit-scrollbar-button:vertical:increment,
        html::-webkit-scrollbar-button,
        body::-webkit-scrollbar-button {
            display: none;
            appearance: none;
            -webkit-appearance: none;
            width: 0;
            height: 0;
            min-width: 0;
            min-height: 0;
            background: transparent;
            border: 0;
        }

        ::-webkit-scrollbar-track {
            background: #0a0b14;
        }

        ::-webkit-scrollbar-track-piece {
            background: #0a0b14;
        }

        ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #2563EB, #7C3AED);
            border-radius: 4px;
        }
        #navbar.scrolled {
            background: rgba(10, 11, 20, 0.94);
            border-bottom-color: rgba(255, 255, 255, 0.12);
        }
        section { scroll-margin-top: 96px; }
    </style>`;
}

function template(page) {
  const sections = page.sections.map(([title, text], index) => `<article class="seo-card surface-glass rounded-[2rem] p-8 md:p-10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10">
                            <div class="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-blue to-primary-purple text-lg font-black text-white shadow-[0_0_24px_rgba(59,130,246,0.35)]">${index + 1}</div>
                            <h2 class="mb-4 text-2xl font-bold text-white tracking-tight">${title}</h2>
                            <p>${text}</p>
                        </article>`).join('\n                        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
${head(page)}
</head>
<body data-page="sub" class="min-h-screen bg-[#0a0b14] text-white font-inter overflow-x-hidden antialiased selection:bg-purple-500/40 selection:text-white">
    <a href="#main-content" class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:border-2 focus:border-primary-blue focus:px-6 focus:py-3 focus:rounded-full focus:font-bold focus:shadow-2xl transition-all">Skip to main content</a>

    <div class="page-atmosphere pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-[#0c1222] via-[#12081f] to-[#0a0612]"></div>
        <div class="noise-overlay"></div>
        <div class="vignette"></div>
        <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-80"></div>
        <div class="absolute top-[20%] -left-32 h-[min(32rem,85vw)] w-[min(32rem,85vw)] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div class="absolute top-[15%] -right-32 h-[min(28rem,80vw)] w-[min(28rem,80vw)] rounded-full bg-purple-600/20 blur-[120px]"></div>
        <div class="absolute bottom-0 left-1/2 h-[min(24rem,70vw)] w-[min(24rem,70vw)] -translate-x-1/2 translate-y-1/3 rounded-full bg-violet-700/15 blur-[100px]"></div>
    </div>

    <div class="page-content relative z-[1]">
        <header>
            <nav id="navbar" role="navigation" aria-label="Main Navigation" class="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0b14]/85 backdrop-blur-md transition-all duration-300">
                <div class="container mx-auto px-4 sm:px-6 py-4">
                    <div class="flex justify-between items-center gap-4">
                        <a href="/" class="flex shrink-0 items-center">
                            <img src="/media/hunderedform_logo.png" alt="Hunderedform free ATS resume checker logo" width="200" height="100" class="h-8 w-auto max-w-[min(100%,200px)] object-contain object-left sm:h-9 md:h-10" decoding="async">
                        </a>
                        <div class="hidden md:flex items-center space-x-8">
                            <a href="/#features" class="text-white/80 hover:text-white transition-colors duration-300">Features</a>
                            <a href="/#how-it-works" class="text-white/80 hover:text-white transition-colors duration-300">How It Works</a>
                            <a href="/#pricing" class="text-white/80 hover:text-white transition-colors duration-300">Pricing</a>
                            <a href="/blog/" class="text-white/80 hover:text-white transition-colors duration-300">Blog</a>
                            <a href="/contact/" class="text-white/80 hover:text-white transition-colors duration-300">Contact</a>
                        </div>
                        <a href="/" class="polish-btn glow-button hidden sm:inline-flex bg-gradient-to-r from-primary-blue to-primary-purple text-white px-6 sm:px-9 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:brightness-105">Analyze Resume Free</a>
                    </div>
                </div>
            </nav>
        </header>

        <main id="main-content" role="main">
            <section class="relative isolate flex min-h-screen flex-col justify-center overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pt-28">
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-600/35 via-violet-600/25 to-transparent"></div>
                <div class="pointer-events-none absolute inset-0 overflow-hidden">
                    <div class="absolute -left-1/4 top-1/3 h-[min(26rem,70vw)] w-[min(26rem,70vw)] rounded-full bg-blue-500/30 blur-[88px]"></div>
                    <div class="absolute -right-1/4 top-1/4 h-[min(24rem,65vw)] w-[min(24rem,65vw)] rounded-full bg-purple-500/28 blur-[88px]"></div>
                </div>
                <div class="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                    <p class="mb-4 max-w-2xl text-sm font-semibold uppercase tracking-[0.18em] text-sky-200/95 sm:text-base">${page.eyebrow}</p>
                    <h1 class="mb-5 text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">${page.h1}</h1>
                    <p class="max-w-2xl text-lg leading-8 text-white/75 md:text-xl">${page.intro}</p>
                    <div class="mt-14 w-full max-w-sm hero-upload-card surface-glass rounded-[2rem] p-8 md:p-10 text-center">
                        <div class="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 text-white shadow-lg shadow-purple-950/30">
                            <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01.88-7.9A5 5 0 0117.9 9H18a3 3 0 010 6h-1m-4-4v9m0-9l-3 3m3-3l3 3"></path>
                            </svg>
                        </div>
                        <h2 class="mb-2 text-xl font-extrabold text-white">Drag & Drop your resume</h2>
                        <p class="mb-7 text-white/65">or click to browse</p>
                        <p class="mb-5 text-xs font-bold uppercase tracking-wide text-white/45">PDF, DOC, DOCX (Max 10MB)</p>
                        <a href="/" class="glow-button inline-flex rounded-full border border-white/20 bg-white/10 px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-white/15">Choose File</a>
                    </div>
                </div>
            </section>

            <section class="relative z-10 py-24 px-4 md:py-32">
                <div class="container mx-auto max-w-6xl">
                    <div class="seo-copy grid gap-6 md:grid-cols-2">
                        ${sections}
                    </div>
                </div>
            </section>

            <section class="relative z-10 py-24 px-4 md:py-36 overflow-hidden">
                <div class="absolute inset-0 top-1/2 -translate-y-1/2 flex justify-center pointer-events-none z-0">
                    <div class="w-full max-w-4xl h-64 bg-gradient-to-r from-primary-blue/30 via-purple-500/20 to-pink-500/30 blur-[100px] rounded-full"></div>
                </div>
                <div class="container mx-auto max-w-5xl relative z-10">
                    <div class="relative rounded-[3rem] bg-white/[0.02] border border-white/10 p-1 backdrop-blur-2xl shadow-2xl overflow-hidden group">
                        <div class="rounded-[2.9rem] border border-white/5 bg-[#0a0b14]/50 px-8 py-16 sm:p-16 md:p-24 text-center relative overflow-hidden">
                            <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                                <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span class="text-xs font-bold tracking-[0.2em] uppercase text-emerald-300/90 drop-shadow-md">Ready Right Now</span>
                            </div>
                            <h2 class="mb-6 text-4xl font-black md:text-5xl lg:text-6xl tracking-tight text-white bg-clip-text bg-gradient-to-b from-white to-white/60">Start Your Free Resume Analysis Now</h2>
                            <p class="mb-12 max-w-2xl mx-auto text-lg md:text-xl text-white/50 leading-relaxed font-light">Upload your resume, fix what's holding you back, and apply with confidence. It takes 5 minutes.</p>
                            <a href="/" class="glow-button inline-flex items-center justify-center rounded-full bg-white px-10 py-5 text-lg font-extrabold text-slate-950 shadow-[0_0_50px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_80px_rgba(255,255,255,0.45)]">Check My Resume Free</a>
                        </div>
                    </div>
                </div>
            </section>

            <footer id="site-footer" class="relative z-30 mt-4 border-t border-white/10 py-14 px-4 text-white/70 backdrop-blur-md">
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
                <div class="container relative mx-auto max-w-6xl">
                    <div class="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8 mb-10">
                        <div>
                            <img src="/media/hunderedform_logo.png" alt="Hunderedform free ATS resume checker logo" width="180" height="44" class="mb-4 h-8 w-auto" loading="lazy" decoding="async">
                            <p class="max-w-xs text-sm leading-relaxed text-white/60">Upload your resume, get a clear score, fix what matters, and land more interviews.</p>
                        </div>
                        <div>
                            <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-blue-300/90">Product</h4>
                            <ul class="space-y-2.5 text-sm">
                                <li><a href="/resume-analyzer/" class="text-white/70 transition-colors hover:text-white">Resume Analyzer</a></li>
                                <li><a href="/ats-score-checker/" class="text-white/70 transition-colors hover:text-white">ATS Score Checker</a></li>
                                <li><a href="/resume-optimizer/" class="text-white/70 transition-colors hover:text-white">Resume Optimizer</a></li>
                                <li><a href="/pricing/" class="text-white/70 transition-colors hover:text-white">Pricing</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-purple-300/90">Company</h4>
                            <ul class="space-y-2.5 text-sm">
                                <li><a href="/about/" class="text-white/70 transition-colors hover:text-white">About</a></li>
                                <li><a href="/blog/" class="text-white/70 transition-colors hover:text-white">Blog</a></li>
                                <li><a href="/contact/" class="text-white/70 transition-colors hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">Legal</h4>
                            <ul class="space-y-2.5 text-sm">
                                <li><a href="/privacy/" class="text-white/70 transition-colors hover:text-white">Privacy Policy</a></li>
                                <li><a href="/terms/" class="text-white/70 transition-colors hover:text-white">Terms of Service</a></li>
                                <li><a href="/cookies/" class="text-white/70 transition-colors hover:text-white">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
                        <p class="text-sm text-white/50">&copy; <span id="currentYear"></span> Hunderedform. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollToPlugin.min.js"></script>
    <script src="https://unpkg.com/@studio-freight/lenis@1.0.42/dist/lenis.min.js"></script>
    <script src="/js/main.min.js"></script>
    <script src="/js/scroll.min.js"></script>
    <script src="/js/scroll-trigger-smooth.js"></script>
    <script src="/js/tracking.min.js"></script>
    <script>
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        if (window.Lenis) {
            const seoLenis = new Lenis({
                duration: 1.15,
                smoothWheel: true,
                wheelMultiplier: 0.9,
                touchMultiplier: 1.2,
            });
            function seoRaf(time) {
                seoLenis.raf(time);
                requestAnimationFrame(seoRaf);
            }
            requestAnimationFrame(seoRaf);
            if (window.ScrollTrigger) {
                seoLenis.on('scroll', ScrollTrigger.update);
            }
            document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener('click', (event) => {
                    const target = document.querySelector(anchor.getAttribute('href'));
                    if (!target) return;
                    event.preventDefault();
                    seoLenis.scrollTo(target, { offset: -92 });
                });
            });
        }
        if (window.gsap) {
            gsap.registerPlugin(ScrollTrigger);
            gsap.set('#main-content h1, #main-content section:first-child p, .hero-upload-card, .seo-card', { clearProps: 'opacity,transform,visibility' });
            gsap.fromTo('#main-content h1, #main-content section:first-child p, .hero-upload-card',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.08, clearProps: 'transform' }
            );
            gsap.utils.toArray('.seo-card').forEach((card) => {
                gsap.fromTo(card,
                    { opacity: 0, y: 42 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.75,
                        ease: 'power3.out',
                        clearProps: 'transform',
                        scrollTrigger: { trigger: card, start: 'top 86%', once: true }
                    }
                );
            });
        }
    </script>
</body>
</html>
`;
}

for (const page of pages) {
  const dir = path.join(root, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), template(page));
}

console.log(`Updated ${pages.length} SEO pages to match the main design.`);
