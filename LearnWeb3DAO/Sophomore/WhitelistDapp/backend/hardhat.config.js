require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */

const URL = process.env.ANKR_URL;
const PRIVATE = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: URL,
      accounts: [PRIVATE],
    },
  },
};
