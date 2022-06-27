const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners(); // pulral signers
  const wavePortalFactory = await hre.ethers.getContractFactory("WavePortal");
  const wavePortalContract = await wavePortalFactory.deploy();
  await wavePortalContract.deployed();

  console.log(
    `WavePortal contract has beeen deployed at ${wavePortalContract.address}`
  );
  console.log(`This contract has beeen deployed by ${owner.address}`);

  let waveCount;
  waveCount = await wavePortalContract.getTotalWavesCount();

  let waveTxn = await wavePortalContract.wave("Shikhar sends a Goodluck"); // wait for mining
  await waveTxn.wait(); // wait till the block is mined

  /////////////////////////// rando person to send the message
  //const [owner, randomPerson] = await hre.ethers.getSigners();
  waveTxn = await wavePortalContract
    .connect(randomPerson)
    .wave("SomeoneElse sended some message");
  await waveTxn.wait();

  waveCount = await wavePortalContract.getTotalWavesCount();

  //making it so everyone can wave at us
  //  waveTxn = await wavePortalContract.connect(randomPerson).wave("");  //updated above
  // await waveTxn.wait();

  waveCount = await wavePortalContract.getTotalWavesCount();
  let allWaves = await wavePortalContract.getWaves();
  console.log(allWaves);
};

async function runMain() {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log("This is the error" + err);
    process.exit(1);
  }
}

runMain();

//``yarn hardhat run scripts/run.js``  this command has been initiated

// Before moving to frontend do these things
// 1. We need to deploy it again.

// 2. We need to update the contract address on our frontend.

// 3. We need to update the abi file on our frontend.
