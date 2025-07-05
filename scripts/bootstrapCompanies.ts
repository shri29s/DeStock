/**
 * Bootstrap Companies Script
 * 
 * This script registers all the companies from the tokens.json file
 * to the DeStock smart contract for trading.
 */

import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// Configuration
const RPC_URL = 'http://127.0.0.1:8545';
const CHAIN_ID = 31337;
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'; // Default Anvil account
const DESTOCK_CONTRACT_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const DSTK_TOKEN_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Import ABIs
const DeStockABIFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/ABI/DeStock.json'), 'utf8'));
const DeStockABI = DeStockABIFile.abi; // Extract the ABI array from the JSON structure
const DSTKABIFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/ABI/DeStockToken.json'), 'utf8'));
const DSTKABI = DSTKABIFile.abi; // Extract the ABI array from the JSON structure
const tokensData = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/constants/tokens.json'), 'utf8'));

interface TokenData {
  id: string;
  name: string;
  tokenName: string;
  symbol: string;
  theme: string;
  category: string;
  emoji: string;
  description: string;
  memeLevel: string;
  price: string;
  marketCap: string;
  logo: string;
}

// Helper function to parse market cap to wei equivalent
function parseMarketCapToWei(marketCap: string): bigint {
  const numStr = marketCap.replace(/[$,M]/g, '');
  const num = parseFloat(numStr);
  // Convert millions to a reasonable wei amount (1M = 1e15 wei for smaller values)
  return ethers.parseUnits((num * 1000).toString(), 15); // Much smaller scale
}

// Helper function to get initial liquidity (10% of market cap, minimum 10 DSTK)
function getInitialLiquidity(marketCap: string): bigint {
  const totalSupply = parseMarketCapToWei(marketCap);
  const calculatedLiquidity = totalSupply / 10n; // 10% for initial liquidity
  const minLiquidity = ethers.parseEther('10'); // Minimum 10 DSTK required by contract
  
  return calculatedLiquidity > minLiquidity ? calculatedLiquidity : minLiquidity;
}

async function main() {
  console.log('🚀 Starting company registration process...');

  // Setup provider and signer
  const provider = new ethers.JsonRpcProvider(RPC_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  
  // Get contract instances
  const deStockContract = new ethers.Contract(DESTOCK_CONTRACT_ADDRESS, DeStockABI, signer);
  const dstkContract = new ethers.Contract(DSTK_TOKEN_ADDRESS, DSTKABI, signer);

  // Flatten all companies from different categories
  const allCompanies: TokenData[] = [];
  for (const category in tokensData) {
    for (const companyKey in tokensData[category]) {
      allCompanies.push(tokensData[category][companyKey]);
    }
  }

  console.log(`📋 Found ${allCompanies.length} companies to register`);
  console.log(`🔗 Connected to DeStock contract at: ${DESTOCK_CONTRACT_ADDRESS}`);
  console.log(`💰 Connected to DSTK token contract at: ${DSTK_TOKEN_ADDRESS}`);
  console.log(`👤 Using deployer account: ${await signer.getAddress()}`);

  // Calculate total required DSTK tokens
  let totalRequiredLiquidity = BigInt(0);
  for (const company of allCompanies) {
    totalRequiredLiquidity += getInitialLiquidity(company.marketCap);
  }

  console.log(`\n💧 Total required DSTK liquidity: ${ethers.formatUnits(totalRequiredLiquidity, 18)} DSTK`);

  // Check current DSTK balance
  const signerAddress = await signer.getAddress();
  let nonce = await provider.getTransactionCount(signerAddress);
  const currentBalance = await dstkContract.balanceOf(signerAddress);
  console.log(`💼 Current DSTK balance: ${ethers.formatUnits(currentBalance, 18)} DSTK`);

  // Mint more DSTK if needed
  if (currentBalance < totalRequiredLiquidity) {
    const mintAmount = totalRequiredLiquidity - currentBalance;
    console.log(`⚡ Minting additional ${ethers.formatUnits(mintAmount, 18)} DSTK tokens...`);
    
    const mintTx = await dstkContract.mint(signerAddress, mintAmount, { nonce: nonce++ });
    await mintTx.wait();
    console.log(`✅ Successfully minted DSTK tokens`);
  }

  // Approve DeStock contract to spend DSTK tokens
  console.log(`🔐 Approving DeStock contract to spend DSTK tokens...`);
  const approveTx = await dstkContract.approve(DESTOCK_CONTRACT_ADDRESS, totalRequiredLiquidity, { nonce: nonce++ });
  await approveTx.wait();
  console.log(`✅ Successfully approved token spending`);

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const company of allCompanies) {
    try {
      console.log(`\n📊 Processing ${company.name} (${company.symbol})...`);

      // Calculate total supply and initial liquidity
      const totalSupply = parseMarketCapToWei(company.marketCap);
      const initialLiquidity = getInitialLiquidity(company.marketCap);

      console.log(`💰 Total Supply: ${ethers.formatUnits(totalSupply, 18)} tokens`);
      console.log(`💧 Initial Liquidity: ${ethers.formatUnits(initialLiquidity, 18)} DSTK`);

      // Register the company
      const tx = await deStockContract.registerCompany(
        company.name,
        totalSupply,
        initialLiquidity,
        { nonce: nonce++ }
      );

      console.log(`⏳ Transaction submitted: ${tx.hash}`);
      
      // Wait for confirmation
      const receipt = await tx.wait();
      
      if (receipt.status === 1) {
        console.log(`✅ Successfully registered ${company.name} (${company.symbol})`);
        successCount++;
      } else {
        console.log(`❌ Transaction failed for ${company.name}`);
        errorCount++;
      }

      // Small delay to avoid overwhelming the network
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Error registering ${company.name}:`, error instanceof Error ? error.message : String(error));
      errorCount++;
    }
  }

  console.log('\n📈 Registration Summary:');
  console.log(`✅ Successfully registered: ${successCount} companies`);
  console.log(`⏭️  Already registered: ${skipCount} companies`);
  console.log(`❌ Failed registrations: ${errorCount} companies`);
  console.log(`📊 Total processed: ${successCount + skipCount + errorCount} companies`);

  if (errorCount > 0) {
    console.log('\n⚠️  Some companies failed to register. Please check the errors above.');
    process.exit(1);
  } else {
    console.log('\n🎉 All companies processed successfully!');
    console.log('🔗 Your DeStock platform is now ready for trading!');
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('❌ Unhandled promise rejection:', error);
  process.exit(1);
});

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
}

export default main;
