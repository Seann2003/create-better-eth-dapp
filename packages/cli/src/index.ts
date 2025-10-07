import { initTRPC } from '@trpc/server';
import { createCli } from 'trpc-cli';

// const t = initTRPC.create();

// const router = t.router({
//   init: t.procedure
//     .input(
//       z.tuple([
//         ProjectNameSchema.optional().default("."),
//         z.object({
//           auth: AuthSchema.optional(),
//           client: ClientSchema.optional(),
//           contract: ContractSchema.optional(),
//           indexer: IndexerSchema.optional(),
//         }),
//       ])
//     )
//     .query(async ({ input }) => {
//       const [projectName, options] = input;
//       const combinedInput = {
//         projectName,
//         ...options,
//       };
//       console.log("Initializing project with options:", combinedInput);
//     }),
// });

// createCli({ router }).run();

import { loadCommands } from './utils/loadCommands';

const t = initTRPC.create();

async function main() {
  const rawCommands = await loadCommands(import.meta.dirname + '/commands');

  const commandEntries = Object.entries(rawCommands).map(([name, cmd]) => {
    return [name, t.procedure.input(cmd.input).query(cmd.resolve)];
  });

  const router = t.router(Object.fromEntries(commandEntries));

  createCli({ router }).run();
}

main();
