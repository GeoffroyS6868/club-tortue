import * as fs from "fs";
import { ServerConfig } from "../types/config";

export function getServerConfig(): ServerConfig {
  try {
    const config = fs.readFileSync("./config.json", "utf-8");
    return JSON.parse(config) as ServerConfig;
  } catch (err) {
    console.error("config.json is malformed");
    return {
      tick: 128,
      ratio: 4,
      pixelPerTile: 16,
    };
  }
}
