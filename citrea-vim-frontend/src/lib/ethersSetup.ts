import { ethers, BrowserProvider, Contract } from 'ethers';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Contract ABI (simplified for this example, added optionCount)
const abi = [
  "function createOption(uint256 _strikePrice, uint256 _premium, uint256 _expiry, bool _isCall, uint256 _liquidity) public",
  "function getOption(uint256 _optionId) public view returns (uint256, uint256, uint256, bool, uint256)",
  "function optionCount() public view returns (uint256)",
];

// Contract address (replace with deployed address from smart-contracts)
const contractAddress = "0xYourDeployedContractAddress"; // Update with real address

export const getContract = async (): Promise<Contract> => {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner(); // Await signer initialization
  return new Contract(contractAddress, abi, signer);
};