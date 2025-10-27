import { exec } from 'child_process';
import { promisify } from 'util';

const run = promisify(exec);

export type PackageManager = 'bun' | 'pnpm' | 'npm' | 'npx';

export interface PackageManagerCommands {
  install: string;
  add: string;
  addDev: string;
  run: string;
}

export const packageManagerCommands: Record<PackageManager, PackageManagerCommands> = {
  bun: {
    install: 'bun install',
    add: 'bun add',
    addDev: 'bun add -d',
    run: 'bun run',
  },
  pnpm: {
    install: 'pnpm install',
    add: 'pnpm add',
    addDev: 'pnpm add -D',
    run: 'pnpm run',
  },
  npm: {
    install: 'npm install',
    add: 'npm install',
    addDev: 'npm install -D',
    run: 'npm run',
  },
  npx: {
    install: 'npx npm install',
    add: 'npx npm install',
    addDev: 'npx npm install -D',
    run: 'npx npm run',
  },
};

export async function installPackages(
  packages: string[],
  cwd: string,
  packageManager: PackageManager,
  isDev = false
): Promise<void> {
  const commands = packageManagerCommands[packageManager];
  const command = isDev ? commands.addDev : commands.add;
  const packageList = packages.join(' ');
  
  try {
    console.log(`Installing ${packages.join(', ')} using ${packageManager}...`);
    await run(`${command} ${packageList}`, { cwd });
    console.log(`Dependencies installed successfully using ${packageManager}.`);
  } catch (e: any) {
    console.warn(`Failed to install dependencies using ${packageManager}:`, e.message);
    console.warn(`You may need to manually run \`${command} ${packageList}\` later.`);
  }
}

export async function installDependencies(
  cwd: string,
  packageManager: PackageManager
): Promise<void> {
  const commands = packageManagerCommands[packageManager];
  
  try {
    console.log(`Installing dependencies using ${packageManager}...`);
    await run(commands.install, { cwd });
    console.log(`Dependencies installed successfully using ${packageManager}.`);
  } catch (e: any) {
    console.warn(`Failed to install dependencies using ${packageManager}:`, e.message);
    console.warn(`You may need to manually run \`${commands.install}\` later.`);
  }
}

export function getPackageManagerName(packageManager: PackageManager): string {
  switch (packageManager) {
    case 'bun':
      return 'Bun';
    case 'pnpm':
      return 'pnpm';
    case 'npm':
      return 'npm';
    case 'npx':
      return 'npx';
    default:
      return 'Unknown';
  }
}

