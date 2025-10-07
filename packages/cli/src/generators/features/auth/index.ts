import { generatePrivy } from './privy';
import { generateThirdWeb } from './thirdweb';

export async function generateAuth(
  projectPath: string,
  auth: 'privy' | 'thirdweb'
) {
  switch (auth) {
    case 'privy':
      return generatePrivy(projectPath);
    case 'thirdweb':
      return generateThirdWeb(projectPath);
    default:
      throw new Error(`Unknown authenticator: ${auth}`);
  }
}
