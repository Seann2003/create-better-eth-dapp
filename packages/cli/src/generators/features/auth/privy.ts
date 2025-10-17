import path from 'path';
import { promisify } from 'util';
import { exec } from 'child_process';
import { renderTemplates } from '../../../utils/renderTemplates';

const run = promisify(exec);

export async function generatePrivy(projectName: string) {
  const frontendDir = path.resolve(process.cwd(), projectName, 'frontend');
  const targetDir = path.join(frontendDir, 'src/components/auth');
  const templateDir = path.resolve('templates/auth/privy');

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

  console.log('Installing Privy dependencies...');
  await run('bun add @privy-io/react-auth', { cwd: frontendDir });
}
