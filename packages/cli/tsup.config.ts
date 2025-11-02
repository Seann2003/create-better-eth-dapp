import { defineConfig } from 'tsup';
import fs from 'fs-extra';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/commands/init.ts',
    'bin/create-better-eth-dapp.ts',
  ],
  format: ['esm'],
  target: 'node18',
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'dist',
  async onSuccess() {
    // Copy templates after build
    await fs.copy('templates', 'dist/templates');
  },
  banner: {
    js: '#!/usr/bin/env node',
  },
});
