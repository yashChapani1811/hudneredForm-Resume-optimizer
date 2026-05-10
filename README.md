# HundredForm Resume Optimizer

This repository contains:

- **Landing site** — `index.html` at the repo root (Tailwind, marketing sections, tracking scripts).
- **Angular resume app** — source in `app/hundredForm-converter/`; production browser bundles are copied into **`app/browser/`** and loaded from the landing page (see the Angular script and stylesheet links in `index.html`).

The Angular app calls **`POST /api/openrouter/v1/chat/completions`** on the **same origin** as the page. That path must be implemented by a **Node server** (local or production). A **static-only** host returns **405 Method Not Allowed** for that POST.

---

## Prerequisites

- **Node.js 18+** ([nodejs.org](https://nodejs.org/))
- **OpenRouter** account and API key ([openrouter.ai](https://openrouter.ai/))

---

## Build the Angular app

From the Angular project folder:

```bash
cd app/hundredForm-converter
npm install
npm run build
```

Copy the **browser** output into the landing tree (replace hashes if they changed):

- From: `app/hundredForm-converter/dist/hundredForm-converter/browser/`
- To: `app/browser/` (at the repo root)

Update **`index.html`** if file names changed (for example `main-*.js`, `styles-*.css`, chunk names under `app/browser/`).

---

## Run the landing site locally (with AI proxy)

The repo includes **`landing-server.mjs`** next to `index.html`. It:

- Serves the **repo root** as static files (`index.html`, `js/`, `app/browser/`, `media/`, etc.).
- Proxies **`POST /api/openrouter/v1/chat/completions`** to OpenRouter using your key (never stored in the client bundle).

**PowerShell:**

```powershell
cd "D:\HundredForm Resume Optimizer"   # repo root (folder that contains index.html)
$env:OPENROUTER_API_KEY = "sk-or-v1-..."   # your key
$env:PORT = "8080"
node landing-server.mjs
```

Or:

```bash
npm run start:landing
```

Open `http://127.0.0.1:8080/` (or your machine’s LAN IP, e.g. `http://192.168.56.1:8080/`). The server listens on **`0.0.0.0`** by default so other devices on the network can reach it.

**Easiest local setup — `.env` file:** In the repo root (next to `index.html` and `landing-server.mjs`), copy `.env.example` to **`.env`** and set:

```env
OPENROUTER_API_KEY=sk-or-v1-your-real-key-here
```

Then run `node landing-server.mjs` with **no** PowerShell env vars. The server loads `.env` automatically (shell variables still override if both are set). The file **`.env`** is listed in **`.gitignore`** so it is not committed.

**Security:** Do not commit real API keys. Use `.env` locally, environment variables in production.

---

## Alternative: full Angular SSR server

If you serve only the Angular **dist** output (not the root `index.html`):

```powershell
cd app/hundredForm-converter
npm run build
$env:OPENROUTER_API_KEY = "sk-or-v1-..."
$env:PORT = "8080"
node dist/hundredForm-converter/server/server.mjs
```

That uses the Express app in `src/server.ts`, which includes the same OpenRouter proxy route.

---

## Deploy the application

To deploy the application, you need a Node.js server that can serve the static files and proxy the OpenRouter API calls. The included `landing-server.mjs` provides this functionality.

**Deployment options:**
- **VPS/Cloud server**: Run `landing-server.mjs` with PM2 or similar process manager
- **Platform.sh**: Configure Node.js service with environment variables
- **Heroku**: Deploy as a Node.js application with buildpack
- **DigitalOcean App Platform**: Use Node.js runtime

---

## Troubleshooting

| Symptom | Likely cause |
|--------|----------------|
| **405** on `POST /api/openrouter/...` | Static server only (no Node `landing-server.mjs`). |
| **401** `User not found` (from OpenRouter) | Wrong, revoked, or extra-whitespace API key. Regenerate at [openrouter.ai/settings/keys](https://openrouter.ai/settings/keys), update repo-root `.env`, restart the server; test with `curl -s -H "Authorization: Bearer YOUR_KEY" https://openrouter.ai/api/v1/auth/key`. |
| **503** `no healthy upstream` / `Provider returned error` | OpenRouter could not reach that model’s host (often on free or busy routes). Retry later, or set `ai_model.model_name` in `app/hundredForm-converter/src/environments/environment.ts` to `openrouter/free` or another model from [openrouter.ai/models](https://openrouter.ai/models); paid models are more reliable. |
| **503** "missing API key" (your proxy) | `OPENROUTER_API_KEY` not set on the server process. |
| **404** on API path | Server not configured to handle `/api/openrouter/...` path. |
| Chunks fail to load | Wrong paths in `index.html` after a new Angular build; copy all new `app/browser` files and update hashes. |

---

## Repo layout (quick reference)

| Path | Role |
|------|------|
| `index.html` | Landing page + embeds Angular from `app/browser/`. |
| `app/browser/` | Angular **browser** build output (copy from `dist/.../browser/`). |
| `app/hundredForm-converter/` | Angular **source** and SSR server (`src/server.ts`). |
| `landing-server.mjs` | Local static + OpenRouter proxy (no extra npm deps). |
| `js/`, `css/`, `media/`, `favicon/` | Landing assets. |

---

## License

Private / all rights reserved unless you add an explicit license file.
