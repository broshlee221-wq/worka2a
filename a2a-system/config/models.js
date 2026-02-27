// config/models.js
export const MODELS = {
  llama3: {
    name: "llama3",
    label: "LLaMA 3 (Coding)",
    strengths: ["code generation", "debugging", "code review"],
    port: null
  },
  deepseekCoder: {
    name: "deepseek-coder",
    label: "DeepSeek Coder (Large)",
    strengths: ["heavy code tasks", "complex debugging"],
    port: null
  },
  deepseekCoder6b: {
    name: "deepseek-coder:6.7b",
    label: "DeepSeek Coder 6.7B (Research)",
    strengths: ["research", "reasoning", "summarization", "Q&A"],
    port: null
  }
};

export const OLLAMA_BASE = "http://127.0.0.1:11434";
