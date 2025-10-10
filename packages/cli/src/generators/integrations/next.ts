// Next.js integration generator
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { renderTemplates } from '../../utils/renderTemplates';

const run = promisify(exec);

export async function generateNext(projectName: string, auth?: string) {
  const targetDir = path.resolve(process.cwd(), projectName, 'frontend/next');
  fs.mkdirSync(targetDir, { recursive: true });

  console.log('Generating Next.js app...');

  const templateDir = path.resolve('templates/frontend/next');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName, auth },
  });

  console.log('Installing dependencies...');
  await run('bun add next react react-dom typescript', { cwd: targetDir });

  console.log('Next.js frontend generated successfully.');
}
