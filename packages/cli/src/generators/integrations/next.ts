// Next.js integration generator
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import path from "path";
import { renderTemplates } from "../../utils/renderTemplates";
import { integrateShadcn } from "./shadcn";

const run = promisify(exec);

export interface NextOptions {
  auth?: string;
  client?: string;
  ui?: string;
  css?: string;
  packageManager?: string;
}

export async function generateNext(
  projectName: string,
  options: NextOptions = {}
) {
  const { auth, client, ui, css, packageManager = 'bun' } = options;

  const targetDir = path.resolve(process.cwd(), projectName, "frontend");
  fs.mkdirSync(targetDir, { recursive: true });

  console.log("Generating Next.js app...");

  const templateDir = path.resolve("templates/frontend/next");

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName, auth, client, ui, css },
  });

  if (ui === "shadcn") await integrateShadcn(projectName);

  try {
    await run(`${packageManager} install`, { cwd: targetDir });
    console.log("Next.js setup complete");
  } catch (err: any) {
    console.warn("Failed to auto-install dependencies:", err.message);
  }
}
