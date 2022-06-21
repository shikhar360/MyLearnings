require("@nomiclabs/hardhat-waffle")
require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})


///Learnings 👇
const RPC_URL = process.env.RPC_URL
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
const P_KEY = process.env.PRIVATE_KEY

// you can add hardhats fake(JS VM like in remix) in hardhat ,, it is different from the default network
// if you run `` yarn hardhat run scripts/deploy.js `` then it will be running at default network
//to run it from different networrks `` yarn hardhat run scripts/deploy.js --network goerli``
// you can create A (JS VM as in remix you will have to ) `` yarn hardhat node ``
//from there you will get url and you will be able to add the networks in the network object
// run this `` yarn hardhat run scripts/deploy.js --network localhost``

module.exports = {
    defaultNetwork: "hardhat",
    solidity: "0.8.8",
    networks: {
        goerli: {
            url: RPC_URL,
            accounts: [P_KEY],
            chainId: 5,
        },
        localhost: {
            //(by this wat you can add multiple networks)
            url: "http://127.0.0.1:8545/",
            //   accounts:[] is automatically provided by HARDHAT
            chainId: 31337,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
}
