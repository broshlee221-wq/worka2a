export const fileAgentCard = {
  name: "FileAgent",
  description: "Reads and analyzes local files using DeepSeek Coder 6.7B",
  url: "http://localhost:3003",
  version: "1.0.0",
  capabilities: { streaming: false },
  skills: [
    { id: "read_file", name: "Read File", description: "Read and analyze a local file" }
  ]
};
