import http from "http";
import { config } from "../config.js";

function verifyAuth(req: http.IncomingMessage) {
  try {
    const auth = req.headers.authorization?.split("Basic ")?.[1];
    if (!auth) {
      return false;
    }

    const [reqUsername, reqPassword] = Buffer.from(auth, "base64")
      .toString("utf-8")
      .split(":");

    const userMatches = reqUsername === config.server.username;
    const passMatches = reqPassword === config.server.password;

    return userMatches && passMatches;
  } catch (err) {
    return false;
  }
}

export { verifyAuth };
