import { z } from 'zod';

export const AuthSchema = z
  .enum(['privy', 'thirdweb'])
  .describe('The wallet authentication provider to use');
