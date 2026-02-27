// cli.js  (run: node cli.js)
import readline from "readline";
import { callAgent } from "./shared/a2a.js";

const ORCHESTRATOR = "http://localhost:3000";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function loop() {
  rl.question("You: ", async (q) => {
    try {
      const answer = await callAgent(ORCHESTRATOR, q);
      console.log(`\nAgent: ${answer}\n`);
    } catch (err) {
      console.error("Error:", err.message);
    }
    loop();
  });
}

console.log("A2A System ready. Ask anything!\n");
loop();
