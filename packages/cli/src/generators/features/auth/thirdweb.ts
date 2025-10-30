import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { renderTemplates } from '../../../utils/renderTemplates';
import { installPackages, PackageManager } from '../../../utils/packageManager';
import { AUTH_TEMPLATES } from '../../../utils/paths';

export async function generateThirdweb(
  projectName: string,
  packageManager: PackageManager
) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');
  const targetDir = path.join(frontendDir, 'src/components/auth');
  const templateDir = path.join(AUTH_TEMPLATES, 'thirdweb');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });

  await installPackages(
    ['@thirdweb-dev/react', 'ethers'],
    frontendDir,
    packageManager
  );
}
