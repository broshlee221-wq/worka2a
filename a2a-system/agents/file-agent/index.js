import express from "express";
import fs from "fs/promises";
import { askLLM } from "../../shared/llm.js";
import { buildTaskResponse, buildErrorResponse } from "../../shared/a2a.js";
import { fileAgentCard } from "./agent-card.js";

const app = express();
app.use(express.json());

app.get("/.well-known/agent.json", (req, res) => res.json(fileAgentCard));

app.post("/", async (req, res) => {
  const { id, method, params } = req.body;

  if (method !== "tasks/send") {
    return res.json(buildErrorResponse(id, "Method not supported"));
  }

  try {
    const userMessage = params.message.parts[0].text;

    // Extract file path from message (e.g. "read /home/user/code.js")
    const pathMatch = userMessage.match(/(?:read|analyze|open)\s+([^\s]+)/i);

    let prompt;
    if (pathMatch) {
      const filePath = pathMatch[1];
      const content = await fs.readFile(filePath, "utf8");
      prompt = `Analyze this file (${filePath}):\n\n${content}\n\nUser request: ${userMessage}`;
    } else {
      prompt = userMessage;
    }

    // Uses deepseek-coder:6.7b (fast, good for file analysis)
    const response = await askLLM("deepseek-coder:6.7b", prompt);
    res.json(buildTaskResponse(id, response));
  } catch (err) {
    res.json(buildErrorResponse(id, err.message));
  }
});

app.listen(3003, () => console.log("📁 FileAgent (deepseek-coder:6.7b) → :3003"));
