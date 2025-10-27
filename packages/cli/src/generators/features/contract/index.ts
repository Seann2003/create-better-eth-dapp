import { generateEthers } from './ethers';
import { generateFoundry } from './foundry';
import { generateHardhat } from './hardhat';
import { PackageManager } from '../../utils/packageManager';

export async function generateContract(
  projectPath: string,
  contract: 'ethers' | 'foundry' | 'hardhat',
  packageManager: PackageManager
) {
  switch (contract) {
    case 'ethers':
      return generateEthers(projectPath, packageManager);
    case 'foundry':
      return generateFoundry(projectPath);
    case 'hardhat':
      return generateHardhat(projectPath, packageManager);
    default:
      throw new Error(`Unknown contract framework: ${contract}`);
  }
}
