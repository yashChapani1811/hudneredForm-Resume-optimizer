import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const baseUrl = 'https://www.hunderedform.com';
const ogImage = `${baseUrl}/media/hunderedform-og-card.png`;
const logo = `${baseUrl}/media/hunderedform_logo.png`;
const gaId = 'G-S0Q62HTX5L';
const lastmod = '2026-05-10';

const keywords = [
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
    file: 'index.html',
    path: '/',
    title: 'Free ATS Resume Checker & AI Optimizer - Hunderedform',
    description:
      'Upload your resume and get a free ATS compatibility score in seconds. Fix weak bullet points, match keywords, and land more interviews.',
    h1: 'Make Your Resume 100% ATS-Ready - Free',
    type: 'home',
  },
  {
    file: 'about/index.html',
    path: '/about/',
    title: 'About Hunderedform - Free ATS Resume Checker Team',
    description:
      'Learn how Hunderedform helps job seekers build ATS-friendly resumes with free AI resume analysis, keyword feedback, and practical fixes.',
    h1: 'About Hunderedform',
    type: 'about',
  },
  {
    file: 'blog/index.html',
    path: '/blog/',
    title: 'Resume Tips Blog - ATS Resume Advice | Hunderedform',
    description:
      'Read ATS resume tips, resume checker guides, keyword optimization advice, and job search strategies from the Hunderedform team.',
    h1: 'Resume Tips and ATS Career Advice',
    type: 'blog',
  },
  {
    file: 'contact/index.html',
    path: '/contact/',
    title: 'Contact Hunderedform - Resume Checker Support',
    description:
      'Contact Hunderedform for support, feedback, partnerships, or help with the free ATS resume checker and AI resume optimizer.',
    h1: 'Contact Hunderedform Support',
    type: 'contact',
  },
  {
    file: 'privacy/index.html',
    path: '/privacy/',
    title: 'Privacy Policy - Hunderedform',
    description:
      'Read how Hunderedform protects resume uploads, account data, analytics data, and personal information in our AI resume checker.',
    h1: 'Privacy Policy',
    type: 'legal',
  },
  {
    file: 'terms/index.html',
    path: '/terms/',
    title: 'Terms of Service - Hunderedform',
    description:
      'Review the terms for using Hunderedform, including our free ATS resume checker, AI resume optimizer, subscriptions, and user responsibilities.',
    h1: 'Terms of Service',
    type: 'legal',
  },
  {
    file: 'cookies/index.html',
    path: '/cookies/',
    title: 'Cookie Policy - Hunderedform',
    description:
      'Learn how Hunderedform uses cookies and analytics to improve our free ATS resume checker and AI resume optimization experience.',
    h1: 'Cookie Policy',
    type: 'legal',
  },
];

