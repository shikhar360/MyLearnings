require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const TESTNET_RPC = process.env.TESTNET_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: TESTNET_RPC,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
    },
  },
};