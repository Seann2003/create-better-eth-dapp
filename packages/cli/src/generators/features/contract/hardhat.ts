import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { renderTemplates } from '../../../utils/renderTemplates';
import {
  installDependencies,
  PackageManager,
} from '../../../utils/packageManager';
import { CONTRACT_TEMPLATES } from '../../../utils/paths';

const run = promisify(exec);

export async function generateHardhat(
  projectName: string,
  packageManager: PackageManager
) {
  const targetDir = path.resolve(process.cwd(), projectName, 'contracts');

  console.log(`Setting up Hardhat in ${targetDir}`);
  fs.mkdirSync(targetDir, { recursive: true });

  const templateDir = path.join(CONTRACT_TEMPLATES, 'hardhat');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });

  await installDependencies(targetDir, packageManager);
}
