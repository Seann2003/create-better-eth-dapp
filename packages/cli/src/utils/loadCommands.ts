import fs from 'fs';
import path from 'path';

export async function loadCommands(dir: string) {
  const files = fs.readdirSync(dir);
  const routes: Record<string, any> = {};

  for (const file of files) {
    if (file.endsWith('.ts')) {
      const module = await import(path.join(dir, file));
      routes[file.replace('.ts', '')] = module.default;
    }
  }

  return routes;
}
