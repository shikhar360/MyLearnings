//----------------------------------------
// HOW TO WRITE CONTRACTS
//----------------------------------------

const { ethers } = require("ethers");

const API_KEY = "apikey";

const provider = new ethers.providers.JsonRpcProvider(
  `https://kovan.infura.io/v3/${API_KEY}` // https://kovan.infura.io/v3/
);

const account1 = ""; //senders account
const account2 = ""; //recievers account

const privateKey1 = "privatekey";

const wallet = new ethers.Wallet(privateKey1, provider); // we have created a wallet to send the transaction

const address = "";

const ABI = [
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const contract = new ethers.Contract(address, ABI, provider);

async function main() {
  const balance = await contract.balanceOf(account1);

  console.log(`\nReading from ${address}\n`);
  console.log(`Balance of sender: ${balance}\n`);

  //First we have to connect to the wallet to the contract and transfer to the another wallet

  const connectedWithWallet = contract.connect(wallet);
  const tx = await connectedWithWallet.transfer(account2, balance); //here we have connected wallet with the link token contract if we run this we will transfer all the  tokens to another account

  await tx.wait();
  console.log(tx);

  // ..to show balace after transactin
  const balanceOfSender = await contract.balanceOf(account1);
  const balanceOfReciever = await contract.balanceOf(account2);

  console.log(`\nBalance of sender: ${balanceOfSender}`);
  console.log(`Balance of reciever: ${balanceOfReciever}\n`);
}

main();
