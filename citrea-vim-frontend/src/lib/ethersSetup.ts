import { ethers, BrowserProvider, Contract } from 'ethers';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Citrea Testnet Chain ID (5115) and configuration
const CITREA_CHAIN_ID = 5115;
const CITREA_CHAIN_DATA = {
  chainId: `0x${CITREA_CHAIN_ID.toString(16)}`, // 0x13b3
  chainName: 'Citrea Testnet',
  nativeCurrency: {
    name: 'cBTC',
    symbol: 'cBTC',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.citrea.xyz'], // Official RPC from your config
  blockExplorerUrls: ['https://explorer.testnet.citrea.xyz'], // Verify this URL
};

// Contract ABI
const abi = [
  "function createOption(uint256 _strikePrice, uint256 _premium, uint256 _expiry, bool _isCall, uint256 _liquidity) public",
  "function getOption(uint256 _optionId) public view returns (uint256, uint256, uint256, bool, uint256)",
  "function optionCount() public view returns (uint256)",
];

// Contract address
const contractAddress = "0xYourDeployedContractAddress"; // Update with real address

export const getContract = async (): Promise<Contract> => {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new Contract(contractAddress, abi, signer);
};

// Function to add or switch to Citrea chain
export const switchToCitreaChain = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [CITREA_CHAIN_DATA],
    });
  } catch (error) {
    console.error('Failed to add Citrea chain:', error);
    // If adding fails (e.g., chain exists), try switching
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CITREA_CHAIN_DATA.chainId }],
      });
    } catch (switchError) {
      console.error('Failed to switch to Citrea chain:', switchError);
      throw new Error('Unable to connect to Citrea chain');
    }
  }
};