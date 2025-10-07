import { z } from 'zod';

export const ClientSchema = z
  .enum(['viem', 'wagmi'])
  .describe('Client library for interacting with Ethereum');
