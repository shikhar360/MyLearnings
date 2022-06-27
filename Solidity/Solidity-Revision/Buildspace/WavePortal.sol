// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import 'hardhat/console.sol';

contract WavePortal{
  uint256 totalWaves;
  address public owner;
  
  event RepliesComment(address indexed from , uint256 timeStamp , string message ); // event is a cheaper way to store data on a blockchain , we write event name of event and pass the types
  //there are 2 parts of it firs one is event and second is `emit` we can not read the emit logs in a smart contraact
  // there is also indexed keyword which means that someone could seach usiing the address.


//  here object is created
  struct Wave{       //in order to store the data we will apply the pattern ARRAY OF OBJECTS , 
   address waver;    
   string message;
   uint256 timestamp;

  }
 
 // ARRAY is created to store the object
  Wave[] waves;


  constructor(){                                  // anonymous function
    console.log("Yo , I am a smart contract");    // hardhat features,  use to debug the contract 
    owner = msg.sender;
  }
  


  function wave(string memory _message) public {
   totalWaves += 1;
    console.log('Hey you just waved to me' , msg.sender); //msg.sender is the address who calls the function
  
    waves.push(Wave(msg.sender , _message , block.timestamp)); // pushing wave struct into waves array

    emit RepliesComment(msg.sender , block.timestamp, _message); //emmiting the event , we will not be able to what is emmited because it is not stored on a blockchain 

  }


  function getWaves() public view returns (Wave[] memory){
    return waves;
  }

  function getTotalWavesCount() public view returns (uint256){
    console.log("We have %d total waves!", totalWaves);
    return totalWaves;
  }

}





