import fs from "fs";
import { ConfigSchema } from "./schema/config-schema.js";

const configJson = JSON.parse(await fs.readFileSync("config.json", "utf-8"));

const config = ConfigSchema.parse(configJson);

export { config };