const landingPages = [
  {
    slug: 'ats-score-checker',
    title: 'Free ATS Score Checker - Check Your Resume Score Instantly',
    description:
      "Check your resume's ATS score for free. See if hiring software will reject your resume before a human reads it. Get a score out of 100 in seconds.",
    h1: 'Check Your ATS Resume Score - 100% Free',
    eyebrow: 'ATS Score Checker',
    intro:
      'Upload your resume and see whether applicant tracking systems can read it clearly. Hunderedform highlights formatting issues, missing keywords, and weak sections before you apply.',
    sections: [
      ['What Is an ATS Score and Why Does It Matter?', 'An ATS score estimates how well your resume matches hiring software rules, job keywords, and readable formatting.'],
      ['How Our ATS Score Checker Works', 'Hunderedform reviews resume structure, keyword coverage, clarity, and role fit, then turns the results into a simple score with prioritized fixes.'],
      ['What a Good ATS Score Looks Like', 'A strong resume is easy to parse, tailored to the job description, and clear enough for both software and recruiters to understand quickly.'],
      ['Fix Your ATS Score in Minutes', 'Use the free resume analyzer and resume optimizer to improve weak bullet points, add missing keywords, and clean up formatting issues.'],
    ],
  },
  {
    slug: 'resume-analyzer',
    title: 'Free Resume Analyzer - AI-Powered Resume Review',
    description:
      'Get a detailed AI analysis of your resume in seconds. Check ATS compatibility, keyword gaps, weak bullet points, and formatting issues.',
    h1: 'Free AI Resume Analyzer - Get Instant Feedback',
    eyebrow: 'Resume Analyzer',
    intro:
      'Hunderedform reads your resume like a recruiter and an ATS at the same time, then gives clear feedback you can act on before sending the next application.',
    sections: [
      ['AI Resume Review Built for Real Applications', 'Get practical feedback on clarity, structure, action verbs, bullet strength, and job relevance.'],
      ['ATS Compatibility Feedback', 'See whether your file, formatting, headings, and keyword coverage are likely to pass automated screening.'],
      ['Keyword Gap Analysis', 'Compare your resume against the language employers use and find missing terms that matter for the role.'],
      ['Clear Next Steps', 'Hunderedform prioritizes the fixes that can improve your resume fastest, from bullets to summary to skills.'],
    ],
  },
  {
    slug: 'resume-optimizer',
    title: 'AI Resume Optimizer - Fix Keywords & Beat ATS Filters Free',
    description:
      'Our AI compares your resume to the job description and shows missing keywords, weak bullet points, and formatting issues you can fix for free.',
    h1: 'AI Resume Optimizer for ATS Keywords',
    eyebrow: 'Resume Optimizer',
    intro:
      'Paste a job description and use Hunderedform to tune your resume for the role, with better keywords, stronger bullet points, and cleaner ATS formatting.',
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
    h1: 'Free Resume Checker with ATS Feedback',
    eyebrow: 'Free Resume Checker',
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
    h1: 'Hunderedform Pricing for Resume Checks',
    eyebrow: 'Pricing',
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
    h1: 'ATS Resume Templates for Job Seekers',
    eyebrow: 'Resume Templates',
    intro:
      'Use clear, ATS-friendly resume formats that keep sections readable, keywords visible, and recruiter scanning simple.',
    sections: [
      ['ATS-Friendly Resume Format', 'Use standard headings, clean spacing, and readable text so automated systems can parse your resume.'],
      ['Simple Templates Work Best', 'Avoid complex graphics and columns when a role depends on ATS screening.'],
      ['Template Checklist', 'Include summary, experience, skills, education, dates, and role-specific keywords.'],
      ['Check Before You Apply', 'Run the finished resume through Hunderedform to catch formatting and keyword issues.'],
    ],
  },
];

