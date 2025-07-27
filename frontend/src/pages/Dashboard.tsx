import React, { useState, useEffect } from 'react';
import OptionCard from '../components/OptionCard';
import TradeModal from '../components/TradeModal';

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<null | { type: 'Call' | 'Put'; strikePrice: number; expiry: string; premium: number; liquidity: number }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string>('Home');

  const options = [
    { type: 'Call' as const, strikePrice: 60000, expiry: '2025-08-01', premium: 500, liquidity: 1000 },
    { type: 'Put' as const, strikePrice: 58000, expiry: '2025-08-01', premium: 450, liquidity: 800 },
    { type: 'Call' as const, strikePrice: 62000, expiry: '2025-08-15', premium: 550, liquidity: 1200 },
  ];

  const collections = [
    { name: 'Rare NFTs', items: 12, value: 2500 },
    { name: 'Digital Art', items: 8, value: 1800 },
    { name: 'Crypto Collectibles', items: 15, value: 3200 },
    { name: 'Virtual Tokens', items: 6, value: 900 },
  ];

  const topSellers = [
    { name: 'TraderX', volume: 3500, rating: 4.5 },
    { name: 'CryptoKing', volume: 2800, rating: 4.2 },
    { name: 'BlockMaster', volume: 2000, rating: 4.0 },
    { name: 'CoinWizard', volume: 1500, rating: 3.8 },
  ];

  const assets = ['Bitcoin', 'Ethereum', 'XRP', 'Litecoin', 'Cardano'];

  // Inject styles into the document
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes slide-right {
        from { transform: translateX(-10px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .animate-fade-in {
        animation: fade-in 1s ease-out;
      }
      .hover\\:animate-slide-right:hover {
        animation: slide-right 0.5s ease-out forwards;
      }
    `;
    document.head.appendChild(styleSheet);

    // Cleanup function to remove the style element
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="fixed left-0 top-16 h-screen w-64 bg-gray-800 p-4 shadow-lg z-10">
        <nav className="space-y-4">
          <button
            onClick={() => setActiveNav('Home')}
            className={`w-full p-2 rounded-lg text-white ${
              activeNav === 'Home' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveNav('My Collections')}
            className={`w-full p-2 rounded-lg text-white ${
              activeNav === 'My Collections' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            My Collections
          </button>
          <button
            onClick={() => setActiveNav('Wallet')}
            className={`w-full p-2 rounded-lg text-white ${
              activeNav === 'Wallet' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Wallet
          </button>
          <button
            onClick={() => setActiveNav('Transfer')}
            className={`w-full p-2 rounded-lg text-white ${
              activeNav === 'Transfer' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Transfer
          </button>
          <button
            onClick={() => setActiveNav('Settings')}
            className={`w-full p-2 rounded-lg text-white ${
              activeNav === 'Settings' ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            Settings
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="pt-20 pl-64 pr-64">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Options Market</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {options.map((option, index) => (
            <OptionCard
              key={index}
              option={option}
              onTrade={() => {
                setSelectedOption(option);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>

        {/* Additional Activities */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Collections */}
          <div className="bg-green-900 p-6 rounded-lg shadow-md border border-green-700 animate-fade-in">
            <h3 className="text-lg font-semibold text-green-300 mb-4">Collections</h3>
            <ul className="space-y-4 text-green-300">
              {collections.map((collection, index) => (
                <li key={index} className="p-2 bg-green-800 rounded-lg">
                  {collection.name} - {collection.items} items (Value: {collection.value} cBTC)
                </li>
              ))}
            </ul>
          </div>

          {/* Top Sellers */}
          <div className="bg-purple-900 p-6 rounded-lg shadow-md border border-purple-700">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Top Sellers</h3>
            <ul className="space-y-4 text-purple-300">
              {topSellers.map((seller, index) => (
                <li
                  key={index}
                  className="p-2 bg-purple-800 rounded-lg hover:animate-slide-right"
                  style={{ animationDuration: '0.5s' }}
                >
                  {seller.name} - Volume: {seller.volume} cBTC (Rating: {seller.rating} ★)
                </li>
              ))}
            </ul>
          </div>
        </div>

        <TradeModal
          option={selectedOption || options[0]}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {/* Right Sidebar */}
      <div className="fixed right-0 top-16 h-screen w-64 bg-gray-800 p-4 shadow-lg z-10">
        <h3 className="text-lg font-semibold text-white mb-4">Exchange Assets</h3>
        <div className="border border-gray-700 p-4 rounded-lg">
          <ul className="space-y-2 text-gray-300">
            {assets.map((asset, index) => (
              <li key={index} className="p-2 hover:text-yellow-400 hover:bg-gray-700 rounded">{asset}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;