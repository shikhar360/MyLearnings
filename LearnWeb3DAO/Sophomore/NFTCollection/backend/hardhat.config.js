require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ANKR_URL = process.env.ANKR_URL;

const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: ANKR_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
