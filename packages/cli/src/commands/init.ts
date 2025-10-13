import { z } from 'zod';
import { generateClient } from '../generators/features/client';
import { generateContract } from '../generators/features/contract';
import { generateAuth } from '../generators/features/auth';
import { generateIndexer } from '../generators/features/indexer';
import { generateBunfig } from '../generators/features/config';
import { generateNext } from '../generators/integrations/next';

export const schema = z.object({
  projectName: z.string().describe('Name of the project').default('.'),
  auth: z
    .enum(['privy', 'thirdweb'])
    .describe('Auth provider')
    .default('privy'),
  client: z.enum(['viem', 'wagmi']).describe('Client library').default('wagmi'),
  contract: z
    .enum(['ethers', 'foundry', 'hardhat'])
    .describe('Contract framework')
    .default('foundry'),
  indexer: z
    .enum(['subgraph'])
    .describe('Indexer')
    .default('subgraph')
    .optional(),
  frontend: z.enum(['next']).describe('Frontend framework').default('next'),
  ui: z.enum(['shadcn']).describe('UI framework').default('shadcn'),
});

export async function run(input: z.infer<typeof schema>) {
  const { projectName, auth, client, contract, indexer, frontend, ui } = input;

  console.log(`\n Scaffolding ${projectName}...\n`);

  // Bunfig for centralized node_modules
  generateBunfig(projectName);

  if (client) await generateClient(projectName, client);
  if (contract) await generateContract(projectName, contract);
  if (auth) await generateAuth(projectName, auth);
  if (indexer) await generateIndexer(projectName, indexer);
  if (frontend) await generateNext(projectName, { auth, client, ui });

  console.log('\nProject setup complete!\n');
}
