const { ethers } = require("hardhat");
// require("dotenv").config();

const {
  WHITELIST_CONTRACT_ADDRESS,
  METADATA_URL,
} = require("../constants/constant.js");

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;

  const metadataURL = METADATA_URL;

  const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

  // deploy the contract
  const deployedCryptoDevsContract = await cryptoDevsContract.deploy(
    metadataURL,
    whitelistContract
  );

  // print the address of the deployed contract
  console.log(
    "Crypto Devs Contract Address:",
    deployedCryptoDevsContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
