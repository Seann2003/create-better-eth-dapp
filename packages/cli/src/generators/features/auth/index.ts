import path from 'path';
import { generatePrivy } from './privy';
import { generateThirdweb } from './thirdweb';

export async function generateAuth(
  projectPath: string,
  auth: 'privy' | 'thirdweb'
) {
  switch (auth) {
    case 'privy':
      return generatePrivy(projectPath);
    case 'thirdweb':
      return generateThirdweb(projectPath);
    default:
      throw new Error(`Unknown authenticator: ${auth}`);
  }
}
