import { cp, copyFile, mkdir, readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const source = dirname(require.resolve("pdfjs-dist/package.json"));
const { version } = JSON.parse(await readFile(join(source, "package.json"), "utf8"));
if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error("Unexpected PDF reader version");
const destination = join(process.cwd(), "public", "pdfjs", version);
await mkdir(destination, { recursive: true });
await copyFile(join(source, "build", "pdf.worker.min.mjs"), join(destination, "pdf.worker.min.mjs"));
await copyFile(join(source, "LICENSE"), join(destination, "LICENSE"));
for (const directory of ["standard_fonts", "wasm"]) {
  await cp(join(source, directory), join(destination, directory), { recursive: true });
}
console.log(`Prepared PDF reader ${version}`);
