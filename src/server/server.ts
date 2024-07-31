import http from "http";
import { Cloudflare } from "../cloudflare.js";
import { config } from "../config.js";
import { verifyAuth } from "./auth.js";
import { isRatelimited, storeIpLimit } from "./ratelimit.js";

function createServer(cf: Cloudflare) {
  return http.createServer(async (req, res) => {
    try {
      if (isRatelimited(req.socket.remoteAddress!)) {
        res.statusCode = 429;
        res.write("Too Many Requests");
        res.end();
        return;
      }

      storeIpLimit(req.socket.remoteAddress!);

      if (!req.url) return res.end();

      const [url, paramsStr] = req.url.split("?");
      const params = new URLSearchParams(paramsStr);

      if (!verifyAuth(req)) {
        res.statusCode = 403;
        res.write("Access Denied");
        res.end();
        return;
      }

      if (url !== "/ddns") {
        res.statusCode = 404;
        res.write("Not Found");
        res.end();
        return;
      }

      const ip = params.get("ip");

      if (!ip) {
        res.statusCode = 400;
        res.write("Missing `ip` param");
        res.end();
        return;
      }

      for (const { id, name } of config.records) {
        try {
          await cf.updateRecord(config.zone_id, id, name, ip);
          console.log(`Updated ${name} to ${ip}`);
        } catch (err) {
          const errorString = err instanceof Error ? err.message : String(err);
          console.log(`Failed to update ${name} to ${ip}: ${errorString}`);
        }
      }

      res.write("OK");
    } catch (err) {
      const errorString = err instanceof Error ? err.message : String(err);
      console.log("Server error:", errorString);
      res.write("Server error. Check logs for more details.");
    }

    res.end();
  });
}

export { createServer };
