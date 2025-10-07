import { generateSubgraph } from './subgraph';

export async function generateIndexer(
  projectPath: string,
  indexer: 'subgraph'
) {
  switch (indexer) {
    case 'subgraph':
      return generateSubgraph(projectPath);
    default:
      throw new Error(`Unknown blockchain indexer: ${indexer}`);
  }
}
