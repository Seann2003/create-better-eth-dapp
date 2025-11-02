#!/usr/bin/env bun
import { Command } from 'commander';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Auto-resolve init command (works both in src/ and dist/)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
let initPath = path.resolve(__dirname, '../commands/init.js');

// Fallback to src/ in dev
if (!fs.existsSync(initPath)) {
  initPath = path.resolve(__dirname, '../src/commands/init.ts');
}

const { run: init } = await import(initPath);

const program = new Command();

program
  .name('create-better-eth-dapp')
  .description('Scaffold a modular, extensible Web3 project')
  .version('0.1.0');

program
  .command('init [projectName]')
  .description('Initialize a new Web3 project')
  .option(
    '--auth <auth>',
    'Authentication provider (privy | thirdweb)',
    'privy'
  )
  .option('--client <client>', 'Client library (viem | wagmi)', 'wagmi')
  .option('--frontend <frontend>', 'Frontend framework (next)', 'next')
  .option(
    '--contract <contract>',
    'Smart contract framework (foundry | hardhat)',
    'foundry'
  )
  .option('--ui <ui>', 'UI framework (shadcn)', 'shadcn')
  .option(
    '--package-manager <pkg>',
    'Package manager (bun | npm | pnpm | yarn)',
    'bun'
  )
  .action(async (projectName = '.', options) => {
    // Normalize names
    const input = {
      projectName,
      auth: options.auth,
      client: options.client,
      frontend: options.frontend,
      contract: options.contract,
      indexer: options.indexer,
      ui: options.ui,
      packageManager: options.packageManager,
    };

    console.log('⚙️  Running init with options:', input);
    await init(input);
  });

program.parse();
