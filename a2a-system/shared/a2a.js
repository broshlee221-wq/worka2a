// shared/a2a.js
import { v4 as uuid } from "uuid";

// Build a valid A2A task/send request body
export function buildTaskRequest(message) {
  return {
    jsonrpc: "2.0",
    id: uuid(),
    method: "tasks/send",
    params: {
      id: uuid(),
      message: {
        role: "user",
        parts: [{ type: "text", text: message }]
      }
    }
  };
}

// Build a valid A2A success response
export function buildTaskResponse(id, text) {
  return {
    jsonrpc: "2.0",
    id,
    result: {
      id: uuid(),
      status: { state: "completed" },
      artifacts: [
        {
          parts: [{ type: "text", text }]
        }
      ]
    }
  };
}

// Build an A2A error response
export function buildErrorResponse(id, message) {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code: -32603,
      message
    }
  };
}

// Call another A2A agent
export async function callAgent(agentUrl, message) {
  const body = buildTaskRequest(message);
  const res = await fetch(agentUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = await res.json();

  if (data.error) throw new Error(data.error.message);
  return data.result.artifacts[0].parts[0].text;
}

// Fetch an agent's card (discovery)
export async function fetchAgentCard(agentUrl) {
  const res = await fetch(`${agentUrl}/.well-known/agent.json`);
  return res.json();
}
