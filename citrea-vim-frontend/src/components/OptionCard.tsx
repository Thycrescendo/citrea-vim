import React from 'react';

interface Option {
  id: number;
  type: 'Call' | 'Put';
  strikePrice: number;
  expiry: string;
  premium: number;
  liquidity: number;
}

interface OptionCardProps {
  option: Option;
  onTrade: () => void;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onTrade }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md border border-teal-700 animate-fade-in">
      <h3 className="text-lg font-semibold text-teal-300">Option #{option.id}</h3>
      <p>Type: {option.type}</p>
      <p>Strike Price: ${option.strikePrice.toLocaleString()}</p>
      <p>Expiry: {option.expiry}</p>
      <p>Premium: {option.premium} cBTC</p>
      <p>Liquidity: {option.liquidity} cBTC</p>
      <button
        onClick={onTrade}
        className="mt-4 w-full bg-teal-500 text-gray-900 py-2 rounded-lg hover:bg-teal-600"
      >
        Trade
      </button>
    </div>
  );
};

export default OptionCard;