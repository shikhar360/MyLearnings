require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const ANKR_HTTP_URL = process.env.ANKR_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: ANKR_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
