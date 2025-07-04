import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia, localhost } from 'viem/chains';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const FAUCET_AMOUNT = parseEther('1000'); // 1000 DSTK tokens

export async function POST(request: NextRequest) {
  try {
    const { address, chainId } = await request.json();

    // Validate inputs
    if (!address || !chainId) {
      return NextResponse.json(
        { error: 'Address and chainId are required' },
        { status: 400 }
      );
    }

    // Only allow testnet faucet requests
    if (chainId !== sepolia.id && chainId !== localhost.id) {
      return NextResponse.json(
        { error: 'Faucet only available on testnet networks' },
        { status: 400 }
      );
    }

    // Check rate limiting
    const now = Date.now();
    const lastRequest = rateLimitMap.get(address);
    if (lastRequest && now - lastRequest < RATE_LIMIT_DURATION) {
      const timeLeft = Math.ceil((RATE_LIMIT_DURATION - (now - lastRequest)) / (60 * 60 * 1000));
      return NextResponse.json(
        { error: `Please wait ${timeLeft} hours before requesting again` },
        { status: 429 }
      );
    }

    // Verify environment variables
    const privateKey = process.env.FAUCET_PRIVATE_KEY;
    const rpcUrl = chainId === sepolia.id 
      ? process.env.SEPOLIA_RPC_URL 
      : process.env.LOCAL_RPC_URL || 'http://127.0.0.1:8545';

    if (!privateKey) {
      return NextResponse.json(
        { error: 'Faucet not configured' },
        { status: 500 }
      );
    }

    // Set up clients
    const chain = chainId === sepolia.id ? sepolia : localhost;
    const account = privateKeyToAccount(privateKey as `0x${string}`);
    
    const publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(rpcUrl),
    });

    // Get DSTK token contract address (would need to be set based on deployment)
    const tokenAddress = process.env.DSTK_TOKEN_ADDRESS;
    if (!tokenAddress) {
      return NextResponse.json(
        { error: 'Token contract not configured' },
        { status: 500 }
      );
    }

    // Mint tokens to the user (this assumes the faucet wallet is the owner)
    const hash = await walletClient.writeContract({
      address: tokenAddress as `0x${string}`,
      abi: [
        {
          inputs: [
            { name: 'to', type: 'address' },
            { name: 'amount', type: 'uint256' }
          ],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      functionName: 'mint',
      args: [address, FAUCET_AMOUNT],
    });

    // Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations: 1,
    });

    if (receipt.status === 'success') {
      // Update rate limiting
      rateLimitMap.set(address, now);

      return NextResponse.json({
        success: true,
        transactionHash: hash,
        amount: '1000',
        message: 'Successfully minted 1000 DSTK tokens!',
      });
    } else {
      return NextResponse.json(
        { error: 'Transaction failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Faucet error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
