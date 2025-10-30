import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { renderTemplates } from '../../../utils/renderTemplates';
import { installPackages, PackageManager } from '../../../utils/packageManager';
import { AUTH_TEMPLATES } from '../../../utils/paths';

const run = promisify(exec);

export async function generatePrivy(
  projectName: string,
  packageManager: PackageManager
) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');
  const targetDir = path.join(frontendDir, 'src/components/auth');
  const templateDir = path.join(AUTH_TEMPLATES, 'privy');

  const privyConfig = `\{\{
    appearance: {
      theme: "light",
      accentColor: "#3b82f6",
    },
    embeddedWallets: {
      ethereum: { createOnLogin: "users-without-wallets" },
      solana: { createOnLogin: "users-without-wallets" },
    },
  \}\}`;

  await renderTemplates({
    from: templateDir,
    to: targetDir,
    context: { projectName, privyConfig },
  });

  await installPackages(['@privy-io/react-auth'], frontendDir, packageManager);
}
