import { z } from 'zod';

export const UiSchema = z
  .enum(['shadcn'])
  .describe('UI framework')
  .default('shadcn');
