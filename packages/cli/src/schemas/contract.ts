import { z } from 'zod';

export const ContractSchema = z
  .enum(['foundry', 'hardhat'])
  .describe('Contract framework')
  .default('foundry');
