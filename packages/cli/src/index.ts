import { Command } from 'commander';
import { z } from 'zod';
import { loadCommands } from './utils/loadCommands';

const program = new Command();

program
  .name('better-eth-dapp')
  .description('Create better Ethereum dapps')
  .version('0.1.0');

async function main() {
  const commands = await loadCommands(import.meta.dirname + '/commands');

  for (const [name, { schema, run }] of commands) {
    const cmd = program.command(name);

    // Parse description from Zod schema
    const shape = schema._def.shape();
    const keys = Object.keys(shape);

    let projectArgAdded = false;

    for (const key of keys) {
      const def = shape[key];
      const desc = def.description || key;
      const type = def._def.typeName;

      // if it's projectName, treat as argument
      if (key === 'projectName') {
        cmd.argument(`<${key}>`, desc);
        projectArgAdded = true;
      } else {
        cmd.option(`--${key} <${key}>`, desc);
      }
    }

    cmd.action(async (...args) => {
      const options = args.at(-1);
      const input = {
        ...options,
        ...(projectArgAdded ? { projectName: args[0] } : {}),
      };
      const parsed = schema.parse(input);
      await run(parsed);
    });
  }

  program.parse();
}

main().catch((e) => {
  console.error('CLI error:', e);
  process.exit(1);
});
