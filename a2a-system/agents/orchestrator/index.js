// agents/orchestrator/index.js
import express from "express";
import { askLLM } from "../../shared/llm.js";
import { callAgent, buildTaskResponse, buildErrorResponse } from "../../shared/a2a.js";
import { orchestratorCard } from "./agent-card.js";

const app = express();
app.use(express.json());

// Known agents registry
const AGENTS = {
  coder:      "http://localhost:3001",
  researcher: "http://localhost:3002",
  fileAgent:  "http://localhost:3003"
};

// Use LLaMA3 to decide which agent should handle the task
async function routeTask(userMessage) {
  const routingPrompt = `
You are a task router. Given a user message, decide which agent should handle it.

Agents available:
- coder: for writing code, debugging, code review, programming questions
- researcher: for general questions, research, explanations, summaries
- fileAgent: for reading files, analyzing files (message contains a file path)

User message: "${userMessage}"

Reply with ONLY one word: coder, researcher, or fileAgent
`.trim();

  const decision = await askLLM("llama3", routingPrompt);
  const cleaned = decision.trim().toLowerCase();

  if (cleaned.includes("coder") && cleaned.includes("file")) return "fileAgent";
  if (cleaned.includes("file")) return "fileAgent";
  if (cleaned.includes("coder")) return "coder";
  if (cleaned.includes("researcher")) return "researcher";
  return "researcher"; // default fallback
}

app.get("/.well-known/agent.json", (req, res) => res.json(orchestratorCard));

app.post("/", async (req, res) => {
  const { id, method, params } = req.body;

  if (method !== "tasks/send") {
    return res.json(buildErrorResponse(id, "Method not supported"));
  }

  try {
    const userMessage = params.message.parts[0].text;

    // 1. Decide which agent to use
    const targetAgent = await routeTask(userMessage);
    const agentUrl = AGENTS[targetAgent];
    console.log(`→ Routing to: ${targetAgent} (${agentUrl})`);

    // 2. Delegate to that agent
    const response = await callAgent(agentUrl, userMessage);

    // 3. Return result
    res.json(buildTaskResponse(id, `[${targetAgent}]: ${response}`));
  } catch (err) {
    res.json(buildErrorResponse(id, err.message));
  }
});

app.listen(3000, () => console.log("🎯 Orchestrator (llama3 router) → :3000"));
