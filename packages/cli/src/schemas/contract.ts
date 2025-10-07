import { z } from 'zod';

export const ContractSchema = z
  .enum(['ethers', 'foundry', 'hardhat'])
  .describe('The contract development framework to use');
