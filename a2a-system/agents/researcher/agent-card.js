export const researcherCard = {
  name: "ResearcherAgent",
  description: "Answers questions and summarizes topics using LLaMA 3",
  url: "http://localhost:3002",
  version: "1.0.0",
  capabilities: { streaming: false },
  skills: [
    { id: "research", name: "Research Topic", description: "Research any topic" },
    { id: "summarize", name: "Summarize", description: "Summarize text or topics" }
  ]
};
