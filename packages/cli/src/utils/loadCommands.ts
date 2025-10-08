// src/utils/loadCommands.ts
import fs from 'fs/promises';
import path from 'path';

export async function loadCommands(commandsDir: string) {
  const files = await fs.readdir(commandsDir);
  const commands: Record<string, any> = {};

  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;
    const name = path.basename(file, path.extname(file));
    const modulePath = path.resolve(commandsDir, file);
    const mod = await import(modulePath);
    commands[name] = mod;
  }

  return commands;
}
