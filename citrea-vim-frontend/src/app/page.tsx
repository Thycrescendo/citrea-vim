"use client";

import React, { useState, useEffect } from 'react';
import OptionCard from '../components/OptionCard';
import TradeModal from '../components/TradeModal';
import { ethers, BrowserProvider, formatEther } from 'ethers';
import { getContract } from '../lib/ethersSetup';

declare global {
  interface Window {
    ethereum?: any;
  }
}

const Home: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<null | { id: number; type: 'Call' | 'Put'; strikePrice: number; expiry: string; premium: number; liquidity: number }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Home');
  const [walletBalance, setWalletBalance] = useState<number>(10000); // Virtual BTC balance in cBTC
  const [portfolio, setPortfolio] = useState<{ id: number; type: 'Call' | 'Put'; quantity: number }[]>([]);
  const [options, setOptions] = useState<{ id: number; type: 'Call' | 'Put'; strikePrice: number; expiry: string; premium: number; liquidity: number }[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const contract = getContract();
        const optionCount = Number(await contract.optionCount());
        const fetchedOptions = [];
        for (let i = 1; i <= optionCount; i++) {
          const [strikePrice, premium, expiry, isCall, liquidity] = await contract.getOption(i);
          fetchedOptions.push({
            id: i,
            type: isCall ? 'Call' : 'Put',
            strikePrice: Number(strikePrice),
            expiry: new Date(Number(expiry) * 1000).toISOString().split('T')[0],
            premium: Number(premium),
            liquidity: Number(liquidity),
          });
        }
        setOptions(fetchedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
        setOptions([
          { id: 1, type: 'Call', strikePrice: 60000, expiry: '2025-08-15', premium: 500, liquidity: 1000 },
          { id: 2, type: 'Put', strikePrice: 58000, expiry: '2025-08-15', premium: 450, liquidity: 800 },
          { id: 3, type: 'Call', strikePrice: 62000, expiry: '2025-08-20', premium: 550, liquidity: 1200 },
        ]);
      }
    };
    init();
  }, []);

  const connectWallet = async () => {
    try {
      await window.ethereum?.request({ method: 'eth_requestAccounts' });
      setIsConnected(true);
      const provider = new BrowserProvider(window.ethereum);
      const balance = await provider.getBalance(await provider.getSigner().getAddress());
      setWalletBalance(Number(formatEther(balance)));
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setIsConnected(false);
    }
  };

  const executeTrade = (option: typeof selectedOption, quantity: number) => {
    if (walletBalance >= option!.premium * quantity) {
      setWalletBalance(walletBalance - option!.premium * quantity);
      setPortfolio([...portfolio, { id: option!.id, type: option!.type, quantity }]);
      alert(`Traded ${quantity} ${option!.type} options successfully!`);
    } else {
      alert('Insufficient balance!');
    }
  };

  useEffect(() => {
  const init = async () => {
    try {
      const contract = await getContract(); // Await the contract promise
      const optionCount = Number(await contract.optionCount());
      const fetchedOptions = [];
      for (let i = 1; i <= optionCount; i++) {
        const [strikePrice, premium, expiry, isCall, liquidity] = await contract.getOption(i);
        fetchedOptions.push({
          id: i,
          type: isCall ? 'Call' : 'Put',
          strikePrice: Number(strikePrice),
          expiry: new Date(Number(expiry) * 1000).toISOString().split('T')[0],
          premium: Number(premium),
          liquidity: Number(liquidity),
        });
      }
      setOptions(fetchedOptions);
    } catch (error) {
      console.error('Error fetching options:', error);
      setOptions([
        { id: 1, type: 'Call', strikePrice: 60000, expiry: '2025-08-15', premium: 500, liquidity: 1000 },
        { id: 2, type: 'Put', strikePrice: 58000, expiry: '2025-08-15', premium: 450, liquidity: 800 },
        { id: 3, type: 'Call', strikePrice: 62000, expiry: '2025-08-20', premium: 550, liquidity: 1200 },
      ]);
    }
  };
  init();
}, []);

  const collections = [
    { name: 'Rare BTC NFTs', items: 5, value: 2500 },
    { name: 'BTC Art', items: 3, value: 1800 },
  ];

  const topSellers = [
    { name: 'TraderX', volume: 3500, rating: 4.5 },
    { name: 'CryptoKing', volume: 2800, rating: 4.2 },
  ];

  const assets = ['Bitcoin', 'Ethereum', 'XRP', 'Litecoin', 'Cardano'];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="fixed left-0 top-16 h-screen w-64 bg-gray-800 p-4 shadow-lg z-10">
        <nav className="space-y-4">
          {['Home', 'My Collections', 'Wallet', 'Transfer', 'Settings'].map((navItem) => (
            <button
              key={navItem}
              onClick={() => setActiveNav(navItem)}
              className={`w-full p-2 rounded-lg text-white ${activeNav === navItem ? 'bg-teal-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              {navItem}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-20 pl-64 pr-64">
        <h2 className="text-2xl font-bold text-white text-center mb-6 animate-bounce">Options Trading Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {options.map((option) => (
            <OptionCard
              key={option.id}
              option={option}
              onTrade={() => {
                setSelectedOption(option);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow-md border border-teal-700 animate-fade-in">
          <h3 className="text-lg font-semibold text-teal-300 mb-4">Portfolio</h3>
          <p className="text-teal-300">BTC Balance: {walletBalance.toFixed(2)} cBTC {isConnected && '(Connected)'}</p>
          <ul className="space-y-2 text-teal-300">
            {portfolio.map((item, index) => (
              <li key={index}>{item.type} Option #{item.id} - Quantity: {item.quantity}</li>
            ))}
          </ul>
          {!isConnected && (
            <button
              onClick={connectWallet}
              className="mt-4 w-full bg-teal-500 text-gray-900 py-2 rounded-lg hover:bg-teal-600"
            >
              Connect Wallet
            </button>
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="bg-green-900 p-6 rounded-lg shadow-md border border-green-700 animate-fade-in">
            <h3 className="text-lg font-semibold text-green-300 mb-4">Collections</h3>
            <ul className="space-y-4 text-green-300">
              {collections.map((collection, index) => (
                <li key={index} className="p-2 bg-green-800 rounded-lg hover:animate-slide-right">
                  {collection.name} - {collection.items} items (Value: {collection.value} cBTC)
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-purple-900 p-6 rounded-lg shadow-md border border-purple-700">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Top Sellers</h3>
            <ul className="space-y-4 text-purple-300">
              {topSellers.map((seller, index) => (
                <li
                  key={index}
                  className="p-2 bg-purple-800 rounded-lg hover:animate-slide-right"
                >
                  {seller.name} - Volume: {seller.volume} cBTC (Rating: {seller.rating} ★)
                </li>
              ))}
            </ul>
          </div>
        </div>

        <TradeModal
          option={selectedOption}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onTrade={executeTrade}
        />
      </div>

      <div className="fixed right-0 top-16 h-screen w-64 bg-gray-800 p-4 shadow-lg z-10">
        <h3 className="text-lg font-semibold text-white mb-4">Exchange Assets</h3>
        <div className="border border-gray-700 p-4 rounded-lg">
          <ul className="space-y-2 text-gray-300">
            {assets.map((asset, index) => (
              <li key={index} className="p-2 hover:text-teal-400 hover:bg-gray-700 rounded animate-fade-in">
                {asset}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;