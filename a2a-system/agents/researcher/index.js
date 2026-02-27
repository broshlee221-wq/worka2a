import express from "express";
import { askLLM } from "../../shared/llm.js";
import { buildTaskResponse, buildErrorResponse } from "../../shared/a2a.js";
import { researcherCard } from "./agent-card.js";

const app = express();
app.use(express.json());

app.get("/.well-known/agent.json", (req, res) => res.json(researcherCard));

app.post("/", async (req, res) => {
  const { id, method, params } = req.body;

  if (method !== "tasks/send") {
    return res.json(buildErrorResponse(id, "Method not supported"));
  }

  try {
    const userMessage = params.message.parts[0].text;
    const prompt = `You are a knowledgeable research assistant. Be concise and accurate.\n\nQuestion: ${userMessage}`;

    // Uses llama3 (best for reasoning/research)
    // const response = await askLLM("llama3", prompt);
    const response = await askLLM("deepseek-coder:6.7b", prompt);
    res.json(buildTaskResponse(id, response));
  } catch (err) {
    res.json(buildErrorResponse(id, err.message));
  }
});

app.listen(3002, () => console.log("🔍 ResearcherAgent (llama3) → :3002"));
