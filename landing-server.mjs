/**
 * Hunderedform landing site + OpenRouter proxy (no npm dependencies; Node 18+).
 *
 * Why: index.html embeds the Angular browser build from app/browser/. Static hosts
 * return 405 for POST /api/openrouter/... This server serves the repo root and proxies that path.
 *
 * Usage (from this file's directory — repo root next to index.html):
 *   set OPENROUTER_API_KEY=sk-or-...
 *   set PORT=8080
 *   node landing-server.mjs
 *
 * PowerShell:
 *   $env:OPENROUTER_API_KEY="sk-or-..."
 *   $env:PORT="8080"
 *   node landing-server.mjs
 *
 * Or create a `.env` file next to this script (see `.env.example`). Values from the shell
 * win over `.env` if both are set. `.env` is gitignored — do not commit keys.
 */

import http from 'node:http';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname);

/**
 * Load optional `.env` from repo root (KEY=value lines). Does not override existing process.env.
 */
function applyDotEnvFile() {
  const envPath = path.join(SITE_ROOT, '.env');
  if (!fs.existsSync(envPath)) {
    return;
  }
  let raw;
  try {
    raw = fs.readFileSync(envPath, 'utf8');
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }
    const eq = trimmed.indexOf('=');
    if (eq <= 0) {
      continue;
    }
    const key = trimmed.slice(0, eq).trim();
    if (!key || key.includes(' ')) {
      continue;
    }
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) {
      process.env[key] = value.replace(/^\uFEFF/, '');
    }
  }
}

applyDotEnvFile();

const PORT = Number(process.env.PORT) || 8080;
const HOST = process.env.HOST || '0.0.0.0';

const OPENROUTER_UPSTREAM = 'https://openrouter.ai/api/v1/chat/completions';
const PROXY_PATH = '/api/openrouter/v1/chat/completions';
const CANONICAL_HOST = 'hunderedform.com';
const REDIRECT_HOSTS = new Set(['www.hunderedform.com']);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.woff2': 'font/woff2',
};

function safeResolvePath(urlPathname) {
  let rel = decodeURIComponent(urlPathname).replace(/^\/+/, '');
  if (rel === '' || rel === '/') {
    rel = 'index.html';
  }
  const abs = path.normalize(path.join(SITE_ROOT, rel));
  const rootNorm = path.normalize(SITE_ROOT);
  const relToRoot = path.relative(rootNorm, abs);
  if (relToRoot.startsWith('..') || path.isAbsolute(relToRoot)) {
    return null;
  }
  return abs;
}

async function readRequestBody(req, maxBytes = 4 * 1024 * 1024) {
  const chunks = [];
  let total = 0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > maxBytes) {
      throw new Error('Payload too large');
    }
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

async function handleOpenRouterProxy(req, res) {
  const pathname = new URL(req.url || '/', `http://localhost`).pathname;
  if (pathname !== PROXY_PATH && pathname !== `${PROXY_PATH}/`) {
    res.writeHead(404).end();
    return;
  }

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      Allow: 'POST, OPTIONS',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    });
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, { Allow: 'POST, OPTIONS' }).end('Method Not Allowed');
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY?.replace(/^\uFEFF/, '').trim();
  if (!apiKey) {
    res.writeHead(503, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(
      JSON.stringify({
        error: {
          message:
            'OPENROUTER_API_KEY is not set. Add OPENROUTER_API_KEY=sk-or-v1-... to a `.env` file in the repo root (same folder as landing-server.mjs), or set the variable in your shell before starting the server. See `.env.example`.',
        },
      }),
    );
    return;
  }

  let bodyText;
  try {
    bodyText = await readRequestBody(req);
  } catch {
    res.writeHead(413, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { message: 'Request body too large' } }));
    return;
  }

  const referer = req.headers.referer || req.headers.origin || `http://${req.headers.host || 'localhost'}`;

  try {
    const upstream = await fetch(OPENROUTER_UPSTREAM, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': referer,
        'X-Title': 'Hunderedform Resume Optimizer',
      },
      body: bodyText || '{}',
    });
    const text = await upstream.text();
    const ct = upstream.headers.get('content-type') || 'application/json; charset=utf-8';
    res.writeHead(upstream.status, { 'Content-Type': ct });
    res.end(text);
  } catch (e) {
    console.error('OpenRouter proxy error:', e);
    res.writeHead(502, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ error: { message: 'Upstream fetch failed' } }));
  }
}

async function handleStatic(req, res) {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const abs = safeResolvePath(url.pathname);
  if (!abs) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  let stat;
  try {
    stat = await fsp.stat(abs);
  } catch {
    res.writeHead(404).end('Not Found');
    return;
  }

  if (stat.isDirectory()) {
    const indexPath = path.join(abs, 'index.html');
    try {
      await fsp.access(indexPath);
      return void sendFile(req, res, indexPath);
    } catch {
      res.writeHead(404).end('Not Found');
      return;
    }
  }

  return void sendFile(req, res, abs);
}

function sendFile(req, res, abs) {
  const ext = path.extname(abs).toLowerCase();
  const type = MIME[ext] || 'application/octet-stream';
  const isHead = req.method === 'HEAD';

  try {
    const st = fs.statSync(abs);
    if (!st.isFile()) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': 'no-cache',
      'Content-Length': String(st.size),
    });
    if (isHead) {
      res.end();
      return;
    }
    const stream = fs.createReadStream(abs);
    stream.on('error', () => {
      if (!res.headersSent) res.writeHead(500);
      res.end();
    });
    stream.pipe(res);
  } catch {
    res.writeHead(404).end();
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const requestHost = String(req.headers.host || '').split(':')[0].toLowerCase();
  if (REDIRECT_HOSTS.has(requestHost)) {
    res.writeHead(301, {
      Location: `https://${CANONICAL_HOST}${url.pathname}${url.search}`,
      'Cache-Control': 'public, max-age=3600',
    });
    res.end();
    return;
  }
  if (url.pathname === PROXY_PATH || url.pathname === `${PROXY_PATH}/`) {
    void handleOpenRouterProxy(req, res);
    return;
  }
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD, POST, OPTIONS' }).end();
    return;
  }
  void handleStatic(req, res).catch((e) => {
    console.error(e);
    if (!res.headersSent) res.writeHead(500);
    res.end();
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Landing site + OpenRouter proxy`);
  console.log(`  Site:   http://${HOST === '0.0.0.0' ? '127.0.0.1' : HOST}:${PORT}/`);
  console.log(`  Proxy:  POST http://127.0.0.1:${PORT}${PROXY_PATH}`);
  if (HOST === '0.0.0.0') {
    console.log(`  (Listening on all interfaces; use your LAN IP for other devices.)`);
  }
  const key = process.env.OPENROUTER_API_KEY?.trim();
  if (!key) {
    console.warn(
      '\n[landing-server] OPENROUTER_API_KEY is missing. Resume AI will return 503 until you fix it.\n' +
        '  Option A: Create a file named `.env` in:\n' +
        `    ${SITE_ROOT}\n` +
        '    with a line: OPENROUTER_API_KEY=sk-or-v1-your-key-here\n' +
        '  Option B: PowerShell: $env:OPENROUTER_API_KEY="sk-or-v1-..."; node landing-server.mjs\n' +
        '  Copy from: .env.example\n',
    );
  } else {
    console.log(`  OpenRouter: API key loaded (${key.slice(0, 10)}…)`);
  }
});
