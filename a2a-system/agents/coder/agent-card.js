export const coderCard = {
  name: "CoderAgent",
  description: "Writes, debugs, and reviews code using DeepSeek Coder",
  url: "http://localhost:3001",
  version: "1.0.0",
  capabilities: { streaming: false },
  skills: [
    { id: "write_code", name: "Write Code", description: "Write code in any language" },
    { id: "debug_code", name: "Debug Code", description: "Find and fix bugs" },
    { id: "review_code", name: "Review Code", description: "Review and improve code" }
  ]
};
