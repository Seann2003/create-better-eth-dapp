import { generateViem } from './viem';
import { generateWagmi } from './wagmi';
import { generateEthers } from './ethers';
import { PackageManager } from '../../../utils/packageManager';

export async function generateClient(
  projectName: string,
  client: 'viem' | 'wagmi' | 'ethers',
  packageManager: PackageManager
) {
  switch (client) {
    case 'viem':
      return generateViem(projectName, packageManager);
    case 'wagmi':
      return generateWagmi(projectName, packageManager);
    case 'ethers':
      return generateEthers(projectName, packageManager);
    default:
      throw new Error(`Unknown frontend client: ${client}`);
  }
}
