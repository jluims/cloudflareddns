import { Cloudflare } from "./cloudflare.js";
import { config } from "./config.js";
import { createServer } from "./server/server.js";

const cf = new Cloudflare(config.api_token);
const server = createServer(cf);

server
  .addListener("listening", () => {
    console.log(`Listening on port ${config.server.port}`);
  })
  .listen(config.server.port);
