import { generateViem } from './viem';
import { generateWagmi } from './wagmi';

export async function generateClient(
  projectPath: string,
  client: 'viem' | 'wagmi'
) {
  switch (client) {
    case 'viem':
      return generateViem(projectPath);
    case 'wagmi':
      return generateWagmi(projectPath);
    default:
      throw new Error(`Unknown frontend client: ${client}`);
  }
}