const comparePages = [
  ['resumeworded-alternative', 'ResumeWorded', 'Best ResumeWorded Alternative - Free ATS Checker 2026', 'Looking for a free ResumeWorded alternative? Hunderedform gives ATS scoring, keyword matching, and bullet point rewrites to start free.'],
  ['jobscan-alternative', 'Jobscan', 'Best Jobscan Alternative - Free ATS Resume Checker', 'Looking for a free Jobscan alternative? Hunderedform offers ATS score checking, keyword matching, and resume optimization to start free.'],
  ['zety-alternative', 'Zety', 'Best Zety Alternative - Free Resume Checker & Optimizer', 'Looking for a free Zety alternative? Hunderedform checks ATS compatibility, finds keyword gaps, and helps you fix your resume.'],
  ['resume-io-alternative', 'Resume.io', 'Best Resume.io Alternative - Free ATS Resume Analyzer', 'Looking for a free Resume.io alternative? Hunderedform analyzes your resume, gives an ATS score, and helps you improve it in minutes.'],
];

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function write(rel, content) {
  const abs = path.join(root, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
}

function jsonLd(data) {
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 2)}\n    </script>`;
}

function headFor(page) {
  const url = `${baseUrl}${page.path === '/' ? '/' : page.path}`;
  const schemaGraph = [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'Hunderedform',
      url: baseUrl,
      logo: { '@type': 'ImageObject', url: logo, width: 200, height: 100 },
      description: 'AI-powered resume optimization platform helping job seekers create ATS-friendly resumes and land more interviews.',
      foundingDate: '2024',
      sameAs: [],
      contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', availableLanguage: ['English', 'Hindi'] },
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      name: 'Hunderedform',
      alternateName: 'Hunderedform Resume Optimizer',
      url: baseUrl,
      publisher: { '@id': `${baseUrl}/#organization` },
      inLanguage: 'en',
    },
    {
      '@type': page.type === 'home' ? 'WebPage' : page.type === 'blog' ? 'Blog' : page.type === 'about' ? 'AboutPage' : page.type === 'contact' ? 'ContactPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      isPartOf: { '@id': `${baseUrl}/#website` },
      inLanguage: 'en',
    },
  ];

  if (page.type === 'home') {
    schemaGraph.push({
      '@type': 'SoftwareApplication',
      name: 'Hunderedform',
      url: baseUrl,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: page.description,
      offers: { '@type': 'AggregateOffer', lowPrice: '0', highPrice: '19', priceCurrency: 'USD', offerCount: '2' },
      aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '2847', bestRating: '5', worstRating: '1' },
      featureList: 'AI Resume Analysis, ATS Compatibility Score, Keyword Matching, Resume Scoring, Bullet Point Optimization',
    });
    schemaGraph.push(faqSchema());
  }

  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary SEO Meta Tags -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}">
    <meta name="keywords" content="${escapeHtml(keywords.join(', '))}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="en" href="${url}">
    <link rel="alternate" hreflang="en-US" href="${url}">
    <link rel="alternate" hreflang="en-IN" href="${url}">
    <link rel="alternate" hreflang="en-GB" href="${url}">
    <link rel="alternate" hreflang="x-default" href="${url}">
    <meta http-equiv="content-language" content="en">
    <meta name="author" content="Hunderedform">
    <meta name="publisher" content="Hunderedform">
    <meta name="theme-color" content="#0a0b14">
    <meta name="application-name" content="Hunderedform">

    <!-- Geo-targeting -->
    <meta name="geo.region" content="IN">
    <meta name="geo.placename" content="India">
    <meta name="ICBM" content="20.5937, 78.9629">
    <meta name="DC.language" content="en">

    <!-- Resource Hints for Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
    <link rel="dns-prefetch" href="https://unpkg.com">
    <link rel="preconnect" href="https://www.googletagmanager.com">
    <link rel="preconnect" href="https://www.google-analytics.com">

    <!-- Google Tag Manager / GA4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${gaId}', { page_path: window.location.pathname });
    </script>

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96">
    <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg">
    <link rel="shortcut icon" href="/favicon/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png">
    <link rel="manifest" href="/favicon/site.webmanifest">

    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${escapeHtml(page.title)}">
    <meta property="og:description" content="${escapeHtml(page.description)}">
    <meta property="og:type" content="${page.type === 'blog' ? 'blog' : 'website'}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="Hunderedform AI Resume Optimizer - Get your resume score and fix it">
    <meta property="og:site_name" content="Hunderedform">
    <meta property="og:locale" content="en_US">

    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(page.title)}">
    <meta name="twitter:description" content="${escapeHtml(page.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="Hunderedform AI Resume Optimizer">

    <!-- JSON-LD Structured Data -->
    ${jsonLd({ '@context': 'https://schema.org', '@graph': schemaGraph })}`;
}

function faqSchema() {
  return {
    '@type': 'FAQPage',
    mainEntity: [
      ['How accurate is the AI resume analysis?', 'Hunderedform checks ATS compatibility, keyword coverage, formatting, and resume clarity to give practical improvement suggestions.'],
      ['Can I cancel the Pro plan anytime?', 'Yes. Pro billing is month to month and can be cancelled from account settings.'],
      ['What file formats does Hunderedform support?', 'PDF, DOC, and DOCX files are supported up to 10MB.'],
      ['Is my resume data secure on Hunderedform?', 'Resume data is handled securely and is not sold or shared for advertising.'],
      ['Will Hunderedform guarantee I get interviews?', 'No tool can guarantee interviews, but stronger ATS fit and clearer resume writing can improve your application quality.'],
    ].map(([name, text]) => ({ '@type': 'Question', name, acceptedAnswer: { '@type': 'Answer', text } })),
  };
}

function replaceHead(html, page) {
  return html.replace(/<head>[\s\S]*?<\/head>/i, `<head>\n${headFor(page)}\n${preserveStyleBlock(html)}\n</head>`);
}

function preserveStyleBlock(html) {
  const tailwind = html.match(/    <!-- Tailwind CSS -->[\s\S]*?    <!-- Fonts -->[\s\S]*?rel="stylesheet">\s*/);
  const style = html.match(/    <style>[\s\S]*?<\/style>/);
  const angular = html.match(/    <!-- Angular App Build -->[\s\S]*?chunk-WXGDYXZW\.js">\s*/);
  return [tailwind?.[0], angular?.[0], style?.[0]].filter(Boolean).join('\n');
}

function replaceFirstH1(html, h1) {
  return html.replace(/(<h1\b[^>]*>)([\s\S]*?)(<\/h1>)/i, `$1\n                            ${h1}\n                        $3`);
}

for (const page of pages) {
  let html = read(page.file);
  html = replaceHead(html, page);
  html = replaceFirstH1(html, page.h1);
  html = html.replaceAll('https://hunderedform.com', baseUrl);
  html = html.replaceAll('http://hunderedform.com', baseUrl);
  html = html.replaceAll('https://hunderedform.com', baseUrl);
  html = html.replaceAll('http://hunderedform.com', baseUrl);
  html = html.replaceAll('Read More', 'Read full resume guide');
  html = html.replaceAll('Read more', 'Read full resume guide');
  write(page.file, html);
}

function landingHead(page, urlPath, type = 'WebPage') {
  return headFor({ ...page, path: urlPath, type });
}

function landingTemplate(page) {
  const urlPath = `/${page.slug}/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: page.eyebrow, item: `${baseUrl}${urlPath}` },
    ],
  };
  return `<!DOCTYPE html>
<html lang="en">
<head>
${landingHead(page, urlPath)}
    ${jsonLd(schema)}
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body class="bg-[#0a0b14] text-white font-[Inter] antialiased">
    <header class="border-b border-white/10 bg-[#0a0b14]/95">
        <nav class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" class="flex items-center"><img src="/media/hunderedform_logo.png" alt="Hunderedform free ATS resume checker logo" width="180" height="44" class="h-8 w-auto"></a>
            <div class="hidden gap-6 text-sm text-white/75 md:flex">
                <a href="/resume-analyzer/" class="hover:text-white">Resume Analyzer</a>
                <a href="/ats-score-checker/" class="hover:text-white">ATS Score Checker</a>
                <a href="/resume-optimizer/" class="hover:text-white">Resume Optimizer</a>
                <a href="/pricing/" class="hover:text-white">Pricing</a>
            </div>
            <a href="/" class="rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950">Start Free</a>
        </nav>
    </header>
    <main>
        <section class="mx-auto grid min-h-[72vh] max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
                <nav aria-label="Breadcrumb" class="mb-8 text-sm text-white/55"><a href="/" class="hover:text-white">Home</a> / <span>${page.eyebrow}</span></nav>
                <p class="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-blue-300">${page.eyebrow}</p>
                <h1 class="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">${page.h1}</h1>
                <p class="mt-6 max-w-2xl text-lg leading-8 text-white/70">${page.intro}</p>
                <div class="mt-9 flex flex-wrap gap-3">
                    <a href="/" class="rounded-full bg-white px-7 py-4 font-extrabold text-slate-950">Analyze Resume Free</a>
                    <a href="/ats-score-checker/" class="rounded-full border border-white/15 px-7 py-4 font-bold text-white hover:bg-white/10">Check ATS Score</a>
                </div>
            </div>
            <div class="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-blue-950/30">
                <img src="/media/hunderedform-og-card.png" alt="Hunderedform AI Resume Optimizer - Get your resume score and fix it" width="1200" height="630" class="aspect-[1200/630] w-full rounded-md object-cover">
            </div>
        </section>
        <section class="border-y border-white/10 bg-white/[0.025] px-4 py-16">
            <div class="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
                ${page.sections.map(([title, text]) => `<article class="rounded-lg border border-white/10 bg-[#0f1220] p-6">
                    <h2 class="text-2xl font-extrabold">${title}</h2>
                    <p class="mt-3 leading-7 text-white/65">${text}</p>
                </article>`).join('\n                ')}
            </div>
        </section>
        <section class="mx-auto max-w-4xl px-4 py-16 text-center">
            <h2 class="text-3xl font-black">Improve your resume before the next application</h2>
            <p class="mx-auto mt-4 max-w-2xl text-white/65">Use the free resume analyzer, ATS score checker, and resume optimizer together for a cleaner, more targeted application.</p>
            <div class="mt-8 flex flex-wrap justify-center gap-4 text-sm font-bold">
                <a href="/resume-analyzer/" class="text-blue-300 hover:text-blue-200">free resume analyzer</a>
                <a href="/resume-optimizer/" class="text-blue-300 hover:text-blue-200">resume keyword optimizer</a>
                <a href="/blog/" class="text-blue-300 hover:text-blue-200">ATS resume tips</a>
            </div>
        </section>
    </main>
    <footer class="border-t border-white/10 px-4 py-10 text-center text-sm text-white/50">
        <p>&copy; ${new Date().getFullYear()} Hunderedform. All rights reserved.</p>
    </footer>
</body>
</html>
`;
}

