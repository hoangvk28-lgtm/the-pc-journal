// Cloudflare Pages free plan caps a deployment at 20,000 files. Next's static export writes
// per-segment RSC prefetch payloads (__next.* files/dirs) for every page; this site disables
// prefetch everywhere, so drop them. Each page keeps its full <page>.txt payload, and a missing
// payload just makes Next fall back to a normal full-page load.
import { readdirSync, rmSync } from "node:fs";
import { join } from "node:path";

let removed = 0;
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.name.startsWith("__next.")) { rmSync(p, { recursive: true, force: true }); removed++; }
    else if (e.isDirectory()) walk(p);
  }
}
walk("out");
console.log(`prune-export: removed ${removed} segment prefetch entries`);
