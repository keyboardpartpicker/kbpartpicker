// src/shared/save.js
import { writeFileSync, mkdirSync } from "fs";

export function saveJson(path, data) {
  const dir = path.split("/").slice(0, -1).join("/");
  if (dir) mkdirSync(dir, { recursive: true });
  writeFileSync(path, JSON.stringify(data, null, 2), "utf8");
}
