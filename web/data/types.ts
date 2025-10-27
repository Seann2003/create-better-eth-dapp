export const AuthProviders = [
  {
    label: "Privy",
    value: "--auth privy",
    description: "Web3 authentication made simple",
    image: "/option/privy.png",
  },
  {
    label: "Thirdweb",
    value: "--auth thirdweb",
    description: "Complete web3 development platform",
    image: "/option/thirdweb.png",
  },
] as const;

export const ClientProviders = [
  {
    label: "Viem",
    value: "--client viem",
    description: "TypeScript interface for Ethereum",
    image: "/option/viem.png",
  },
  {
    label: "Wagmi",
    value: "--client wagmi",
    description: "React hooks for Ethereum",
    image: "/option/wagmi.png",
  },
  {
    label: "Ethers",
    value: "--client ethers",
    description: "Complete Ethereum library",
    image: "/option/ethers.png",
  },
] as const;

export const ContractFrameworks = [
  {
    label: "HardHat",
    value: "--contract hardhat",
    description: "Ethereum development environment",
    image: "/option/hardhat.png",
  },
  {
    label: "Foundry",
    value: "--contract foundry",
    description: "Fast, portable and modular toolkit",
    image: "/option/foundry.png",
  },
] as const;
