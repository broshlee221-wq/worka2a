// shared/llm.js
import { OLLAMA_BASE } from "../config/models.js";

/**
 * Call any local Ollama model
 * @param {string} model  - model name from config
 * @param {string} prompt - the prompt
 * @param {object} opts   - optional: { stream: false, temperature: 0.7 }
 */
export async function askLLM(model, prompt, opts = {}) {
  const res = await fetch(`${OLLAMA_BASE}/api/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      ...opts
    })
  });

  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  return data.response;
}

/**
 * List all models currently available in Ollama
 */
export async function listModels() {
  const res = await fetch(`${OLLAMA_BASE}/api/tags`);
  const data = await res.json();
  return data.models.map(m => m.name);
}
