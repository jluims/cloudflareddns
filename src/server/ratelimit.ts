import { config } from "../config.js";

const ipReqs: Record<string, number> = {};

function storeIpLimit(ip: string) {
  ipReqs[ip] = Date.now();
}

function isRatelimited(ip: string) {
  const time = ipReqs[ip];
  if (time === undefined) {
    return false;
  }
  
  return Date.now() - time < config.server.ratelimit;
}

export { storeIpLimit, isRatelimited };
