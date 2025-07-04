const fs = require('fs-extra');
const path = require('path');

async function copyABIs() {
  try {
    console.log('📋 Copying contract ABIs to frontend...');
    
    // Paths
    const contractsDir = path.join(__dirname, '..');
    const outDir = path.join(contractsDir, 'out');
    const frontendAbiDir = path.join(__dirname, '..', '..', '..', 'apps', 'web', 'lib', 'abi');
    
    // Ensure frontend ABI directory exists
    await fs.ensureDir(frontendAbiDir);
    
    // Copy DeStock ABI
    const destockAbiPath = path.join(outDir, 'DeStock.sol', 'DeStock.json');
    if (await fs.pathExists(destockAbiPath)) {
      const destockAbi = await fs.readJson(destockAbiPath);
      await fs.writeJson(
        path.join(frontendAbiDir, 'DeStock.json'),
        destockAbi.abi,
        { spaces: 2 }
      );
      console.log('✅ DeStock ABI copied');
      
      // Generate TypeScript ABI file
      const destockAbiTs = `export const DESTOCK_ABI = ${JSON.stringify(destockAbi.abi, null, 2)} as const;`;
      await fs.writeFile(path.join(frontendAbiDir, 'DeStock.ts'), destockAbiTs);
      console.log('✅ DeStock TypeScript ABI generated');
    } else {
      console.warn('⚠️  DeStock ABI not found');
    }
    
    // Copy DeStockToken ABI
    const dstkAbiPath = path.join(outDir, 'DeStockToken.sol', 'DeStockToken.json');
    if (await fs.pathExists(dstkAbiPath)) {
      const dstkAbi = await fs.readJson(dstkAbiPath);
      await fs.writeJson(
        path.join(frontendAbiDir, 'DeStockToken.json'),
        dstkAbi.abi,
        { spaces: 2 }
      );
      console.log('✅ DeStockToken ABI copied');
      
      // Generate TypeScript ABI file
      const dstkAbiTs = `export const DSTK_TOKEN_ABI = ${JSON.stringify(dstkAbi.abi, null, 2)} as const;`;
      await fs.writeFile(path.join(frontendAbiDir, 'DeStockToken.ts'), dstkAbiTs);
      console.log('✅ DeStockToken TypeScript ABI generated');
    } else {
      console.warn('⚠️  DeStockToken ABI not found');
    }
    
    // Update contracts.ts with new ABIs
    await updateContractsFile(frontendAbiDir);
    
    console.log('🎉 ABI copying completed!');
  } catch (error) {
    console.error('❌ Error copying ABIs:', error);
    process.exit(1);
  }
}

async function updateContractsFile(abiDir) {
  const contractsPath = path.join(abiDir, '..', 'contracts.ts');
  
  let contractsContent = `import { Address } from 'viem';

// Import ABIs
`;

  // Check if ABI files exist and add imports
  if (await fs.pathExists(path.join(abiDir, 'DeStock.ts'))) {
    contractsContent += `import { DESTOCK_ABI } from './abi/DeStock';\n`;
  } else {
    contractsContent += `export const DESTOCK_ABI = [] as const;\n`;
  }

  if (await fs.pathExists(path.join(abiDir, 'DeStockToken.ts'))) {
    contractsContent += `import { DSTK_TOKEN_ABI } from './abi/DeStockToken';\n`;
  } else {
    contractsContent += `export const DSTK_TOKEN_ABI = [] as const;\n`;
  }

  contractsContent += `
// Export ABIs
export { DESTOCK_ABI, DSTK_TOKEN_ABI };

// Contract addresses for different environments
export const CONTRACT_ADDRESSES = {
  localhost: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
  sepolia: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
  mainnet: {
    DESTOCK: '0x0000000000000000000000000000000000000000' as Address,
    DSTK_TOKEN: '0x0000000000000000000000000000000000000000' as Address,
  },
} as const;

export type SupportedChain = keyof typeof CONTRACT_ADDRESSES;

export function getContractAddress(
  contract: 'DESTOCK' | 'DSTK_TOKEN',
  chainId: number
): Address {
  const chainName = getChainName(chainId);
  return CONTRACT_ADDRESSES[chainName][contract];
}

export function getChainName(chainId: number): SupportedChain {
  switch (chainId) {
    case 1:
      return 'mainnet';
    case 11155111:
      return 'sepolia';
    case 31337:
      return 'localhost';
    default:
      return 'localhost';
  }
}

// Contract constants
export const REGISTRATION_FEE = BigInt('100000000000000000000'); // 100 DSTK
export const DSTK_DECIMALS = 18;
`;

  await fs.writeFile(contractsPath, contractsContent);
  console.log('✅ contracts.ts updated');
}

// Check if running directly
if (require.main === module) {
  copyABIs();
}

module.exports = { copyABIs };
