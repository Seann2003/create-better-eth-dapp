import { generateViem } from './viem';
import { generateWagmi } from './wagmi';
import { generateEthers } from './ethers';

export async function generateClient(
  projectName: string,
  client: 'viem' | 'wagmi' | 'ethers'
) {
  switch (client) {
    case 'viem':
      return generateViem(projectName);
    case 'wagmi':
      return generateWagmi(projectName);
    case 'ethers':
      return generateEthers(projectName);
    default:
      throw new Error(`Unknown frontend client: ${client}`);
  }
}
