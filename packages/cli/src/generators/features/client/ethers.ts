// Ethers feature generator
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import { renderTemplates } from '../../../utils/renderTemplates';

const run = promisify(exec);

export async function generateEthers(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');

  console.log(`Setting up Ethers client in ${frontendDir}`);
  fs.mkdirSync(frontendDir, { recursive: true });

  const templateDir = path.resolve('templates/client/ethers');
  await renderTemplates({
    from: templateDir,
    to: frontendDir,
    context: { projectName },
  });

  try {
    console.log('Installing ethers dependencies...');
    await run('bun add ethers', { cwd: frontendDir });
    console.log('Ethers dependencies installed successfully.');
  } catch (e: any) {
    console.warn('Failed to install ethers dependencies:', e.message);
    console.warn('You may need to manually run `bun add ethers` later.');
  }

  console.log('Ethers client setup complete!');
}
