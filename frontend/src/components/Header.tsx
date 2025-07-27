import React from 'react';
import WalletConnect from './WalletConnect';
import { FaBitcoin } from 'react-icons/fa';

const BitcoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return <FaBitcoin {...props} /> as unknown as React.ReactElement;
};

const Header: React.FC = () => {
  return (
    <header className="fixed w-full bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg z-10">
      <div className="flex items-center space-x-3">
        <BitcoinIcon className="text-yellow-400 text-2xl" />
        <h1 className="text-xl font-bold">Citrea-Vim</h1>
      </div>
      <WalletConnect />
    </header>
  );
};

export default Header;