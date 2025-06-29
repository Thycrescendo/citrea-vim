import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-6 text-teal-400">Citrea-Vim</h1>
        <p className="text-xl mb-8 text-gray-300">
          Trade Bitcoin options trustlessly on Citrea’s zkEVM. Secure, non-custodial, and DeFi-compatible.
        </p>
        <Link
          to="/trade"
          className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-lg text-lg"
        >
          Start Trading
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Secure Trading</h3>
          <p className="text-gray-400">
            Leverage zero-knowledge proofs for trustless, non-custodial Bitcoin options trading.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Real-time Pricing</h3>
          <p className="text-gray-400">
            Access live Bitcoin price feeds for accurate call and put options pricing.
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">DeFi Composability</h3>
          <p className="text-gray-400">
            Integrate with DeFi protocols on Citrea for advanced financial strategies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;