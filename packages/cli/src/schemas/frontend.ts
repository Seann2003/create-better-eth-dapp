import { z } from 'zod';

export const FrontendSchema = z
  .enum(['next'])
  .describe('Frontend framework')
  .default('next');
