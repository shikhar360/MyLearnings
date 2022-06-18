const { ethers } = require("ethers");
// Unnderstood it as a type of import (watch REQUIRE video from Readme.Part4)

/*
The JSON-RPC API is a popular method for interacting with Ethereum and is available in all major Ethereum node implementations(e.g. Geth and Parity)as well as many third-party web services
le.g. INFURA)
 */

//This is how we use it
const API_KEY = "apikey";

const provider = new ethers.providers.JsonRpcProvider(
  `https://mainnet.infura.io/v3/${API_KEY}`
);

// How to know the Balance of and eth Address
const addressETH = "";

const main = async () => {
  const balance = await provider.getBalance(addressETH);
  console.log(
    `\nETH Balance of ${addressETH} ------> ${ethers.utils.formatEther(
      balance
    )} ETH\n`
  );
  // ethers.utils.formatEther(balance)<---- this will put decimals after 18 digits
};

main();

// To run this type of node file we have to do this in terminal
// node 'path' ---> ie node ./examples/My1.js
