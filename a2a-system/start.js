// start.js
import { spawn } from "child_process";

const agents = [
  { name: "FileAgent",    script: "agents/file-agent/index.js" },
  { name: "CoderAgent",   script: "agents/coder/index.js" },
  { name: "Researcher",   script: "agents/researcher/index.js" },
  { name: "Orchestrator", script: "agents/orchestrator/index.js" }
];

for (const agent of agents) {
  const proc = spawn("node", [agent.script], { stdio: "inherit" });
  proc.on("error", (err) => console.error(`${agent.name} error:`, err));
}

console.log("🚀 All agents starting...");
