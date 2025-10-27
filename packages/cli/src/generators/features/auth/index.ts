import { generatePrivy } from './privy';
import { generateThirdweb } from './thirdweb';
import { PackageManager } from '../../utils/packageManager';

export async function generateAuth(projectName: string, auth: string, packageManager: PackageManager) {
  switch (auth) {
    case 'privy':
      await generatePrivy(projectName, packageManager);
      break;
    case 'thirdweb':
      await generateThirdweb(projectName, packageManager);
      break;
    default:
      throw new Error(`Unknown auth provider: ${auth}`);
  }
}
