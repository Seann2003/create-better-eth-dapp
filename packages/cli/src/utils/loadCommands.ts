import fs from 'fs/promises';
import path from 'path';

export async function loadCommands(dir: string) {
  const files = await fs.readdir(dir);
  const commands = new Map<string, any>();

  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

    const name = path.basename(file, path.extname(file));
    const module = await import(path.resolve(dir, file));

    if (!module.schema || !module.run) {
      console.warn(`⚠️ Skipping ${file}: missing schema or run()`);
      continue;
    }

    commands.set(name, module);
  }

  return commands;
}
