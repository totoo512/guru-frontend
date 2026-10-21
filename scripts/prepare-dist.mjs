import { access, cp, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const standalone = path.join(root, ".next/standalone");
const output = path.join(root, "dist");

await access(path.join(standalone, "server.js"));
// Recreate the generated release directory so deleted assets cannot survive a rebuild.
await rm(output, { recursive: true, force: true });
await cp(standalone, output, { recursive: true, verbatimSymlinks: true });
// Next.js does not include these assets in standalone output by default.
for (const relative of ["public", ".next/static"]) {
  const destination = path.join(output, relative);
  await rm(destination, { recursive: true, force: true });
  await cp(path.join(root, relative), destination, { recursive: true, verbatimSymlinks: true });
}
console.log("完整服务器运行目录：dist/（含 server.js、必要依赖和静态资源）");
console.log("流水线直接收集 dist/ 全部内容，包括隐藏的 .next/ 目录，无需再次 npm install。");
console.log("在 dist/ 中启动：HOSTNAME=127.0.0.1 PORT=3000 NODE_ENV=production node server.js");
