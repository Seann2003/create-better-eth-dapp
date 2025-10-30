import { z } from 'zod';
import { generateClient } from '../generators/features/client';
import { generateContract } from '../generators/features/contract';
import { generateAuth } from '../generators/features/auth';
import { generateBunfig } from '../generators/features/config';
import { generateNext } from '../generators/integrations/next';
import {
  AuthSchema,
  ClientSchema,
  ContractSchema,
  FrontendSchema,
  PackageManagerSchema,
  ProjectNameSchema,
  UiSchema,
} from '../types';

export const schema = z.object({
  projectName: ProjectNameSchema,
  auth: AuthSchema,
  client: ClientSchema,
  contract: ContractSchema,
  frontend: FrontendSchema,
  ui: UiSchema,
  packageManager: PackageManagerSchema,
});

export async function run(input: z.infer<typeof schema>) {
  const { projectName, auth, client, contract, frontend, ui, packageManager } =
    input;

  console.log(`\n Scaffolding ${projectName}...\n`);

  // Bunfig for centralized node_modules (only for bun)
  if (packageManager === 'bun') {
    generateBunfig(projectName);
  }

  if (client) await generateClient(projectName, client, packageManager);
  if (contract) await generateContract(projectName, contract, packageManager);
  if (auth) await generateAuth(projectName, auth, packageManager);
  if (frontend)
    await generateNext(projectName, { auth, client, ui, packageManager });

  console.log('\nProject setup complete!\n');
}
