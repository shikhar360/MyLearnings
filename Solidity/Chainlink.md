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

### Chainlink Keepers🤠

 A network of oracles delivering event driven decentralized computation. Right now, in order for the blockchain to change state, someone has to trigger a transaction.
 Chainlink Keepers allow us to do this in a decentralized context, allowing for us to have contract interact with each other programmatically.
 
 ### Chainlink API Calls 🥶
 
  Chainlink API Calls are the piece of Chainlink infrastructure that allows unlimited customization. This features takes the most work to set up,
  but can be customized to make your smart contracts do roughly anything.
 
