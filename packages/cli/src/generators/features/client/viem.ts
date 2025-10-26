// Viem feature generator
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { renderTemplates } from "../../../utils/renderTemplates";

const run = promisify(exec);

export async function generateViem(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, "frontend");

  console.log(`Setting up Viem client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.resolve("templates/client/viem");
  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  try {
    console.log("Installing viem...");
    await run("bun add viem", { cwd: frontendDir });
    console.log("Viem installed successfully.");
  } catch (e: any) {
    console.warn("Failed to install viem:", e.message);
    console.warn("You may need to manually run `bun add viem` later.");
  }
}
