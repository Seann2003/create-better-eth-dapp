import fs from 'fs-extra';
import path from 'path';
import Handlebars from 'handlebars';

export async function renderTemplates({
  from,
  to,
  context = {},
}: {
  from: string;
  to: string;
  context?: Record<string, any>;
}) {
  const entries = await fs.readdir(from, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(from, entry.name);
    const destPath = path.join(to, entry.name.replace(/\.hbs$/, ''));

    if (entry.isDirectory()) {
      await renderTemplates({ from: srcPath, to: destPath, context });
    } else if (entry.isFile()) {
      await fs.ensureDir(path.dirname(destPath));

      if (entry.name.endsWith('.hbs')) {
        const template = await fs.readFile(srcPath, 'utf8');
        const compiled = Handlebars.compile(template);
        const output = compiled(context);
        await fs.writeFile(destPath, output, 'utf8');
        console.log(`📝 Created ${path.relative(process.cwd(), destPath)}`);
      } else {
        await fs.copy(srcPath, destPath);
        console.log(`📄 Copied ${path.relative(process.cwd(), destPath)}`);
      }
    }
  }
}
