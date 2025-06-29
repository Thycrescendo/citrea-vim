import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [account, setAccount] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);

  useEffect(() => {
    const providerOptions = {};
    const web3ModalInstance = new Web3Modal({
      network: 'citrea',
      cacheProvider: true,
      providerOptions,
    });
    setWeb3Modal(web3ModalInstance);
  }, []);

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const ethersProvider = new ethers.providers.Web3Provider(provider);
      const signer = ethersProvider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Configure Citrea Testnet
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x13fb',
            chainName: 'Citrea Testnet',
            rpcUrls: ['https://rpc.testnet.citrea.xyz'],
            nativeCurrency: { name: 'cBTC', symbol: 'cBTC', decimals: 18 },
            blockExplorerUrls: ['https://explorer.testnet.citrea.xyz'],
          },
        ],
      });
    } catch (error) {
      console.error('Wallet connection failed:', error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-teal-400">Citrea-Vim</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-teal-400">Home</Link>
          <Link to="/trade" className="hover:text-teal-400">Trade</Link>
          <button
            onClick={connectWallet}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;