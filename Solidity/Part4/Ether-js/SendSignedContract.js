//----------------------------------------
// HOW TO SEND SIGNED TRANSACTION
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

async function main() {
  // Showing the balances before of both the account
  // ----------------------------------------------------------------
  const senderBalanceBefore = await provider.getBalance(account1); //we learned this in My1.js
  const recieverBalanceBefore = await provider.getBalance(account2);

  console.log(
    `\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`
  );
  console.log(
    `reciever balance before: ${ethers.utils.formatEther(
      recieverBalanceBefore
    )}\n`
  );

  // ----------------------------------------------------------------

  //  now with code transaction will be done  //transaction sended
  const tx = await wallet.sendTransaction({
    to: account2,
    value: ethers.utils.parseEther("0.02"),
  });

  //but if we want to get the information we need to wait for the transaction to be mined
  await tx.wait();
  console.log(tx);

  //Showing balance AFTER transaction
  //------------------------------------------------------
  const senderBalanceAfter = await provider.getBalance(account1);
  const recieverBalanceAfter = await provider.getBalance(account2);

  console.log(
    `\nSender balance before: ${ethers.utils.formatEther(senderBalanceAfter)}`
  );
  console.log(
    `reciever balance before: ${ethers.utils.formatEther(
      recieverBalanceAfter
    )}\n`
  );
  //------------------------------------------------------
}

main();
