import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

const openRouterJson = express.json({ limit: '4mb' });

/** Must match `environment.ai_model.api_url` (no trailing slash). */
const OPENROUTER_PROXY_PATH = '/api/openrouter/v1/chat/completions';

function sendOpenRouterOptions(_req: express.Request, res: express.Response): void {
  res.setHeader('Allow', 'POST, OPTIONS');
  res.status(204).end();
}

/**
 * Same-origin proxy for OpenRouter so production browser bundles never embed an API key.
 * Set OPENROUTER_API_KEY in the environment when running this server.
 *
 * Do not serve `dist/.../browser` alone with a static-only tool (serve, http-server, etc.):
 * those return 405 for POST. Run `node dist/.../server/server.mjs` instead.
 */
async function proxyOpenRouterChat(req: express.Request, res: express.Response): Promise<void> {
  const apiKey = process.env['OPENROUTER_API_KEY']?.replace(/^\uFEFF/, '').trim();
  if (!apiKey) {
    res.status(503).json({
      error: { message: 'Server is missing OPENROUTER_API_KEY. Set it for the Node process that runs this app.' },
    });
    return;
  }

  const referer =
    (typeof req.get === 'function' && (req.get('referer') || req.get('origin'))) || 'http://localhost';

  try {
    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': referer,
        'X-Title': 'HundredForm Resume Optimizer',
      },
      body: JSON.stringify(req.body ?? {}),
    });

    const text = await upstream.text();
    const contentType = upstream.headers.get('content-type') ?? 'application/json';
    res.status(upstream.status).setHeader('Content-Type', contentType).send(text);
  } catch (err) {
    console.error('OpenRouter proxy error:', err);
    res.status(502).json({
      error: { message: 'Failed to reach OpenRouter from the server proxy.' },
    });
  }
}

app.options(OPENROUTER_PROXY_PATH, sendOpenRouterOptions);
app.options(`${OPENROUTER_PROXY_PATH}/`, sendOpenRouterOptions);
app.post(OPENROUTER_PROXY_PATH, openRouterJson, proxyOpenRouterChat);
app.post(`${OPENROUTER_PROXY_PATH}/`, openRouterJson, proxyOpenRouterChat);

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is ran via PM2.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = Number(process.env['PORT']) || 4000;
  const host = process.env['HOST'] || '0.0.0.0';
  app.listen(port, host, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://${host}:${port}`);
    console.log(`OpenRouter proxy: POST http://${host}:${port}${OPENROUTER_PROXY_PATH}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Node.js deployment.
 */
export const reqHandler = createNodeRequestHandler(app);
