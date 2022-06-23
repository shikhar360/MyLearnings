import { ethers } from "./ethers.js";
import { abi } from "./constants.js";
const connectbtn = document.getElementById("connect-button");
connectbtn.onclick = connect;
const fundbtn = document.getElementById("fund");
fundbtn.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefine") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" }); // provided i the metamask docs
      document.getElementById("connect-button").innerHTML = "Connected Bro";
    } catch (err) {
      document.getElementById("connect-button").innerHTML =
        "Please connect metamask";
      console.log(err);
    }
    const account = await window.ethereum.request({ method: "eth_accounts" });
    console.log(account);
  } else {
    document.getElementById("connect-button").innerHTML =
      "Please install metamask";
  }
}

async function fund(ethAmount) {
  if (typeof window.ethereum !== "undefine") {
    console.log(`funded with ${ethAmount}`);
    // provider/connection to the blockchain
    const provider = new ethers.providers.Web3Provider(window.ethereum); // see ethers.docs
    // signer/wallet/someone with some gas
    const signer = provider.getSigner();

    // contract that we are interacting with
    const contract = new ethers.Contract(address, abi, signer); // we need 3 things
    //^ABI&Address   //we will import this
    const txResponse = await contract.fund({
      value: ethers.utils.parseEther(ethAmount),
    });
  }
}

/*

//how to use hardhats network and wallet on metamask

run `` yarn hardhat node`` in the terminal
you will get the RPC_URL there
Follow thw imge now

now you have to add the wallet in the metamask for that the above command have alreaddy provided you some 
wallet wit private keys 
go to settings and click on "import wallet using private key"
enter private key





solhint is the special package works like eslint ,, hwlps us to find errors in smart contract
`` yarn solhint contracts/*.sol ``  in the terminal. 


///////////////////////////////////////not important
hardhat-deploy is a plugin for replicable deployment and easy testing
to install that sometime we need to manage the files and putting the deploy.js into script wont work
sometime thats why we are using it 
``yarn add --dev hardhat-deploy``
and put require("hardhat-deploy") in the hardhat config file
if you are using 'hardhat-deploy' feature with ethers then install this one too
this is needed to write our scripts and add extra features to access deployments as ethers contract.

``yarn add --dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers``
here we are overwriting hardhat ethers with hardhat-deploy-ethers
/////////////////////////////////////////////////////////

When running your contracts and tests on Hardhat Network you can print logging messages and
contract variables calling console. log() from your Solidity code. To use it you have to 
``import hardhat/console.sol``    from your contract code.


 */
