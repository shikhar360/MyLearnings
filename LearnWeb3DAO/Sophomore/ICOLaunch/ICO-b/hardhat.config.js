require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const RPC = process.env.QUICKNODE_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    mumbai: {
      url: RPC,
      accounts: [PRIVATE_KEY],
    },
  },
};
