import { ethers } from 'ethers';

// Extend Window interface to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Contract ABI (simplified for this example)
const abi = [
  "function createOption(uint256 _strikePrice, uint256 _premium, uint256 _expiry, bool _isCall, uint256 _liquidity) public",
  "function getOption(uint256 _optionId) public view returns (uint256, uint256, uint256, bool, uint256)",
  "function optionCount() public view returns (uint256)",
];

// Contract address (replace with deployed address from smart-contracts)
const contractAddress = "0xYourDeployedContractAddress"; // Update with real address

export const getContract = () => {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, abi, signer);
};