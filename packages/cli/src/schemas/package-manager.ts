import { z } from 'zod';

export const PackageManagerSchema = z
  .enum(['bun', 'pnpm', 'npm', 'npx'])
  .describe('Package manager to use')
  .default('bun');
