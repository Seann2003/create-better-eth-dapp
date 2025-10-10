import { z } from 'zod';
import { generateClient } from '../generators/features/client';
import { generateContract } from '../generators/features/contract';
import { generateAuth } from '../generators/features/auth';
import { generateIndexer } from '../generators/features/indexer';
import { generateBunfig } from '../generators/features/config';
import { generateNext } from '../generators/integrations/next';
import { integrateShadcn } from '../generators/integrations/shadcn';

export const schema = z.object({
  projectName: z.string().describe('Name of the project').default('.'),
  auth: z.enum(['privy', 'thirdweb']).describe('Auth provider').optional(),
  client: z.enum(['viem', 'wagmi']).describe('Client library').optional(),
  contract: z
    .enum(['ethers', 'foundry', 'hardhat'])
    .describe('Contract framework')
    .optional(),
  indexer: z.enum(['subgraph']).describe('Indexer').optional(),
  ui: z.enum(['shadcn']).describe('UI framework').optional(),
});

export async function run(input: z.infer<typeof schema>) {
  const { projectName, auth, client, contract, indexer, ui } = input;

  console.log(`\n Scaffolding ${projectName}...\n`);

  // Bunfig for centralized node_modules
  generateBunfig(projectName);

  if (client) await generateClient(projectName, client);
  if (contract) await generateContract(projectName, contract);
  if (auth) await generateAuth(projectName, auth);
  if (indexer) await generateIndexer(projectName, indexer);

  // Integrations
  generateNext(projectName, auth);
  if (ui) await integrateShadcn(projectName);

  console.log('\nProject setup complete!\n');
}
