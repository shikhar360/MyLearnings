const { ethers, run, network } = require("hardhat") //like in ethers.js we used to do const {ethers} = require("hardhat");
// hardhat has its seperate ethers integrated in it.
// Run allow us to run all th taskk of the hardhat


async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        //we will use 'await' not 'new'
        "SimpleStorage"
    )
    console.log("deploying contracts..................")
    const simpleStorage = await SimpleStorageFactory.deploy() //wait till it is deploying
    await simpleStorage.deployed() //wait till its deployed

    console.log(`deployed contract to ${simpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // Interaction with smart contract

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current Value is:${currentValue}`)
    // Update the current value
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated Value is:${updatedValue}`)
}

/*
Here you were thiking about what happened to RPC_URL and PRIVATE_KEY
when you will go into the hardhat.config.js file then under the module.export section
if you dont see a network section then by default hardhat attach its own RPCURL AND PRIVATEKEY
*/

async function verify(contractAddress, args) {
    try {
        console.log("verifying.................")
        await run("verify:verify", {
            address: contractAddress,
            contructorArguments: args,
        })
    } catch (err) {
        if (err.message.toLowercase().includes("already verified")) {
            console.log("Already verified............")
        } else {
            console.alert(errr)
        }
    }
}

/*
Hardhat's feature of Console
for that you need to run
`` yarn hardhat console --network networkname ``
then you have to just

  const SimpleStorageFactory = await ethers.getContractFactory"SimpleStorage")

  to get the contract and then

  const simpleStorage = await SimpleStorageFactory.deploy()

  to deploy the contract an then you will be able to use contract functions like by using await calls


   await simpleStorage.retrieve()
   or
   await simpleStorage.store(7)
 
   this console works with any netwoerk
*/

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