for (const page of landingPages) {
  write(`${page.slug}/index.html`, landingTemplate(page));
}

function compareTemplate([slug, name, title, description]) {
  const page = {
    slug: `compare/${slug}`,
    title,
    description,
    h1: `Best ${name} Alternative for Free ATS Resume Checks`,
    eyebrow: `${name} Alternative`,
    intro: `${description} Compare Hunderedform with ${name} and start with a free resume score before choosing a paid workflow.`,
    sections: [
      [`Why job seekers compare Hunderedform with ${name}`, 'Resume tools should make ATS feedback easy to understand, fast to act on, and affordable while you are applying.'],
      ['Free ATS resume checker access', 'Hunderedform lets job seekers start with a free resume check, score, and prioritized suggestions.'],
      ['Keyword matching and resume optimization', 'Find missing role keywords, improve bullets, and make your resume clearer for both software and recruiters.'],
      [`When ${name} may still fit`, 'If you already use another tool in your workflow, Hunderedform can still be a quick second opinion before you apply.'],
    ],
  };
  return landingTemplate(page).replaceAll('/compare/', '/compare/');
}

for (const page of comparePages) {
  write(`compare/${page[0]}/index.html`, compareTemplate(page));
}

const sitemapUrls = [
  ['/', 'weekly', '1.0'],
  ['/resume-analyzer/', 'weekly', '0.9'],
  ['/ats-score-checker/', 'weekly', '0.9'],
  ['/resume-optimizer/', 'weekly', '0.9'],
  ['/free-resume-checker/', 'monthly', '0.8'],
  ['/pricing/', 'monthly', '0.8'],
  ['/resume-templates/', 'monthly', '0.7'],
  ['/blog/', 'weekly', '0.7'],
  ['/about/', 'monthly', '0.6'],
  ['/contact/', 'monthly', '0.5'],
  ['/compare/resumeworded-alternative/', 'monthly', '0.7'],
  ['/compare/jobscan-alternative/', 'monthly', '0.7'],
  ['/compare/zety-alternative/', 'monthly', '0.7'],
  ['/compare/resume-io-alternative/', 'monthly', '0.7'],
  ['/privacy/', 'yearly', '0.3'],
  ['/terms/', 'yearly', '0.3'],
  ['/cookies/', 'yearly', '0.3'],
];

write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(([url, freq, priority]) => `    <url>
        <loc>${baseUrl}${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>${freq}</changefreq>
        <priority>${priority}</priority>
    </url>`).join('\n\n')}
</urlset>
`);

write('robots.txt', `# Hunderedform robots.txt
User-agent: *
Allow: /

# Block non-public routes
Disallow: /api/
Disallow: /dashboard/
Disallow: /account/
Disallow: /admin/
Disallow: /private/
Disallow: /_internal/
Disallow: /.git/
Disallow: /node_modules/

# Allow important assets and SEO content
Allow: /css/
Allow: /js/
Allow: /media/
Allow: /blog/
Allow: /compare/

Crawl-delay: 1

Sitemap: ${baseUrl}/sitemap.xml
`);

console.log('SEO metadata, landing pages, robots.txt, and sitemap.xml updated.');
