require("dotenv").config();
const lighthouse = require("@lighthouse-web3/sdk");
const { Wallet } = require("ethers");
const fs = require("fs");
const path = require("path");

async function uploadLogo(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Use API key for authentication instead of wallet signing
    const apiKey = process.env.LIGHTHOUSE_API_KEY;
    if (!apiKey) {
      throw new Error("LIGHTHOUSE_API_KEY not found in environment variables");
    }

    console.log(`📤 Uploading ${path.basename(filePath)}...`);
    
    // Upload using API key authentication
    const response = await lighthouse.upload(filePath, apiKey);

    const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
    console.log(`✅ Uploaded ${path.basename(filePath)} to: ${ipfsUrl}`);
    return ipfsUrl;
  } catch (error) {
    console.error(`❌ Failed to upload ${path.basename(filePath)}:`, error.message);
    throw error;
  }
}

// 🪄 Auto-upload all PNG/JPG files in ./logos/
async function uploadAll() {
  try {
    const logoDir = path.join(__dirname, "../logos");
    
    // Check if logos directory exists
    if (!fs.existsSync(logoDir)) {
      throw new Error(`Logos directory not found: ${logoDir}`);
    }

    const files = fs.readdirSync(logoDir).filter(f =>
      f.endsWith(".png") || f.endsWith(".jpg") || f.endsWith(".jpeg")
    );

    if (files.length === 0) {
      console.log("❌ No image files found in logos directory");
      return;
    }

    console.log(`🚀 Found ${files.length} image files to upload`);
    console.log("📁 Files:", files.join(", "));
    
    const results = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(logoDir, file);
      
      console.log(`\n📊 Progress: ${i + 1}/${files.length}`);
      
      try {
        const url = await uploadLogo(filePath);
        results.push({ file, url, status: 'success' });
      } catch (error) {
        console.error(`❌ Failed to upload ${file}:`, error.message);
        results.push({ file, error: error.message, status: 'failed' });
      }
      
      // Add a small delay between uploads to avoid rate limiting
      if (i < files.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    // Summary
    const successful = results.filter(r => r.status === 'success');
    const failed = results.filter(r => r.status === 'failed');
    
    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successful: ${successful.length}`);
    console.log(`❌ Failed: ${failed.length}`);
    
    if (successful.length > 0) {
      console.log(`\n✅ Successfully uploaded files:`);
      successful.forEach(r => console.log(`   ${r.file} -> ${r.url}`));
    }
    
    if (failed.length > 0) {
      console.log(`\n❌ Failed uploads:`);
      failed.forEach(r => console.log(`   ${r.file}: ${r.error}`));
    }
    
  } catch (error) {
    console.error("❌ Fatal error:", error.message);
    process.exit(1);
  }
}

uploadAll();
