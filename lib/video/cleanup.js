import fs from "fs";
import path from "path";

export function cleanupOldRenders(hours = 24) {
  const base = path.join(process.cwd(), "public", "renders");
  if (!fs.existsSync(base)) return;

  const now = Date.now();

  for (const dir of fs.readdirSync(base)) {
    const full = path.join(base, dir);
    const stat = fs.statSync(full);

    if (now - stat.mtimeMs > hours * 3600000) {
      fs.rmSync(full, { recursive: true, force: true });
    }
  }
}
