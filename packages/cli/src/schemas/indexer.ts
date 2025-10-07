import { z } from 'zod';

export const IndexerSchema = z
  .enum(['subgraph'])
  .describe('The indexer for Ethereum');
