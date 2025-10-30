import { z } from 'zod';

export const AuthSchema = z
  .enum(['privy', 'thirdweb'])
  .describe('Auth provider')
  .default('privy');
