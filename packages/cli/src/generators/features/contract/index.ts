import { generateEthers } from './ethers';
import { generateFoundry } from './foundry';
import { generateHardhat } from './hardhat';

export async function generateContract(
  projectPath: string,
  contract: 'ethers' | 'foundry' | 'hardhat'
) {
  switch (contract) {
    case 'ethers':
      return generateEthers(projectPath);
    case 'foundry':
      return generateFoundry(projectPath);
    case 'hardhat':
      return generateHardhat(projectPath);
    default:
      throw new Error(`Unknown contract framework: ${contract}`);
  }
}
