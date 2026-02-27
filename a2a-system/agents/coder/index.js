import express from "express";
import { askLLM } from "../../shared/llm.js";
import { buildTaskResponse, buildErrorResponse } from "../../shared/a2a.js";
import { coderCard } from "./agent-card.js";

const app = express();
app.use(express.json());

app.get("/.well-known/agent.json", (req, res) => res.json(coderCard));

app.post("/", async (req, res) => {
  const { id, method, params } = req.body;

  if (method !== "tasks/send") {
    return res.json(buildErrorResponse(id, "Method not supported"));
  }

  try {
    const userMessage = params.message.parts[0].text;
    const prompt = `You are an expert software engineer. Answer only with code and brief explanations.\n\nTask: ${userMessage}`;

    // Uses deepseek-coder (largest, best quality)
    // const response = await askLLM("deepseek-coder", prompt);
    const response = await askLLM("llama3", prompt);
    res.json(buildTaskResponse(id, response));
  } catch (err) {
    res.json(buildErrorResponse(id, err.message));
  }
});

app.listen(3001, () => console.log("🤖 CoderAgent (deepseek-coder) → :3001"));
