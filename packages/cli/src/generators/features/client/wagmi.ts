// Wagmi feature generator
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { renderTemplates } from "../../../utils/renderTemplates";

const run = promisify(exec);

export async function generateWagmi(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, "frontend");

  console.log(`Setting up Wagmi client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.resolve("templates/client/wagmi");
  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  try {
    console.log("Installing wagmi dependencies...");
    await run("bun add wagmi viem @tanstack/react-query", { cwd: frontendDir });
    console.log("Wagmi dependencies installed successfully.");
  } catch (e: any) {
    console.warn("Failed to install wagmi dependencies:", e.message);
    console.warn(
      "You may need to manually run `bun add wagmi viem @tanstack/react-query` later."
    );
  }

  console.log("Wagmi client setup complete!");
}
