import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    citreaTestnet: {
      url: "https://rpc.testnet.citrea.xyz",
      chainId: 5115,
      accounts: ["YOUR_PRIVATE_KEY"], // Replace with your MetaMask private key (securely)
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
};

export default config;