/**
 * Dev server proxy: same-origin `/api/openrouter/*` -> OpenRouter.
 * Start in SAME terminal where OPENROUTER_API_KEY is exported:
 *   PowerShell: $env:OPENROUTER_API_KEY="sk-or-v1-..."; npm start
 */
const key = (process.env.OPENROUTER_API_KEY || '').replace(/^\uFEFF/, '').trim();

module.exports = {
  '/api/openrouter': {
    target: 'https://openrouter.ai',
    secure: true,
    changeOrigin: true,
    logLevel: 'warn',
    pathRewrite: { '^/api/openrouter': '/api' },
    headers: key ? { Authorization: `Bearer ${key}` } : {},
    onProxyReq: (proxyReq, req) => {
      // Ensure header is always present even if dev-server ignores static headers in some modes.
      if (key) {
        proxyReq.setHeader('Authorization', `Bearer ${key}`);
      }
      const referer = req.headers['referer'] || req.headers['origin'] || 'http://localhost:4200';
      proxyReq.setHeader('HTTP-Referer', referer);
      proxyReq.setHeader('X-Title', 'HundredForm Resume Optimizer');
    },
  },
};
