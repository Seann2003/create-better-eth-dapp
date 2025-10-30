// Foundry feature generator
import path from 'path';
import fs from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';
import { renderTemplates } from '../../../utils/renderTemplates';
import { CONTRACT_TEMPLATES } from '../../../utils/paths';

const run = promisify(exec);

export async function generateFoundry(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName, 'contracts');

  console.log(`Setting up Foundry in ${targetDir}`);

  fs.mkdirSync(targetDir, { recursive: true });

  try {
    // Run forge init if available
    console.log('Running forge init ...');
    await run('forge init .', { cwd: targetDir });
    console.log('Foundry project initialized successfully.');
  } catch (err: any) {
    // Fallback to template if no forge installed
    console.warn('forge init failed, falling back to template:', err.message);
    const templateDir = path.join(CONTRACT_TEMPLATES, 'foundry');
    await renderTemplates({
      from: templateDir,
      to: targetDir,
      context: { projectName },
    });

    // Attempt to install forge-std manually
    try {
      console.log('Installing forge-std...');
      await run('forge install foundry-rs/forge-std --no-commit', {
        cwd: targetDir,
      });
      console.log('forge-std installed successfully.');
    } catch (e: any) {
      console.warn('Failed to install forge-std:', e.message);
      console.warn(
        'You may need to manually run `forge install foundry-rs/forge-std` later.'
      );
    }
  }
}
