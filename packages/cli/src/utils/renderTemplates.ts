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

        // Register helpers
        Handlebars.registerHelper('raw', function (options) {
          return options.fn();
        });

        Handlebars.registerHelper('eq', function (a, b) {
          return a === b;
        });

        Handlebars.registerHelper('and', function (a, b) {
          return a && b;
        });

        Handlebars.registerHelper('or', function (a, b) {
          return a || b;
        });

        const compiled = Handlebars.compile(template);

        const privyConfig = `{{
          appearance: {
            theme: "light",
            accentColor: "#3b82f6",
          },
          embeddedWallets: {
            ethereum: { createOnLogin: "users-without-wallets" },
            solana: { createOnLogin: "users-without-wallets" },
          },
      }}`;

        const output = compiled({ ...context, privyConfig });
        await fs.writeFile(destPath, output, 'utf8');
        console.log(`📝 Created ${path.relative(process.cwd(), destPath)}`);
      } else {
        await fs.copy(srcPath, destPath);
        console.log(`📄 Copied ${path.relative(process.cwd(), destPath)}`);
      }
    }
  }
}
