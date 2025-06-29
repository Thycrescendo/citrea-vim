import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Mock contract ABI (replace with actual ABI after deploying the smart contract)
const contractABI = [
  "function buyOption(bool isCall, uint256 strikePrice, uint256 expiry, uint256 amount) payable",
  "function getPrice() view returns (uint256)",
  "function getUserOptions(address user) view returns (tuple(bool isCall, uint256 strikePrice, uint256 expiry, uint256 amount)[])",
];

const contractAddress = "0xYourContractAddress"; // Replace with deployed contract address

const TradingDashboard = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [btcPrice, setBtcPrice] = useState(0);
  const [isCall, setIsCall] = useState(true);
  const [strikePrice, setStrikePrice] = useState('');
  const [expiry, setExpiry] = useState('');
  const [amount, setAmount] = useState('');
  const [userOptions, setUserOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);

        // Fetch mock BTC price (replace with real oracle)
        const price = await contract.getPrice();
        setBtcPrice(ethers.utils.formatUnits(price, 8)); // Assuming 8 decimals for BTC
      }
    };
    init();
  }, []);

  const fetchUserOptions = async () => {
    if (contract && signer) {
      const address = await signer.getAddress();
      const options = await contract.getUserOptions(address);
      setUserOptions(options);
    }
  };

  const buyOption = async () => {
    if (!contract || !strikePrice || !expiry || !amount) return;
    setLoading(true);
    try {
      const tx = await contract.buyOption(
isCall,
        ethers.utils.parseUnits(strikePrice, 8),
        Math.floor(new Date(expiry).getTime() / 1000),
        ethers.utils.parseUnits(amount, 18),
        { value: ethers.utils.parseEther("0.01") } // Adjust value as needed
      );
      await tx.wait();
      alert('Option purchased successfully!');
      fetchUserOptions();
    } catch (error) {
      console.error('Error buying option:', error);
      alert('Failed to purchase option.');
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold mb-8 text-teal-400">Trading Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Order Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Place Order</h3>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Current BTC Price: ${btcPrice}</label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Option Type</label>
            <select
              value={isCall}
              onChange={(e) => setIsCall(e.target.value === 'true')}
              className="w-full p-2 bg-gray-700 rounded text-white"
            >
              <option value="true">Call</option>
              <option value="false">Put</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Strike Price (USD)</label>
            <input
              type="number"
              value={strikePrice}
              onChange={(e) => setStrikePrice(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
              placeholder="Enter strike price"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Expiry Date</label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Amount (cBTC)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 bg-gray-700 rounded text-white"
              placeholder="Enter amount"
            />
          </div>
          <button
            onClick={buyOption}
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          >
            {loading ? 'Processing...' : 'Buy Option'}
          </button>
        </div>
        {/* Portfolio */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Options</h3>
          <button
            onClick={fetchUserOptions}
            className="mb-4 bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          >
            Refresh Portfolio
          </button>
          {userOptions.length > 0 ? (
            <ul className="space-y-4">
              {userOptions.map((option, index) => (
                <li key={index} className="p-4 bg-gray-700 rounded">
                  <p>Type: {option.isCall ? 'Call' : 'Put'}</p>
                  <p>Strike Price: ${ethers.utils.formatUnits(option.strikePrice, 8)}</p>
                  <p>Expiry: {new Date(option.expiry * 1000).toLocaleDateString()}</p>
                  <p>Amount: {ethers.utils.formatUnits(option.amount, 18)} cBTC</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No options purchased yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradingDashboard;