//----------------------------------------
// HOW TO READ SMART CONTRACT
//----------------------------------------

const { ethers } = require("ethers");

const API_KEY = "";

const provider = new ethers.providers.JsonRpcProvider( // dont forget to put the new keyword
  `https://mainnet.infura.io/v3/${API_KEY}`
);

const address = ""; //DAI  Contract  Address

const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

/* In order to talk to a smart contract we have to create new instance (child contract) with
 "ethers" . Any contract which is interacting with the outside world need 3 things

 1--Address(contract's address)  2-- ABI   3-- ProviderOrSigner            */

const contract = new ethers.Contract(address, ERC20_ABI, provider); //global

async function main() {
  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();

  console.log(`Name: ${name}`);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}\n`);

  const balance = await contract.balanceOf(
    ""
  );
  console.log("the balance is" + balance);
}

main();
