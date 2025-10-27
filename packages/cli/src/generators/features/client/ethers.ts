// Ethers feature generator
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { renderTemplates } from '../../../utils/renderTemplates';
import { installPackages, PackageManager } from '../../../utils/packageManager';

const run = promisify(exec);

export async function generateEthers(projectName: string, packageManager: PackageManager) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');

  console.log(`Setting up Ethers client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.resolve('templates/client/ethers');
  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  await installPackages(['ethers'], frontendDir, packageManager);

  console.log('Ethers client setup complete!');
}
