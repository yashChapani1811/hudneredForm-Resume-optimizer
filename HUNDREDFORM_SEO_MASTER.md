# Hunderedform — Master SEO Implementation Guide

> **Stack:** Next.js (App Router) + React  
> **Domain:** `https://hunderedform.com` ← always use this, never the typo `hunderedform.com`  
> **Last updated:** 2026-05-10  
> **Audience:** Any developer implementing features on this codebase must read and follow this file.

---

## Table of Contents

1. [Critical Domain Fix](#1-critical-domain-fix)
2. [Global SEO Config — `layout.tsx`](#2-global-seo-config--layouttsx)
3. [Page-by-Page Metadata](#3-page-by-page-metadata)
4. [JSON-LD Schema Markup](#4-json-ld-schema-markup)
5. [robots.txt](#5-robotstxt)
6. [sitemap.xml — Dynamic Generation](#6-sitemapxml--dynamic-generation)
7. [GA4 + Event Tracking](#7-ga4--event-tracking)
8. [Blog SEO Template](#8-blog-seo-template)
9. [Image SEO Rules](#9-image-seo-rules)
10. [Internal Linking Rules](#10-internal-linking-rules)
11. [Heading Hierarchy Rules](#11-heading-hierarchy-rules)
12. [Core Web Vitals Checklist](#12-core-web-vitals-checklist)
13. [hreflang — Global Targeting](#13-hreflang--global-targeting)
14. [Keyword Targeting Map](#14-keyword-targeting-map)
15. [What NOT To Do](#15-what-not-to-do)

---

## 1. Critical Domain Fix

### Problem
The server at `hunderedform.com` (typo — extra "e") must 301-redirect to `hunderedform.com`.  
**Both domains currently serve content. This splits SEO authority.**

### Fix in `next.config.js`

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Redirect typo domain → correct domain
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'hunderedform.com' }],
        destination: 'https://hunderedform.com/:path*',
        permanent: true, // 301
      },
      // Redirect non-www → www
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'hunderedform.com' }],
        destination: 'https://hunderedform.com/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

### Also fix in Google Search Console
- Go to GSC → Settings → Change of Address
- Set preferred domain to `hunderedform.com`
- Remove `hunderedform.com` property if it exists

---

## 2. Global SEO Config — `layout.tsx`

Replace or update your root `app/layout.tsx` with the following metadata block.  
This is the **base** — every page can override individual fields using Next.js `generateMetadata`.

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  // ── Base ──────────────────────────────────────────────
  metadataBase: new URL('https://hunderedform.com'),
  applicationName: 'Hunderedform',
  authors: [{ name: 'Hunderedform', url: 'https://hunderedform.com' }],
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',

  // ── Default title (overridden per page) ───────────────
  title: {
    default: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
    template: '%s | Hunderedform',
    // Usage: page exports title: 'ATS Score Checker'
    // Result: 'ATS Score Checker | Hunderedform'
  },

  // ── Default description (overridden per page) ─────────
  description:
    'Upload your resume and get a free ATS compatibility score in seconds. Fix weak bullet points, match keywords, and land more interviews. Trusted by 50,000+ job seekers worldwide.',

  // ── Keywords (kept lean — Google ignores meta keywords but keep for clarity) ──
  keywords: [
    'ATS resume checker',
    'free resume analyzer',
    'ATS score checker',
    'resume optimizer free',
    'AI resume checker',
    'resume keyword checker',
    'ATS friendly resume',
    'resume scoring tool',
    'free resume checker 2026',
  ],

  // ── Canonical (set per-page, fallback here) ───────────
  alternates: {
    canonical: 'https://hunderedform.com',
  },

  // ── Robots ────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hunderedform.com',
    siteName: 'Hunderedform',
    title: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
    description:
      'Upload your resume, get your ATS score, fix what\'s weak, and land more interviews. Free AI-powered resume analysis trusted by 50K+ job seekers.',
    images: [
      {
        url: 'https://hunderedform.com/media/hunderedform-og-card.png',
        width: 1200,
        height: 630,
        alt: 'Hunderedform AI Resume Optimizer — Get your resume score and fix it',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
    description:
      'Upload your resume, get your ATS score, fix what\'s weak, and land more interviews. Trusted by 50K+ job seekers.',
    images: ['https://hunderedform.com/media/hunderedform-og-card.png'],
    // Add when you create the account:
    // creator: '@hunderedform',
    // site: '@hunderedform',
  },

  // ── Verification (add when connected) ─────────────────
  verification: {
    google: 'YOUR_GSC_VERIFICATION_CODE', // from GSC → Settings → Ownership verification
    // yandex: 'YOUR_YANDEX_CODE',
    // bing: 'YOUR_BING_CODE',
  },

  // ── App / PWA ─────────────────────────────────────────
  themeColor: '#0a0b14',
  viewport: 'width=device-width, initial-scale=1.0',
  manifest: '/manifest.json', // create this if you want PWA support
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Geo tags for global targeting */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="ICBM" content="20.5937, 78.9629" />
        {/* Publisher */}
        <meta name="publisher" content="Hunderedform" />
        <meta name="DC.language" content="en" />
      </head>
      <body>
        {children}

        {/* GA4 — load after interaction for performance */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </body>
    </html>
  );
}
```

---

## 3. Page-by-Page Metadata

Each page file exports a `generateMetadata` function (dynamic) or a static `metadata` object.  
Always override `title`, `description`, `alternates.canonical`, and `openGraph`.

---

### 3.1 Homepage — `app/page.tsx`

**UPDATED from existing** (fixes title keyword order, strengthens description, adds canonical)

```tsx
// app/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
  // ↑ CHANGED: was "Hunderedform — Free AI Resume Optimizer & ATS Score Checker | Get More Interviews"
  // Primary keyword "ATS Resume Checker" moved to front — Google weights first words more.

  description:
    'Upload your resume and get a free ATS compatibility score in seconds. Fix weak bullet points, match keywords, and land more interviews. Trusted by 50,000+ job seekers worldwide.',
  // ↑ CHANGED: was "Free AI-powered resume optimizer. Get your ATS compatibility score..."
  // New version leads with the user action, not the product feature. Better CTR.

  alternates: {
    canonical: 'https://hunderedform.com/',
  },

  openGraph: {
    title: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
    description:
      'Upload your resume, get your ATS score, fix what\'s weak, and land more interviews. Free AI-powered resume analysis trusted by 50K+ job seekers.',
    url: 'https://hunderedform.com/',
    images: [
      {
        url: 'https://hunderedform.com/media/hunderedform-og-card.png',
        width: 1200,
        height: 630,
        alt: 'Hunderedform — Free ATS Resume Checker and AI Resume Optimizer',
      },
    ],
  },

  twitter: {
    title: 'Free ATS Resume Checker & AI Optimizer — Hunderedform',
    description:
      'Upload your resume, get your ATS score, fix what\'s weak, and land more interviews. Trusted by 50K+ job seekers.',
  },
};
```

**Homepage H1 — update in JSX:**
```tsx
// BEFORE (existing):
<h1>Make Your Resume 100% Perfect</h1>

// AFTER (SEO-optimized):
<h1>Make Your Resume 100% ATS-Ready — Free</h1>
// ↑ Adds "ATS-Ready" and "Free" — both high-intent keywords users search for
```

---

### 3.2 ATS Score Checker — `app/ats-score-checker/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Free ATS Score Checker — Check Your Resume Score Instantly',
  description:
    'Check your resume\'s ATS score for free. See if hiring software will reject your resume before a human ever reads it. Get a score out of 100 in under 3 seconds.',
  alternates: { canonical: 'https://hunderedform.com/ats-score-checker' },
  openGraph: {
    title: 'Free ATS Score Checker — Check Your Resume Score Instantly',
    description:
      'Get your resume\'s ATS compatibility score for free. Instant results, no signup required.',
    url: 'https://hunderedform.com/ats-score-checker',
    images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
  },
};

// Page H1:
<h1>Check Your ATS Resume Score — 100% Free</h1>

// Page H2s:
<h2>What Is an ATS Score and Why Does It Matter?</h2>
<h2>How Our ATS Score Checker Works</h2>
<h2>What a Good ATS Score Looks Like</h2>
<h2>Fix Your ATS Score in Minutes</h2>
```

---

### 3.3 Resume Analyzer — `app/resume-analyzer/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Free Resume Analyzer — AI-Powered Resume Review',
  description:
    'Get a detailed AI analysis of your resume in seconds. We check ATS compatibility, keyword gaps, weak bullet points, and formatting issues — then show you exactly how to fix each one.',
  alternates: { canonical: 'https://hunderedform.com/resume-analyzer' },
  openGraph: {
    title: 'Free Resume Analyzer — AI-Powered Resume Review',
    description:
      'Upload your resume. Get a full AI analysis — ATS score, keyword gaps, and fix suggestions — in under 3 seconds.',
    url: 'https://hunderedform.com/resume-analyzer',
    images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
  },
};

// Page H1:
<h1>Free AI Resume Analyzer — Get Instant Feedback</h1>
```

---

### 3.4 Resume Optimizer — `app/resume-optimizer/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'AI Resume Optimizer — Fix Keywords & Beat ATS Filters Free',
  description:
    'Our AI compares your resume to the job description and shows you missing keywords, weak bullet points, and formatting issues — then helps you fix each one for free.',
  alternates: { canonical: 'https://hunderedform.com/resume-optimizer' },
  openGraph: {
    title: 'AI Resume Optimizer — Fix Keywords & Beat ATS Filters Free',
    description:
      'Paste the job description. We find the missing keywords and show you exactly how to add them to your resume.',
    url: 'https://hunderedform.com/resume-optimizer',
    images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
  },
};
```

---

### 3.5 Free Resume Checker (SEO Landing Page) — `app/free-resume-checker/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Free Resume Checker — Instant ATS & AI Feedback',
  description:
    'Check your resume for free. Our AI scores your resume out of 100, finds missing keywords, and rewrites weak bullet points. No signup needed to get started.',
  alternates: { canonical: 'https://hunderedform.com/free-resume-checker' },
  openGraph: {
    title: 'Free Resume Checker — Instant ATS & AI Feedback',
    description: 'Get a free resume score, keyword gap analysis, and fix suggestions in seconds.',
    url: 'https://hunderedform.com/free-resume-checker',
    images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
  },
};
```

---

### 3.6 Pricing — `app/pricing/page.tsx`

```tsx
export const metadata: Metadata = {
  title: 'Pricing — Free & Pro Plans | Hunderedform',
  description:
    'Hunderedform is free forever for one resume review per month. Upgrade to Pro at $19/mo for unlimited reviews, full ATS checks, keyword matching, and all templates.',
  alternates: { canonical: 'https://hunderedform.com/pricing' },
  openGraph: {
    title: 'Hunderedform Pricing — Free Resume Checker Plans',
    description: 'Start free. Upgrade only if you need more. No tricks, no hidden costs.',
    url: 'https://hunderedform.com/pricing',
    images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
  },
};
```

---

### 3.7 Competitor Comparison Pages — `app/compare/[slug]/page.tsx`

```tsx
// app/compare/[slug]/page.tsx
import type { Metadata } from 'next';

const competitorData: Record<string, { name: string; slug: string; title: string; desc: string }> = {
  'resumeworded-alternative': {
    name: 'ResumeWorded',
    slug: 'resumeworded-alternative',
    title: 'Best ResumeWorded Alternative — Free ATS Checker 2026',
    desc: 'Looking for a free ResumeWorded alternative? Hunderedform gives you ATS scoring, keyword matching, and bullet point rewrites — all free, no credit card needed.',
  },
  'jobscan-alternative': {
    name: 'Jobscan',
    slug: 'jobscan-alternative',
    title: 'Best Jobscan Alternative — Free ATS Resume Checker',
    desc: 'Looking for a free Jobscan alternative? Hunderedform offers full ATS score checking, keyword matching, and resume optimization — completely free to start.',
  },
  'zety-alternative': {
    name: 'Zety',
    slug: 'zety-alternative',
    title: 'Best Zety Alternative — Free Resume Checker & Optimizer',
    desc: 'Looking for a free Zety alternative? Hunderedform checks your resume for ATS compatibility, finds keyword gaps, and helps you fix them — no subscription needed.',
  },
  'resume-io-alternative': {
    name: 'Resume.io',
    slug: 'resume-io-alternative',
    title: 'Best Resume.io Alternative — Free ATS Resume Analyzer',
    desc: 'Looking for a free Resume.io alternative? Hunderedform analyzes your resume, gives you an ATS score, and helps you improve it in minutes.',
  },
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const page = competitorData[params.slug];
  if (!page) return { title: 'Compare | Hunderedform' };

  return {
    title: page.title,
    description: page.desc,
    alternates: { canonical: `https://hunderedform.com/compare/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.desc,
      url: `https://hunderedform.com/compare/${page.slug}`,
      images: [{ url: 'https://hunderedform.com/media/hunderedform-og-card.png', width: 1200, height: 630 }],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(competitorData).map((slug) => ({ slug }));
}
```

---

### 3.8 Blog Post — `app/blog/[slug]/page.tsx`

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug); // your CMS/MDX fetch function

  return {
    title: post.title, // template adds "| Hunderedform" automatically
    description: post.excerpt, // max 155 chars
    alternates: { canonical: `https://hunderedform.com/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `https://hunderedform.com/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: ['https://hunderedform.com/about'],
      images: [
        {
          url: post.ogImage || 'https://hunderedform.com/media/hunderedform-og-card.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}
```

---

## 4. JSON-LD Schema Markup

Create a reusable component: `components/seo/JsonLd.tsx`

```tsx
// components/seo/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

---

### 4.1 Organization Schema — add to `app/layout.tsx` (global)

```tsx
// app/layout.tsx — inside <head> or at end of <body>
import { JsonLd } from '@/components/seo/JsonLd';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hunderedform',
  url: 'https://hunderedform.com',
  logo: 'https://hunderedform.com/media/hunderedform_logo.png',
  description:
    'Hunderedform is a free AI-powered resume optimizer and ATS score checker trusted by 50,000+ job seekers worldwide.',
  sameAs: [
    // Add your social profiles when created:
    // 'https://twitter.com/hunderedform',
    // 'https://www.linkedin.com/company/hunderedform',
    // 'https://www.instagram.com/hunderedform',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: 'English',
  },
};

// In your layout JSX:
<JsonLd data={organizationSchema} />
```

---

### 4.2 WebApplication + AggregateRating Schema — `app/page.tsx` and `/resume-analyzer`

```tsx
// Add to homepage and /resume-analyzer
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Hunderedform ATS Resume Checker',
  url: 'https://hunderedform.com/resume-analyzer',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  description:
    'Free AI-powered ATS resume checker. Upload your resume and get an instant ATS compatibility score, keyword gap analysis, and improvement suggestions.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
    description: 'Free plan — 1 full resume review per month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '50000',   // update this number as it grows
    reviewCount: '50000',
  },
  featureList: [
    'ATS Compatibility Score',
    'Keyword Gap Analysis',
    'Bullet Point Rewriter',
    'ATS-Friendly Resume Templates',
    'Job Description Matching',
    'Real-Time Resume Feedback',
  ],
  creator: {
    '@type': 'Organization',
    name: 'Hunderedform',
    url: 'https://hunderedform.com',
  },
};

// In page JSX:
<JsonLd data={webAppSchema} />
```

---

### 4.3 FAQPage Schema — `app/page.tsx` (homepage FAQ section)

```tsx
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is the AI resume analysis?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hunderedform\'s AI is trained on thousands of resumes that actually got people hired. You can see exactly why your score changed — nothing is hidden.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I cancel the Pro plan anytime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, anytime. It\'s month-to-month billing. Cancel from your account settings — no email needed, no explanation required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What file formats does Hunderedform support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDF, DOC, and DOCX — all work fine, up to 10MB. Make sure your resume is not a scanned image as we need actual text to analyze it.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my resume data secure on Hunderedform?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Everything is encrypted. Hunderedform never sells or shares your data. You can delete your resume from our servers at any time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will Hunderedform guarantee I get interviews?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Hunderedform cannot guarantee interviews, but it makes your resume clearer, more relevant, and easier for hiring software to read — which means you will hear back from more places.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Hunderedform store my resume forever?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Free accounts are cleaned up after 30 days of inactivity. Pro accounts keep your files as long as you want, and you can delete them anytime.',
      },
    },
  ],
};

<JsonLd data={faqSchema} />
```

---

### 4.4 BreadcrumbList Schema — Blog posts and Compare pages

```tsx
// Use on /blog/[slug] and /compare/[slug]
function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Usage on a blog post:
<JsonLd data={breadcrumbSchema([
  { name: 'Home', url: 'https://hunderedform.com' },
  { name: 'Blog', url: 'https://hunderedform.com/blog' },
  { name: post.title, url: `https://hunderedform.com/blog/${post.slug}` },
])} />

// Usage on a compare page:
<JsonLd data={breadcrumbSchema([
  { name: 'Home', url: 'https://hunderedform.com' },
  { name: 'Compare', url: 'https://hunderedform.com/compare' },
  { name: `Hunderedform vs ${competitor}`, url: `https://hunderedform.com/compare/${slug}` },
])} />
```

---

### 4.5 BlogPosting Schema — `app/blog/[slug]/page.tsx`

```tsx
const blogPostSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.ogImage || 'https://hunderedform.com/media/hunderedform-og-card.png',
  datePublished: post.publishedAt,   // ISO 8601: '2026-05-10T00:00:00Z'
  dateModified: post.updatedAt,
  author: {
    '@type': 'Organization',
    name: 'Hunderedform',
    url: 'https://hunderedform.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Hunderedform',
    logo: {
      '@type': 'ImageObject',
      url: 'https://hunderedform.com/media/hunderedform_logo.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://hunderedform.com/blog/${post.slug}`,
  },
  url: `https://hunderedform.com/blog/${post.slug}`,
  keywords: post.tags?.join(', '),
};

<JsonLd data={blogPostSchema} />
```

---

## 5. robots.txt

Create at `public/robots.txt`:

```txt
User-agent: *
Allow: /

# Block non-public routes
Disallow: /api/
Disallow: /dashboard/
Disallow: /account/
Disallow: /_next/
Disallow: /admin/

# Allow important assets
Allow: /media/
Allow: /blog/
Allow: /compare/

# Crawl delay (optional, be polite to crawlers)
Crawl-delay: 1

# Sitemap
Sitemap: https://hunderedform.com/sitemap.xml
```

---

## 6. sitemap.xml — Dynamic Generation

Use Next.js App Router's built-in sitemap generation.  
Create `app/sitemap.ts`:

```ts
// app/sitemap.ts
import { MetadataRoute } from 'next';

// Import your blog posts / CMS fetch function
// import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hunderedform.com';
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,                          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/resume-analyzer`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/ats-score-checker`,         lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/resume-optimizer`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/free-resume-checker`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/resume-templates`,          lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/blog`,                      lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${baseUrl}/about`,                     lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/compare/resumeworked-alternative`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/compare/jobscan-alternative`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/compare/zety-alternative`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/compare/resume-io-alternative`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`,            lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms-of-service`,          lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/cookie-policy`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // Dynamic blog posts — uncomment when blog is live
  // const posts = await getAllPosts();
  // const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt || post.publishedAt,
  //   changeFrequency: 'monthly',
  //   priority: 0.6,
  // }));

  return [
    ...staticPages,
    // ...blogPages,
  ];
}
```

---

## 7. GA4 + Event Tracking

Create `lib/analytics.ts`:

```ts
// lib/analytics.ts
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Core event tracker
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// ── Funnel Events (track all of these) ─────────────────────────────────────

// 1. User uploads a resume
export const trackResumeUploaded = (fileType: string, sourcePage: string) =>
  trackEvent('resume_uploaded', { file_type: fileType, source_page: sourcePage });

// 2. ATS score is shown to the user
export const trackScoreViewed = (score: number, sourcePage: string) =>
  trackEvent('ats_score_viewed', { score, source_page: sourcePage });

// 3. User clicks "Upgrade to Pro"
export const trackUpgradeClicked = (sourcePage: string, planName: string) =>
  trackEvent('upgrade_clicked', { source_page: sourcePage, plan_name: planName });

// 4. User clicks "Analyze Resume Free" CTA
export const trackCTAClicked = (ctaLocation: string) =>
  trackEvent('cta_clicked', { cta_location: ctaLocation });

// 5. Blog post CTA → tool
export const trackBlogCTAClicked = (postSlug: string) =>
  trackEvent('blog_cta_clicked', { post_slug: postSlug });

// 6. User signs up (free plan)
export const trackSignup = (method: string) =>
  trackEvent('sign_up', { method });

// 7. User copies a keyword suggestion
export const trackKeywordCopied = (keyword: string) =>
  trackEvent('keyword_copied', { keyword });
```

**Usage example in a component:**
```tsx
import { trackResumeUploaded, trackScoreViewed } from '@/lib/analytics';

// After file upload:
trackResumeUploaded('pdf', '/resume-analyzer');

// After score displays:
trackScoreViewed(82, '/resume-analyzer');
```

---

## 8. Blog SEO Template

Every blog post must follow this structure. Apply in your MDX or CMS template.

```mdx
---
title: "How to Make Your Resume ATS-Friendly in 10 Minutes"
slug: "how-to-make-resume-ats-friendly"
excerpt: "Most resumes are rejected by ATS before a human ever reads them. Here's how to fix yours in 10 minutes — step by step."
publishedAt: "2026-05-15T00:00:00Z"
updatedAt: "2026-05-15T00:00:00Z"
author: "Hunderedform Team"
tags: ["ATS", "resume tips", "job search"]
ogImage: "/media/blog/ats-friendly-resume-guide.png"  # 1200x630px
targetKeyword: "how to make resume ATS friendly"
readTime: "7 min read"
---

## Introduction (include target keyword in first 100 words)
Most resumes never reach a human recruiter...

## H2 Section 1

### H3 Subsection

## H2 Section 2

## Frequently Asked Questions
Use H3 for each question — these trigger FAQ rich results.

### What does ATS stand for?
...

### How do I know if my resume is ATS-friendly?
...

---
**Check your resume's ATS score for free →** [Try Hunderedform](/resume-analyzer)
```

**Blog post rules:**
- Target keyword appears in: title, first paragraph, one H2, image alt text, meta description
- Word count: 1,200–2,500 words (longer = more ranking signals)
- Every post must end with a CTA linking to `/resume-analyzer`
- Add 2–3 internal links to other blog posts
- Include one external link to a credible source (LinkedIn, BLS, Glassdoor)
- Use `next/image` for all blog images with descriptive alt text

---

## 9. Image SEO Rules

**All images must use `next/image`.** Never use raw `<img>` tags.

```tsx
// ✅ CORRECT
import Image from 'next/image';

<Image
  src="/media/hunderedform_logo.png"
  alt="Hunderedform free ATS resume checker logo"
  width={180}
  height={40}
  priority  // add for above-the-fold images only
/>

// ❌ WRONG
<img src="/media/hunderedform_logo.png" alt="logo" />
```

**Alt text rules:**
| Image | Alt Text |
|---|---|
| Logo | `Hunderedform free ATS resume checker logo` |
| OG Card | `Hunderedform AI Resume Optimizer — Get your resume score and fix it` |
| ATS score screenshot | `ATS resume score out of 100 shown in Hunderedform dashboard` |
| Feature icon | Describe what the feature does, not what the icon looks like |
| Testimonial avatar | `[Name] — [Job Title]` |
| Blog hero image | Include the post's target keyword |

**Image file naming — use hyphens, include keywords:**
```
✅ ats-score-checker-dashboard.png
✅ free-resume-analyzer-results.png
❌ image1.png
❌ screenshot_final_v2.png
```

---

## 10. Internal Linking Rules

Every page must link to at least 2 other pages. Follow these rules:

### Core Tool Pages
- Every page that mentions "resume" links to `/resume-analyzer`
- Every page that mentions "ATS score" links to `/ats-score-checker`
- Every page that mentions "keywords" links to `/resume-optimizer`

### Blog Posts
- Every blog post ends with a CTA linking to `/resume-analyzer`
- Every blog post links to 2–3 related posts
- Use descriptive anchor text — never "click here" or "read more"

```tsx
// ✅ CORRECT anchor text
<Link href="/ats-score-checker">check your ATS score for free</Link>
<Link href="/blog/ats-resume-mistakes">10 ATS resume mistakes to avoid</Link>

// ❌ WRONG anchor text
<Link href="/ats-score-checker">click here</Link>
<Link href="/blog/ats-resume-mistakes">read more</Link>
```

### Navigation — add breadcrumbs to all sub-pages

```tsx
// components/Breadcrumb.tsx
export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', fontSize: '13px' }}>
        {items.map((item, i) => (
          <li key={i}>
            {item.href ? <a href={item.href}>{item.label}</a> : <span>{item.label}</span>}
            {i < items.length - 1 && <span aria-hidden="true"> › </span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

---

## 11. Heading Hierarchy Rules

**One H1 per page — always.** Never skip heading levels.

```
H1  → One per page. Contains primary keyword. Max 60 chars.
H2  → Major sections. Contains secondary keywords. 3–6 per page.
H3  → Subsections. Contains LSI / long-tail keywords.
H4  → FAQ answers, feature breakdowns, nested sub-points.
```

**Never use headings for styling.** If you want big text, use CSS. Headings are for structure.

```tsx
// ❌ WRONG — using H2 just for style
<h2 style={{ fontSize: '14px' }}>Upload your file</h2>

// ✅ CORRECT
<p className="upload-label">Upload your file</p>
```

---

## 12. Core Web Vitals Checklist

Run PageSpeed Insights on every new page before shipping: https://pagespeed.web.dev/

### LCP — Largest Contentful Paint (target: < 2.5s)
- [ ] Add `priority` prop to above-the-fold `next/image` (hero image, logo)
- [ ] Preconnect to external domains in `<head>`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://www.googletagmanager.com" />
  ```
- [ ] Use `next/font` for Google Fonts — eliminates render-blocking font requests

### CLS — Cumulative Layout Shift (target: < 0.1)
- [ ] Always specify `width` and `height` on every `next/image`
- [ ] Reserve space for dynamic content (scores, charts) with `min-height` skeletons
- [ ] Never inject content above existing content after page load

### FID / INP — Interaction to Next Paint (target: < 200ms)
- [ ] Move heavy JS (resume parser, score calculator) to Web Workers
- [ ] Use `loading="lazy"` on all below-fold images
- [ ] Defer non-critical third-party scripts with `strategy="lazyOnload"`

### Next.js specific
```tsx
// next.config.js — enable image optimization
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 60,
  },
  compress: true,
};
```

---

## 13. hreflang — Global Targeting

Add hreflang to your `app/layout.tsx` for global targeting.  
Start with English. Add regional variants as you create them.

```tsx
// app/layout.tsx — inside metadata alternates
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://hunderedform.com',
    languages: {
      'en': 'https://hunderedform.com',
      'en-US': 'https://hunderedform.com',
      'en-IN': 'https://hunderedform.com',   // India is your largest market
      'en-GB': 'https://hunderedform.com',   // UK growing
      // When you add regional pages:
      // 'en-IN': 'https://hunderedform.com/in',
      // 'en-GB': 'https://hunderedform.com/uk',
      'x-default': 'https://hunderedform.com',
    },
  },
};
```

---

## 14. Keyword Targeting Map

Each URL owns one primary keyword. Never target the same keyword on two pages.

| URL | Primary Keyword | Secondary Keywords |
|---|---|---|
| `/` | free ATS resume checker | resume optimizer, AI resume review |
| `/resume-analyzer` | free resume analyzer | AI resume review, resume analysis tool |
| `/ats-score-checker` | ATS score checker | check resume ATS score, ATS resume score |
| `/resume-optimizer` | AI resume optimizer | resume keyword optimizer, resume keyword checker |
| `/free-resume-checker` | free resume checker | resume checker online, check my resume free |
| `/pricing` | Hunderedform pricing | resume checker free vs pro |
| `/resume-templates` | ATS resume templates | ATS friendly resume templates free |
| `/compare/resumeworded-alternative` | ResumeWorded alternative | free ResumeWorded replacement |
| `/compare/jobscan-alternative` | Jobscan alternative | free Jobscan replacement |
| `/blog/how-to-make-resume-ats-friendly` | how to make resume ATS friendly | ATS resume tips |
| `/blog/what-is-ats-score` | what is ATS score | ATS resume score meaning |
| `/blog/best-free-resume-checker-2026` | best free resume checker 2026 | top ATS checkers |

---

## 15. What NOT To Do

These are the most common SEO mistakes to avoid. Treat this as a code review checklist.

```
❌ Never use the same title tag on two different pages
❌ Never use a meta description longer than 160 characters
❌ Never use a title tag longer than 60 characters
❌ Never render page content with JavaScript only (must be in HTML for Google to crawl)
❌ Never use noindex on pages you want ranked
❌ Never block CSS or JS files in robots.txt
❌ Never link to the typo domain (hunderedform.com) anywhere in the code
❌ Never use "click here" or "read more" as link anchor text
❌ Never skip heading levels (H1 → H3 without H2)
❌ Never put two H1 tags on one page
❌ Never use images without alt text
❌ Never name image files with generic names (image1.png, screenshot.png)
❌ Never hardcode `noindex` in layout.tsx — it kills all page rankings
❌ Never use client-side rendering for SEO-critical content
   (use Next.js SSG or SSR — export metadata from server components)
❌ Never create a page without a canonical tag
❌ Never let GA4 installation block page rendering (use strategy="afterInteractive")
```

---

## Checklist — Before You Ship Any New Page

Copy this checklist into your PR description for every new page:

```
SEO Pre-Ship Checklist
[ ] Title tag: unique, includes primary keyword, under 60 chars
[ ] Meta description: unique, includes CTA or benefit, under 155 chars
[ ] Canonical URL: set correctly for this page
[ ] H1: one per page, includes primary keyword
[ ] H2s: 3–6 per page, include secondary keywords
[ ] All images: next/image, have width/height, have descriptive alt text
[ ] Schema: correct JSON-LD added (WebApp, FAQ, Article, or Breadcrumb)
[ ] Internal links: at least 2 links to other pages
[ ] OG tags: title, description, image verified in https://opengraph.xyz
[ ] Canonical domain: no links to hunderedform.com (typo)
[ ] Page added to sitemap.ts
[ ] GA4 events: relevant events tracked on this page
[ ] PageSpeed: 90+ score on mobile (https://pagespeed.web.dev)
[ ] No console errors in production build
```

---

*This document is the source of truth for all SEO decisions on Hunderedform.*  
*Update it whenever you add new pages, change URLs, or update metadata.*
