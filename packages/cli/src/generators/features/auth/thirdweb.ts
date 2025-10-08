import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';
import Handlebars from 'handlebars';

export async function generateThirdweb(projectDir: string) {
  console.log('Setting up Thirdweb authentication...');

  const templateDir = path.resolve(
    __dirname,
    '../../../templates/auth/thirdweb'
  );
  const destDir = path.join(projectDir, 'src/components/auth');

  await fs.ensureDir(destDir);

  const files = await fs.readdir(templateDir);

  for (const file of files) {
    if (file.endsWith('.hbs')) {
      const srcPath = path.join(templateDir, file);
      const destPath = path.join(destDir, file.replace(/\.hbs$/, ''));

      const template = await fs.readFile(srcPath, 'utf-8');
      const compiled = Handlebars.compile(template);
      const result = compiled({});

      await fs.writeFile(destPath, result, 'utf-8');
    }
  }

  // Update dependencies
  const pkgJsonPath = path.join(projectDir, 'package.json');
  const pkg = await fs.readJson(pkgJsonPath);

  pkg.dependencies = {
    ...pkg.dependencies,
    thirdweb: '^5.0.0',
  };

  await fs.writeJson(pkgJsonPath, pkg, { spaces: 2 });

  try {
    await execa('bun', ['install'], { cwd: projectDir });
  } catch {
    console.warn('bun install failed; please run it manually.');
  }

  console.log('Thirdweb setup complete!');
}
