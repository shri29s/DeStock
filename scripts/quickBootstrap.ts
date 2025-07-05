/**
 * Quick Bootstrap Script - Pre-register ALL tokens
 * This script registers ALL tokens from tokens.json for immediate trading
 */

import { ethers } from 'ethers';
import fs from 'fs';
import path from 'path';

// Configuration
const RPC_URL = 'http://127.0.0.1:8545';
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

// Get contract addresses from environment
const DESTOCK_CONTRACT_ADDRESS = process.env.DESTOCK_CONTRACT_ADDRESS || '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9';
const DSTK_TOKEN_ADDRESS = process.env.DSTK_TOKEN_ADDRESS || '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9';

// Import ABIs
const DeStockABIFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/ABI/DeStock.json'), 'utf8'));
const DeStockABI = DeStockABIFile.abi;
const DSTKABIFile = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/ABI/DeStockToken.json'), 'utf8'));
const DSTKABI = DSTKABIFile.abi;

// Load tokens from the tokens.json file
const tokensData = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/constants/tokens.json'), 'utf8'));

// Extract ALL tokens from ALL categories for pre-registration
const ALL_TOKENS: Array<{name: string, price: string, supply: string}> = [];

// Get ALL tokens from each category
for (const category in tokensData) {
  for (const tokenKey in tokensData[category]) {
    const token = tokensData[category][tokenKey];
    // Extract price from marketCap and calculate reasonable supply
    const marketCapValue = parseFloat(token.marketCap.replace(/[$,M]/g, ''));
    const basePrice = Math.max(10, Math.min(500, marketCapValue / 100)); // Price between 10-500 DSTK
    const baseSupply = Math.max(100, Math.min(2000, marketCapValue * 2)); // Supply between 100-2000
    
    ALL_TOKENS.push({
      name: token.name,
      price: basePrice.toString(),
      supply: baseSupply.toString()
    });
  }
}

console.log(`📋 Found ${ALL_TOKENS.length} tokens to pre-register`);

async function main() {
  console.log('🚀 Quick bootstrap: Pre-registering ALL tokens...');
  console.log(`📄 DeStock Contract: ${DESTOCK_CONTRACT_ADDRESS}`);
  console.log(`💰 DSTK Token: ${DSTK_TOKEN_ADDRESS}`);

  try {
    // Setup provider and signer
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    
    // Get contract instances
    const deStockContract = new ethers.Contract(DESTOCK_CONTRACT_ADDRESS, DeStockABI, signer);
    const dstkContract = new ethers.Contract(DSTK_TOKEN_ADDRESS, DSTKABI, signer);

    console.log(`👤 Using deployer account: ${await signer.getAddress()}`);

    // Calculate total required liquidity
    let totalRequired = 0;
    for (const token of ALL_TOKENS) {
      totalRequired += parseFloat(token.price) * parseFloat(token.supply) + 100; // +100 for registration fee
    }

    console.log(`💧 Total required DSTK: ${totalRequired}`);

    // Check and mint if needed
    const signerAddress = await signer.getAddress();
    let nonce = await provider.getTransactionCount(signerAddress);
    const currentBalance = await dstkContract.balanceOf(signerAddress);
    const currentBalanceFormatted = parseFloat(ethers.formatEther(currentBalance));

    console.log(`💼 Current balance: ${currentBalanceFormatted} DSTK`);

    if (currentBalanceFormatted < totalRequired) {
      const mintAmount = ethers.parseEther(Math.ceil(totalRequired - currentBalanceFormatted + 1000).toString());
      console.log(`⚡ Minting additional DSTK tokens...`);
      
      const mintTx = await dstkContract.mint(signerAddress, mintAmount, { nonce: nonce++ });
      await mintTx.wait();
      console.log(`✅ Minted additional DSTK tokens`);
    }

    // Approve spending
    const approvalAmount = ethers.parseEther(Math.ceil(totalRequired + 1000).toString());
    console.log(`🔐 Approving DSTK spending...`);
    
    const approveTx = await dstkContract.approve(DESTOCK_CONTRACT_ADDRESS, approvalAmount, { nonce: nonce++ });
    await approveTx.wait();
    console.log(`✅ Approved DSTK spending`);

    let successCount = 0;
    
    // Register each token
    for (const token of ALL_TOKENS) {
      try {
        console.log(`\n📊 Registering ${token.name}...`);

        const totalSupply = ethers.parseEther(token.supply);
        const initialLiquidity = ethers.parseEther((parseFloat(token.price) * parseFloat(token.supply)).toString());

        const tx = await deStockContract.registerCompany(
          token.name,
          totalSupply,
          initialLiquidity,
          { 
            nonce: nonce++,
            gasLimit: 500000 // Explicit gas limit to avoid estimation issues
          }
        );

        console.log(`⏳ Transaction: ${tx.hash}`);
        const receipt = await tx.wait();
        
        if (receipt.status === 1) {
          console.log(`✅ ${token.name} registered successfully`);
          successCount++;
        } else {
          console.log(`❌ ${token.name} registration failed`);
        }

        // Small delay
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error: any) {
        if (error.message?.includes('Company already exists')) {
          console.log(`⏭️  ${token.name} already registered`);
          successCount++;
        } else {
          console.error(`❌ Error registering ${token.name}:`, error.message);
        }
      }
    }

    console.log(`\n🎉 Bootstrap complete!`);
    console.log(`✅ ${successCount}/${ALL_TOKENS.length} tokens available for trading`);
    console.log(`🚀 Users can now trade ALL tokens immediately!`);
    
  } catch (error: any) {
    console.error('❌ Bootstrap failed:', error.message);
    // Don't exit with error - this is non-critical
    console.log('⚠️  Continuing without pre-registration. Users can register companies manually.');
  }
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    console.error('❌ Script failed:', error.message);
    // Don't exit with error code for non-critical bootstrap
    process.exit(0);
  });
}

export default main;
