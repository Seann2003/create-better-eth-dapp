// Shadcn/ui integration generator
import path from 'path';
import { renderTemplates } from '../../utils/renderTemplates';
import { UI_TEMPLATES } from '../../utils/paths';

export async function integrateShadcn(projectName: string) {
  const targetDir = path.resolve(process.cwd(), projectName, 'frontend');
  const templateDir = path.join(UI_TEMPLATES, 'shadcn');

  console.log('Adding ShadCN UI components...');

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName },
  });

  console.log('ShadCN integrated');
}
