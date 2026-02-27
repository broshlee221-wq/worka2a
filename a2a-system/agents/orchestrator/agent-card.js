export const orchestratorCard = {
  name: "OrchestratorAgent",
  description: "Master agent that routes tasks to specialized agents",
  url: "http://localhost:3000",
  version: "1.0.0",
  capabilities: { streaming: false },
  skills: [
    { id: "route", name: "Route Task", description: "Automatically route any task to the right agent" }
  ]
};
