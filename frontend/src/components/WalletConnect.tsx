import React, { useState } from 'react';

const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = () => {
    // Mock wallet connection for now
    setAccount('0x1234...5678');
    console.log('Wallet connected (mocked)');
  };

  return (
    <button
      onClick={connectWallet}
      className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
    >
      {account ? `Connected: ${account}` : 'Connect Wallet'}
    </button>
  );
};

export default WalletConnect;