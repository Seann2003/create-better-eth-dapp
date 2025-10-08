import { generatePrivy } from './privy';
import { generateThirdweb } from './thirdweb';

export async function generateAuth(projectName: string, auth: string) {
  switch (auth) {
    case 'privy':
      await generatePrivy(projectName);
      break;
    case 'thirdweb':
      await generateThirdweb(projectName);
      break;
    default:
      throw new Error(`Unknown auth provider: ${auth}`);
  }
}
