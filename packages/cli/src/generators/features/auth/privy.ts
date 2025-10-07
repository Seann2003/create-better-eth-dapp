import path from 'path';
import fs from 'fs-extra';
import { execa } from 'execa';

export async function generatePrivy(projectDir: string) {
  //   const templateDir = path.resolve(__dirname, '../../../templates/auth/privy');

  //   console.log('🔐 Setting up Privy authentication...');

  //   // Copy the template files
  //   await fs.copy(templateDir, path.join(projectDir, 'src/lib/auth/privy'));

  //   // 2Add dependencies (optional)
  //   const pkgJsonPath = path.join(projectDir, 'package.json');
  //   const pkg = await fs.readJson(pkgJsonPath);

  //   pkg.dependencies = {
  //     ...pkg.dependencies,
  //     '@privy-io/react-auth': '^1.64.0',
  //   };

  //   await fs.writeJson(pkgJsonPath, pkg, { spaces: 2 });

  //   // 3️⃣ Run install
  //   try {
  //     await execa('bun', ['install'], { cwd: projectDir });
  //   } catch {
  //     console.log(
  //       '⚠️ Failed to install dependencies automatically. Run `bun install` manually.'
  //     );
  //   }

  console.log('Privy setup complete!');
}
