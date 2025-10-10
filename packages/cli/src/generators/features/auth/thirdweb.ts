import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { renderTemplates } from '../../../utils/renderTemplates';

const run = promisify(exec);

export async function generateThirdweb(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');
  const targetDir = path.join(frontendDir, 'src/components/auth');
  const templateDir = path.resolve('templates/auth/thirdweb');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });

  console.log('Installing Thirdweb dependencies...');
  await run('bun add @thirdweb-dev/react ethers', { cwd: frontendDir });
}
