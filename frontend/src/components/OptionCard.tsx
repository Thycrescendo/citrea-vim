import React from 'react';
import TradeModal from './TradeModal';

interface Option {
  type: 'Call' | 'Put';
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

interface OptionCardProps {
  option: Option;
  onTrade: () => void; // Added for modal trigger
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onTrade }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-200">
      <h3 className="text-lg font-semibold text-white">{option.type} Option</h3>
      <p className="text-gray-300">Strike Price: ${option.strikePrice.toLocaleString()}</p>
      <p className="text-gray-300">Expiry: {option.expiry}</p>
      <p className="text-gray-300">Premium: {option.premium} cBTC</p>
      <p className="text-gray-300">Liquidity: {option.liquidity} cBTC</p>
      <button
        onClick={onTrade}
        className="mt-4 w-full bg-yellow-400 text-gray-900 py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Trade
      </button>
    </div>
  );
};

export default OptionCard;