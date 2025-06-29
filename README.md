# Citrea-Vim

Citrea-Vim is your gateway to decentralized Bitcoin options trading. Leveraging Citrea’s zero-knowledge rollup and zkEVM, it enables users to trade options without intermediaries, secured by zero-knowledge proofs. The sleek React frontend, styled with Tailwind CSS, provides a modern, dark-themed interface with teal accents, featuring a trading dashboard, portfolio tracker, and wallet integration via MetaMask on Citrea Testnet.

- **Tagline**: "Trade Bitcoin Options Trustlessly, Powered by Citrea."
- **10-Word Description**: Trustless Bitcoin options trading on Citrea zkEVM, secure, DeFi-integrated.

---

## Features

- ✅ **Trustless Trading**: Non-custodial options trading using zkEVM and Bitcoin Light Client.
- 📈 **Real-Time Pricing**: Mock oracles (to be replaced with Chainlink) for accurate BTC pricing.
- 🖥️ **User-Friendly UI**: Responsive design with React and Tailwind CSS, optimized for desktop and mobile.
- 📊 **Portfolio Management**: Track purchased call/put options in a dedicated dashboard.
- 🧩 **DeFi Composability**: Foundation for future integrations with DeFi protocols.
- 🔐 **Secure Integration**: Utilizes Citrea’s Schnorr precompile and OP Stack with Celestia for L3 scaling.

---

## About the Build

### What It Does
Citrea-Vim empowers users to trade Bitcoin options on Citrea’s zkEVM, blending cutting-edge zero-knowledge proofs with a stunning, real-time trading interface.

### The Problem It Solves
It eliminates custody risks associated with centralized exchanges and bridges Bitcoin’s limited smart contract capabilities with the innovative world of DeFi.

### Challenges I Ran Into
- Adapting to zkEVM constraints and Bitcoin Light Client integration.
- MetaMask connection issues with Citrea Testnet.
- Simulating accurate oracles in absence of live feeds.
- UI responsiveness and Tailwind CSS quirks on smaller screens.

### Technologies I Used
- **Frontend**: React, Tailwind CSS, Ethers.js, @web3modal/react, wagmi, react-router-dom
- **Smart Contracts**: Solidity, Hardhat, Remix (Shanghai EVM)
- **Chain**: Citrea Testnet (Chain ID: 5115, RPC: https://rpc.testnet.citrea.xyz)
- **Security**: Bitcoin Light Client, Schnorr precompile, OP Stack + Celestia

### How We Built It
- Bootstrapped React app with Tailwind CSS and routing.
- Deployed Solidity contracts on Citrea via Remix.
- Wallet connectivity via Web3Modal and Wagmi hooks.
- L3 appchain setup using OP Stack and Celestia finalized by 08:38 AM, June 29, 2025.

### What We Learned
- How to integrate zkEVM with Bitcoin’s ecosystem.
- Importance of seamless wallet UX and oracle integrations.
- Smart contract gas optimization and modular frontend development.

### What's Next for Citrea-Vim
- 🔄 Integrate Chainlink BTC/USD live oracle
- ⚙️ Add multi-user settlement features
- 🚀 Scale L3 appchain performance
- 📱 Launch mobile-first UI and collaborate with DeFi protocols

---

## Getting Started

### Prerequisites

- **Node.js**: v14.x or v16.x – [Install Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js
- **MetaMask**: Add Citrea Testnet (Chain ID: 5115, RPC: https://rpc.testnet.citrea.xyz)
- **cBTC Tokens**: Obtain via Citrea faucet

### Installation

```bash
git clone https://github.com/Thycrescendo/citrea-vim
cd citrea-vim
npm install
npm install tailwindcss@3.4.17 postcss@8 autoprefixer@10 ethers@5 react-router-dom@6 @web3modal/ethereum @web3modal/react wagmi --legacy-peer-deps
npx tailwindcss init -p
````

### Start the App

```bash
npm start
```

Visit `http://localhost:3000` to view the app.

---

## Deploying Smart Contracts

1. Install and initialize Hardhat:

```bash
npm install --save-dev hardhat
npx hardhat init
```

2. Configure `hardhat.config.js`:

```js
module.exports = {
  solidity: "0.8.25",
  networks: {
    citrea: {
      url: "https://rpc.testnet.citrea.xyz",
      chainId: 5115,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
```

3. Deploy:

```bash
npx hardhat run scripts/deploy.js --network citrea
```

> **Note**: Add `.env` with `PRIVATE_KEY=your_private_key` and include `.env` in `.gitignore`.

---


## Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m "Add feature"`
4. Push: `git push origin feature-name`
5. Open a pull request

Let’s shape Bitcoin DeFi together!

---

## License

This project is licensed under the MIT License.
See the [LICENSE.md](LICENSE.md) file for details.

---

## Acknowledgments

* 💡 **Citrea Team** – For enabling zkEVM and L2 Bitcoin scalability
* 🤖 **xAI/Grok 3** – For helpful coding guidance and creativity boosts
* 🌊 **WaveHack Community** – For the support, feedback, and camaraderie

---

## Visuals

* **Logo**: A teal Bitcoin symbol next to bold "Citrea-Vim"
* **UI Preview**: Real-time trading dashboard in a dark mode layout with teal charts and portfolio analytics

---