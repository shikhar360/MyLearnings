# What is Chainlink??🤔
Chainlink is a decentralized oracle network for retrieving off-chain data, and executing 
off-chain computation. Decentralized oracle networks (DONs) can be customized to do relatively
anything to empower smart contracts to have unlimited customization

## Other features that Chainlink Provide😍

### Chainlink Data Feeds 🧧⛓

Feeds are one of the most popular use cases of Chainlink oracles.
They are a way to get data from the real world in a decentralized context.
A group of oracle off-chain all access data from some of the highest quality sources
(many different high quality sources) and aggregate them to a single answer. 
They then publish this data on-chain to a smart contract for anyone to pull from. This makes gathering important data like pricing
information of assets cheaper, more secure, decentralized, and more diligent than any centralized solution.
The data feeds are one of the most battled tested solutions, being used by top protocols like Aave, Compound, and Synthetix for their DeFi protocols

```solidity

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";  //import this to get data from the chainlink

contract PriceConsumerV3 {
    // ETH USD aggregator on the ETH Mainnet Chain
    AggregatorV3Interface public priceFeed = AggregatorV3Interface(0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419);
    // contract address directly in imported contract
    //we can get address from the docs.
    
    function getLatestPrice() external view returns (int) {
     (uint80 roundID,                // we will get a bunch of data from chainlink heere is the list of that
     int price,           // <-- this is the one we want to return so we are using the destructuring method in solidity
     uint startedAt,
     uint timeStamp,
     uint80 answeredInRound) = priceFeed.latestRoundData();
     return price;        //returning what we want;
    }
    
}
```

### Chainlink Verifiable Randomness Function (Chainlink VRF) 🎲🔮

Blockchains themselves are deterministic, and therefore, cannot get true randomness. We have to look outside the blockchain to get random numbers,
but we don't want to get a number than can be snooped. Chainlink VRF is a proven way to get a random number that is cryptographically random.

```solidity

/ SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";    //we will use this to get random number 

contract RandomNumberConsumer is VRFConsumerBase {    //we have to inherit the contract and in the constructor also
    bytes32 public keyHash;             
    uint256 public fee;
    uint public randomResult ;
    

    constructor()  VRFConsumerBase(  
    //while inheriting in the contract it require two parmeters (cordinator contract address and the Link Token address )
    
            0xf0d54349aDdcf704F77AE15b96510dEA15cb7952, // VRF Coordinator
            0x514910771AF9Ca656af840dff83E8264EcF986CA  // LINK Token
            
        ) 
        
    {
        keyHash = 0xAA77729D3466CA35AE8D28B3BBAC7CC36A5031EFDC430821C02BC31A238AF445;  // This key hash we wil get in docs
        fee = 2 * 10 ** 18;      // we can set any fees we want while keeping the input decimal in mind    // fee = 0.1 * 10**18
    }
    
    function getRandomNumber() public returns (bytes32) { 
    // when the function will be called it will automaticall cal the fullfillRandomness function
    //(It is basically a Request Function to the Oracle )
    bytes32 _x = requestRandomness(keyHash , fee);        // It returns a byte32 that will be pushed in the fullfillrandomness
    return _x;
    }
    
    
    //the byte32 from the above function will be sent as a arguments in this funcction and it will return a rndom number 
    // but that random number will be very large thats why wecan use mods to get the require numbers
    
    function fulfillRandomness(bytes32, uint256 _x) internal override {
     randomResult = _x ;    //_x.mod(20).add(1) will give number between 1 to 20 .mods gives 0 _ 19 
    }
}

```
### Chainlink Keepers🤠

 A network of oracles delivering event driven decentralized computation. Right now, in order for the blockchain to change state, someone has to trigger a transaction.
 Chainlink Keepers allow us to do this in a decentralized context, allowing for us to have contract interact with each other programmatically.
 
 ```solidity
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

contract Capsule is KeeperCompatibleInterface {   
     uint public timestamp;
     address payable depositer;

    function deposit(uint _lockedUntil) external payable {
        require(block.timestamp > timestamp);
        timestamp = _lockedUntil;
        depositer = payable(msg.sender);
    }


    //This is a method that Chainlink expects every Chainlink Keeper to implement will be called by
    //a keeper as a query to see whether or not your contract requires upkeep
    //This method will periodically be called by the Chainlink Keeper👇
    
    function checkUpkeep(bytes calldata) external view override returns (bool, bytes memory) {
     bool upkeepNeeded = timestamp > 0 && block.timestamp > timestamp;
        return (upkeepNeeded, "0x");
    }

//This👇 method will be called by a keeper when our checkUpkeep indicates it is time to do so
    function performUpkeep(bytes calldata) external override {
        require(block.timestamp > timestamp );
        depositer.transfer(address(this).balance);
        delete timestamp;
    }   
}
 ```
 ### Chainlink API Calls 🥶
 
  Chainlink API Calls are the piece of Chainlink infrastructure that allows unlimited customization. This features takes the most work to set up,
  but can be customized to make your smart contracts do roughly anything.
  
  ```solidity
  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";  //impoert in order to use the chainlink API

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;  
  
    uint256 public rainfall;
    
    address public oracle;
    bytes32 public jobId ;
    uint256 public fee ;
    
    constructor() {
        // this sets the stored address for the LINK token based on the 
        // public network that the contract is deployed on
        // (no need to change anything here)
        setPublicChainlinkToken();
        
        //we need three things in order to work from API
        oracle  = 0x3Aa5ebB10DC797CAC828524e59A333d0A371443c;    // hash from the docs
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1*10**18;                                         // fee that you want
    }
    
    function requestRainfall() external {
    //Chainlink request needs three things (job id , a callback Address i.e our contract accdess, a callback function (fulfill) )
        Chainlink.Request memory request = buildChainlinkRequest( jobId , address(this) , this.fulfill.selector );
        
        // we need the get type from the chainlink (followed by the api Link)
        request.add("get" , "http://rainfall-oracle.com/");
        
        //ADDING THE PATH IN THE JSON FILE
        request.add("path", "rainfalls.iowa.september.2021.average");
        
        //finally sending the request to chainlink
        sendChainlinkRequestTo(oracle, request, fee);
    }
    
    function fulfill(bytes32 _requestId, uint256 _x) public recordChainlinkFulfillment(_requestId) {
        rainfall = _x;   // setting the value of the state variable that we are getting from the api Link
    }
}

  ```
 
