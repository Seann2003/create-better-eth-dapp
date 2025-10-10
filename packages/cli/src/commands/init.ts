import { z } from 'zod';
import { generateClient } from '../generators/features/client';
import { generateContract } from '../generators/features/contract';
import { generateAuth } from '../generators/features/auth';
import { generateIndexer } from '../generators/features/indexer';
import { generateBunfig } from '../generators/features/config';

export const schema = z.object({
  projectName: z.string().describe('Name of the project').default('.'),
  auth: z.enum(['privy', 'thirdweb']).describe('Auth provider').optional(),
  client: z.enum(['viem', 'wagmi']).describe('Client library').optional(),
  contract: z
    .enum(['ethers', 'foundry', 'hardhat'])
    .describe('Contract framework')
    .optional(),
  indexer: z.enum(['subgraph']).describe('Indexer').optional(),
});

export async function run(input: z.infer<typeof schema>) {
  const { projectName, auth, client, contract, indexer } = input;

  console.log(`\n Scaffolding ${projectName}...\n`);

  if (client) await generateClient(projectName, client);
  if (contract) await generateContract(projectName, contract);
  if (auth) await generateAuth(projectName, auth);
  if (indexer) await generateIndexer(projectName, indexer);
  // Bunfig for centralized node_modules
  generateBunfig(projectName);

  console.log('\nProject setup complete!\n');
}
