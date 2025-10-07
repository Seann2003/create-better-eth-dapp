// Scaffold new project command
import { z } from 'zod';
import {
  AuthSchema,
  ClientSchema,
  ContractSchema,
  IndexerSchema,
} from '../types';
import { generateClient } from '../generators/features/client';
import { generateContract } from '../generators/features/contract';
import { generateAuth } from '../generators/features/auth';
import { generateIndexer } from '../generators/features/indexer';
import { makeCommand } from '../utils/makeCommand';

const inputSchema = z.object({
  projectName: z.string().default('.'),
  auth: AuthSchema.optional(),
  client: ClientSchema.optional(),
  contract: ContractSchema.optional(),
  indexer: IndexerSchema.optional(),
});

export default makeCommand(inputSchema, async ({ input }) => {
  const { projectName, auth, client, contract, indexer } = input;
  console.log(`Scaffolding ${projectName}...`);

  if (client) await generateClient(projectName, client);
  if (contract) await generateContract(projectName, contract);
  if (auth) await generateAuth(projectName, auth);
  if (indexer) await generateIndexer(projectName, indexer);
});
