import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { renderTemplates } from '../../../utils/renderTemplates';

const run = promisify(exec);

export async function generateHardhat(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName, 'contracts');

  console.log(`Setting up Hardhat in ${targetDir}`);
  fs.mkdirSync(targetDir, { recursive: true });

  try {
    console.log('Running Hardhat init ...');
    await run('npx hardhat --ts --force', { cwd: targetDir });
    console.log('Hardhat project initialized successfully.');
  } catch (err: any) {
    console.warn('Hardhat init failed, falling back to template:', err.message);

    const templateDir = path.resolve('templates/contract/hardhat');
    await renderTemplates({
      from: templateDir,
      to: targetDir,
      context: { projectName },
    });

    try {
      console.log('Installing dependencies...');
      await run('npm install', { cwd: targetDir });
      console.log('Dependencies installed successfully.');
    } catch (e: any) {
      console.warn('Failed to install dependencies:', e.message);
      console.warn('You may need to manually run `npm install` later.');
    }
  }
}
