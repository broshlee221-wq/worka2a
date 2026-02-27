// // server.js
// import { Server } from "@modelcontextprotocol/sdk/server/index.js";
// import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
// import {
//   ListToolsRequestSchema,
//   CallToolRequestSchema
// } from "@modelcontextprotocol/sdk/types.js";
// import fs from "fs/promises";

// const server = new Server(
//   { name: "local-mcp", version: "1.0.0" },
//   { capabilities: { tools: {} } }
// );

// server.setRequestHandler(ListToolsRequestSchema, async () => ({
//   tools: [
//     {
//       name: "read_file",
//       description: "Read a local file",
//       inputSchema: {
//         type: "object",
//         properties: {
//           path: { type: "string" }
//         },
//         required: ["path"]
//       }
//     }
//   ]
// }));

// server.setRequestHandler(CallToolRequestSchema, async (req) => {
//   if (req.params.name === "read_file") {
//     const content = await fs.readFile(req.params.arguments.path, "utf8");
//     return {
//       content: [{ type: "text", text: content }]
//     };
//   }
// });

// await server.connect(new StdioServerTransport());
