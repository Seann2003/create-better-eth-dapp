// src/index.ts
import { Command } from 'commander';
import { fileURLToPath } from 'url';
import path from 'path';
import { loadCommands } from './utils/loadCommands';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const program = new Command();

  program
    .name('better-eth-dapp')
    .description('Create better ETH dapps')
    .version('0.1.0');

  const commandsDir = path.join(__dirname, 'commands');
  const commands = await loadCommands(commandsDir);

  for (const [name, mod] of Object.entries(commands)) {
    const { schema, run } = mod;
    if (!schema || !run) {
      console.warn(`⚠️ Skipping ${name}.ts: missing schema or run()`);
      continue;
    }

    const cmd = new Command(name)
      .description(`Run the ${name} command`)
      .allowUnknownOption(false);

    // Add arguments and options from zod schema
    const shape =
      typeof schema._def?.shape === 'function'
        ? schema._def.shape()
        : schema._def?.shape || {};

    if ('projectName' in shape) {
      cmd.argument(
        '<projectName>',
        shape.projectName.description || 'Project name'
      );
    }

    for (const key of Object.keys(shape)) {
      if (key === 'projectName') continue;
      const desc = shape[key]?.description || key;
      cmd.option(`--${key} <${key}>`, desc);
    }

    cmd.action(async (projectNameArg: string, options: Record<string, any>) => {
      const input: Record<string, any> = { ...options };

      if (projectNameArg && 'projectName' in shape) {
        input.projectName = projectNameArg;
      }

      try {
        const parsed = await schema.parseAsync(input);
        await run(parsed);
      } catch (err: any) {
        console.error('❌ Error:', err.message);
      }
    });

    program.addCommand(cmd);
  }

  program.parse(process.argv);
}

main().catch((err) => {
  console.error('❌ CLI init failed:', err);
  process.exit(1);
});
