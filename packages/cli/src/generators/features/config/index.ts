import fs from 'fs';
import path from 'path';

export async function generateBunfig(projectName: string) {
  const projectPath = path.join(process.cwd(), projectName);
  const filePath = path.join(projectPath, 'bunfig.toml');

  // ensure the directory exists
  fs.mkdirSync(projectPath, { recursive: true });

  if (!fs.existsSync(filePath)) {
    const content = `
name = "${projectName}"
version = "0.1.0"

[workspace]
members = [
  "contracts",
  "frontend",
  "indexer"
]
`;
    fs.writeFileSync(filePath, content.trimStart(), 'utf8');
    console.log('🪶 Created bunfig.toml workspace');
  }
}
