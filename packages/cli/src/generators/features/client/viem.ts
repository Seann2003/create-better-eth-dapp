// Viem feature generator
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { renderTemplates } from '../../../utils/renderTemplates';
import { installPackages, PackageManager } from '../../../utils/packageManager';
import { CLIENT_TEMPLATES } from '../../../utils/paths';

const run = promisify(exec);

export async function generateViem(
  projectName: string,
  packageManager: PackageManager
) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');

  console.log(`Setting up Viem client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.join(CLIENT_TEMPLATES, 'viem');

  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  await installPackages(['viem'], frontendDir, packageManager);
}
