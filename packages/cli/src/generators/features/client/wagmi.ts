// Wagmi feature generator
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs";
import { renderTemplates } from "../../../utils/renderTemplates";
import { installPackages, PackageManager } from "../../../utils/packageManager";

const run = promisify(exec);

export async function generateWagmi(projectName: string, packageManager: PackageManager) {
  const frontendDir = path.resolve(process.cwd(), projectName, "frontend");

  console.log(`Setting up Wagmi client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.resolve("templates/client/wagmi");
  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  await installPackages(['wagmi', 'viem', '@tanstack/react-query'], frontendDir, packageManager);

  console.log("Wagmi client setup complete!");
}
