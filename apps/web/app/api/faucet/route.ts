import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia } from 'viem/chains';
import { validateEnvironment, isValidChain, FAUCET_CONFIG } from '@/lib/constants/shared';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const { address, chainId } = await request.json();

    console.log('Faucet request:', { address, chainId });

    // Validate inputs
    if (!address || !chainId) {
      console.error('Missing required fields:', { address: !!address, chainId: !!chainId });
      return NextResponse.json(
        { 
          success: false,
          error: 'Address and chainId are required',
          message: 'Missing required request parameters'
        },
        { status: 400 }
      );
    }

    // Validate address format
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      console.error('Invalid address format:', address);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid address format',
          message: 'Please provide a valid Ethereum address'
        },
        { status: 400 }
      );
    }

    // Validate environment configuration
    const envCheck = validateEnvironment();
    if (!envCheck.isValid) {
      console.error('Environment validation failed:', envCheck.missingVars);
      return NextResponse.json(
        { 
          success: false,
          error: 'Faucet configuration error',
          message: `Missing environment variables: ${envCheck.missingVars.join(', ')}. Please contact support.`
        },
        { status: 500 }
      );
    }

    // Only allow testnet faucet requests  
    if (!isValidChain(chainId)) {
      console.error('Invalid chain ID for faucet:', chainId);
      return NextResponse.json(
        { 
          success: false,
          error: 'Unsupported network',
          message: 'Faucet only available on supported testnet networks (Localhost: 31337, Sepolia: 11155111)'
        },
        { status: 400 }
      );
    }

    // Check rate limiting
    const now = Date.now();
    const lastRequest = rateLimitMap.get(address.toLowerCase());
    if (lastRequest && now - lastRequest < FAUCET_CONFIG.rateLimitWindow) {
      const remainingTime = FAUCET_CONFIG.rateLimitWindow - (now - lastRequest);
      const hoursLeft = Math.ceil(remainingTime / (60 * 60 * 1000));
      
      console.log('Rate limit hit for address:', address, 'hours left:', hoursLeft);
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Rate limit exceeded',
          message: `Please wait ${hoursLeft} hour${hoursLeft > 1 ? 's' : ''} before requesting again`,
          remainingTime
        },
        { status: 429 }
      );
    }

    // Get environment variables with better error handling
    const privateKey = process.env.PRIVATE_KEY || process.env.FAUCET_PRIVATE_KEY;
    const tokenAddress = process.env.NEXT_PUBLIC_DSTK_TOKEN_ADDRESS;
    
    if (!privateKey) {
      console.error('Missing private key environment variable');
      return NextResponse.json(
        { 
          success: false,
          error: 'Faucet wallet not configured',
          message: 'Faucet service is temporarily unavailable. Please try again later.'
        },
        { status: 500 }
      );
    }

    if (!tokenAddress) {
      console.error('Missing token contract address');
      return NextResponse.json(
        { 
          success: false,
          error: 'Token contract not configured',
          message: 'Token contract address not set. Please contact support.'
        },
        { status: 500 }
      );
    }

    // Set up RPC URL
    const rpcUrl = chainId === sepolia.id 
      ? process.env.SEPOLIA_RPC_URL 
      : process.env.LOCAL_RPC_URL || 'http://127.0.0.1:8545';

    if (!rpcUrl) {
      console.error('Missing RPC URL for chain:', chainId);
      return NextResponse.json(
        { 
          success: false,
          error: 'RPC configuration error',
          message: 'Network RPC not configured. Please contact support.'
        },
        { status: 500 }
      );
    }

    // Set up clients with explicit chain configuration
    const chain = chainId === sepolia.id ? sepolia : {
      id: 31337,
      name: 'Localhost',
      network: 'localhost',
      nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
      rpcUrls: {
        default: { http: ['http://127.0.0.1:8545'] },
        public: { http: ['http://127.0.0.1:8545'] },
      },
    };
    
    // Validate private key format
    const formattedPrivateKey = privateKey.startsWith('0x') ? privateKey : `0x${privateKey}`;
    if (!/^0x[a-fA-F0-9]{64}$/.test(formattedPrivateKey)) {
      console.error('Invalid private key format');
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid faucet wallet configuration',
          message: 'Faucet wallet configuration error. Please contact support.'
        },
        { status: 500 }
      );
    }

    const account = privateKeyToAccount(formattedPrivateKey as `0x${string}`);
    
    const publicClient = createPublicClient({
      chain,
      transport: http(rpcUrl),
    });

    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(rpcUrl),
    });

    console.log('Attempting to mint tokens:', {
      to: address,
      amount: FAUCET_CONFIG.amount,
      tokenAddress,
      chainId
    });

    // Parse the faucet amount
    const faucetAmount = parseEther(FAUCET_CONFIG.amount);

    // Mint tokens to the user (this assumes the faucet wallet has mint permissions)
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
      args: [address, faucetAmount],
    });

    console.log('Transaction submitted:', hash);

    // Wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({
      hash,
      confirmations: 1,
      timeout: 30000, // 30 second timeout
    });

    console.log('Transaction receipt:', { status: receipt.status, hash });

    if (receipt.status === 'success') {
      // Update rate limiting
      rateLimitMap.set(address.toLowerCase(), now);

      console.log('Faucet success for address:', address);

      return NextResponse.json({
        success: true,
        txHash: hash,
        transactionHash: hash, // For backward compatibility
        amount: FAUCET_CONFIG.amount,
        message: `Successfully minted ${FAUCET_CONFIG.amount} DSTK tokens!`,
      });
    } else {
      console.error('Transaction failed with status:', receipt.status);
      return NextResponse.json(
        { 
          success: false,
          error: 'Transaction failed',
          message: 'Token minting transaction failed. Please try again.'
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Faucet error details:', {
      message: error.message,
      code: error.code,
      details: error.details,
      stack: error.stack
    });

    // Provide more specific error messages based on common issues
    let userMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.message?.includes('insufficient funds')) {
      userMessage = 'Faucet wallet has insufficient funds. Please contact support.';
    } else if (error.message?.includes('execution reverted')) {
      userMessage = 'Transaction was rejected by the contract. The faucet may not have mint permissions.';
    } else if (error.message?.includes('network')) {
      userMessage = 'Network connection error. Please check your connection and try again.';
    } else if (error.message?.includes('timeout')) {
      userMessage = 'Request timed out. Please try again.';
    } else if (error.code === 'UNAUTHORIZED') {
      userMessage = 'Faucet wallet does not have permission to mint tokens. Please contact support.';
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        message: userMessage
      },
      { status: 500 }
    );
  }
}
