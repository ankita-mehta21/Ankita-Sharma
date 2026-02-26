import { rmSync } from "node:fs";

for (const folder of ["../site-build", "../build", "../dist"]) {
  try {
    rmSync(new URL(folder, import.meta.url), { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors and let Vite report build-time issues.
  }
}
