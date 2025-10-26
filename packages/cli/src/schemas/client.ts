import { z } from 'zod';

export const ClientSchema = z
  .enum(['viem', 'wagmi', 'ethers'])
  .describe('Client library for interacting with Ethereum');
