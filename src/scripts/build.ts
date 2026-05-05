import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { cwd, exit } from "node:process";
import { join } from "node:path";
import { zip } from "zip-a-folder";
import { existsSync } from "node:fs";

const workingDirectory = cwd();

console.log("\x1b[0;2m┌\x1b[0m  scratch-xss builder");
console.log("\x1b[2m│\x1b[0m");

const XSSPath = join(workingDirectory, "src", "xss.js");
if (!existsSync(XSSPath)) {
  console.error("└\x1b[0m  \x1b[31m`src/xss.js` is not present. Please create this file and re-run the command.\x1b[0m");
  exit(1);
}

console.log("■  Setup");
const distPath = join(workingDirectory, "dist");
if (!existsSync(distPath)) {
  console.log("\x1b[2m│   Creating `dist`...");
  await mkdir(distPath);
}

const tmpPath = join(workingDirectory, "tmp");
if (existsSync(tmpPath)) {
  console.log("\x1b[2m│   Deleting `tmp`...");
  await rm(tmpPath, {
    recursive: true
  });
}
await cp(join(workingDirectory, "src", "project"), tmpPath, {
  recursive: true
});

console.log("\x1b[2m│\x1b[0m");
console.log("■  Injecting XSS...");

console.log(`\x1b[2m│   Reading costume file...\x1b[0m`);
const costumePath = join(workingDirectory, "tmp", "ec95257cb4aef952ab9135e1a8fe51e9.svg");
const costume = await readFile(costumePath, "utf-8");

console.log(`\x1b[2m│   Reading XSS file...\x1b[0m`);
const XSS = await readFile(XSSPath, "utf-8");
console.log(`\x1b[2m│    ${XSS.trim().replace("\n", "\n│    ")}\x1b[0m`);

console.log(`\x1b[2m│   Writing to costume file...\x1b[0m`);
await writeFile(costumePath, costume.replace("<code>", XSS));

console.log("\x1b[2m│\x1b[0m");

console.log("■  Compressing...");
await zip(tmpPath, join(distPath, "project.sb3"));

console.log("\x1b[2m│\x1b[0m");

console.log("■  Cleaning up...");
await rm(tmpPath, {
  recursive: true
});

console.log("\x1b[2m│\x1b[0m");
console.log(`\x1b[2m└\x1b[0m  Done!`);
