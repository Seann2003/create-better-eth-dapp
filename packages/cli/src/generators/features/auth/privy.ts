import path from 'path';
import { renderTemplates } from '../../../utils/renderTemplates';

export async function generatePrivy(projectName: string) {
  const templateDir = path.resolve('templates/auth/privy');
  const targetDir = path.resolve(
    process.cwd(),
    projectName,
    'src/components/auth'
  );

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });
}
