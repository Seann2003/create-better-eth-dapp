import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { renderTemplates } from '../../../utils/renderTemplates';

const run = promisify(exec);

export async function generatePrivy(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');
  const targetDir = path.join(frontendDir, 'src/components/auth');
  const templateDir = path.resolve('templates/auth/privy');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });

  console.log('Installing Privy dependencies...');
  await run('bun add @privy-io/react-auth', { cwd: frontendDir });
}
