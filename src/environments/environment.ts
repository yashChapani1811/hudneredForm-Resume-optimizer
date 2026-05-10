export const environment = {
  ai_model: {
    /**
     * `openrouter/free` picks an available free model (better uptime than pinning one `:free` model).
     * To pin a model, set e.g. `meta-llama/llama-3.3-70b-instruct:free` on https://openrouter.ai/models
     */
    model_name: 'openrouter/free',
    /**
     * Leave empty: the app calls the same-origin proxy below, and the Node server (or dev proxy)
     * attaches OPENROUTER_API_KEY. Never put a real OpenRouter key in this file.
     */
    api_key: '',
    /** Relative URL = browser → this app’s server → OpenRouter (works after `ng build`). */
    api_url: '/api/openrouter/v1/chat/completions',
  },
};
