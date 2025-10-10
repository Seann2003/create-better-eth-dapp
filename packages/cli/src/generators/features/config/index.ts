import fs from 'fs';
import path from 'path';

export async function generateBunfig(projectName: string) {
  const filePath = path.join(process.cwd(), projectName, 'bunfig.toml');

  // only write if it doesn't exist
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
