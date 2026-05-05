import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { cwd, exit } from "node:process";
import { join } from "node:path";
import { zip } from "zip-a-folder";
import { existsSync } from "node:fs";

const workingDirectory = cwd();

const XSSPath = join(workingDirectory, "src", "xss.js");
if (!existsSync(XSSPath)) {
  console.error("`src/xss.js` is not present. Please create this file and re-run the command.");
  exit(1);
}

const distPath = join(workingDirectory, "dist");
if (!existsSync(distPath)) await mkdir(distPath);

const tmpPath = join(workingDirectory, "tmp");
await cp(join(workingDirectory, "src", "project"), tmpPath, {
  recursive: true
});

const costumePath = join(workingDirectory, "tmp", "ec95257cb4aef952ab9135e1a8fe51e9.svg");
const costume = await readFile(costumePath, "utf-8");

const XSS = await readFile(XSSPath, "utf-8");

await writeFile(costumePath, costume.replace("<code>", XSS));

await zip(tmpPath, join(distPath, "project.sb3"));
