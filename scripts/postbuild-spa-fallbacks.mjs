import { copyFileSync, existsSync } from "node:fs";

const distIndex = new URL("../dist/index.html", import.meta.url);
const dist404 = new URL("../dist/404.html", import.meta.url);

if (!existsSync(distIndex)) {
  throw new Error("dist/index.html was not generated. Run the Vite build before creating SPA fallback files.");
}

copyFileSync(distIndex, dist404);
