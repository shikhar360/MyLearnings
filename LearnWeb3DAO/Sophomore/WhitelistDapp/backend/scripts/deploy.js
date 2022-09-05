const { ethers } = require("hardhat");

async function main() {
  const whiteListFactory = await ethers.getContractFactory("WhitelistDapp");

  const deployContract = await whiteListFactory.deploy(10);
  await deployContract.deployed();

  console.log("Whitelist Deployed at ", deployContract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
