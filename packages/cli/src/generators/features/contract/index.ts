import { generateFoundry } from "./foundry";
import { generateHardhat } from "./hardhat";
import { PackageManager } from "../../../utils/packageManager";

export async function generateContract(
  projectPath: string,
  contract: "foundry" | "hardhat",
  packageManager: PackageManager
) {
  switch (contract) {
    case "foundry":
      return generateFoundry(projectPath);
    case "hardhat":
      return generateHardhat(projectPath, packageManager);
    default:
      throw new Error(`Unknown contract framework: ${contract}`);
  }
}
