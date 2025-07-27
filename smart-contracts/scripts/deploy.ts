import { ethers } from "hardhat";

async function main() {
  const CitreaOptions = await ethers.getContractFactory("CitreaOptions");
  const citreaOptions = await CitreaOptions.deploy();

  await citreaOptions.deployed();
  console.log("CitreaOptions deployed to:", citreaOptions.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});