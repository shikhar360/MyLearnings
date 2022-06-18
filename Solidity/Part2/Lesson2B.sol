// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";








library PriceConverter{      //though it is a contract type but we write it as i.e(library PriceConverter{} )




function getPrice()/*public*/ internal view returns (uint256){  //since we are interacting it from outside fromthe contract 2 things needed 
  //1 ABI
  //2 ADDRESS   0x8A753747A1Fa494EC906cE90E9f37563A8AF630e
   AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e) ; //getting the abi
   
    (
            /*uint80 roundID*/,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        )= priceFeed.latestRoundData();

        //the price that we are getting here is 10**8 (8 digit number) and we also know 1eth = 10**18 wei
        //so if it is returning 8 digits we needed another 10 digits to convert into wei
        //then after it will be converted into USD

    return uint256(price * 1e10); // wechanged int into uint256 
}






function getVersion()/*public*/ internal view returns(uint256){
    AggregatorV3Interface priceFeed = AggregatorV3Interface(0x8A753747A1Fa494EC906cE90E9f37563A8AF630e) ;
    return priceFeed.version();

}







function getConversionRate( uint256 ethAmount)/*public*/ internal view returns(uint256){
    uint256 nowPrice = getPrice();
    // uint256 ethAmountInUsd = (nowPrice * ethAmount) / 1e18; 
    //  return ethAmountInUsd;
    //---------------or------------
    return uint256((nowPrice * ethAmount) / 1e18);
// 3000_000000000000000000 ETH/USD price
// 1_000000000000000000 ETH 


}




}
