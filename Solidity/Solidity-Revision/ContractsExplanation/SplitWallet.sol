//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract PaymentSplitter{

 address payable [] public recipients; // recipients is a type of payable array
//  payable means it can rcieve and send ethers


  event TransferRecieved( address from , uint amount); // event eventName (types nameOftype)
// events are a cheap way to store data , when we dont want our data to be stored on Blockchain and we also dont want to access it 
// we use events we can get it by {method : "eth_getLogs"}as shown in patric video.


// there is a another keyword in event which we say "indexed" (we can only have 3 of them in a event) it basicall allow the frontend 
// to get searched easily (it has 2 parts the event  and the emit: it throws the valuee in the events)



 constructor( address payable [] memory _addr ){   // at the time of deployment we have to enter the array of address that will be
 // the recipients , their type will be payable  , and they should not be stored anywhere (thats why memory) 
   
  for( uint i = 0 , i< _addr.length , i++){
     // the array that we are getting should be itterated and should be pushed to the reciepents
    recipients.push(_addr[i]);
  }

 } 


 receive() external payable {
  // msg.value is a member of the msg (message) object when sending (state transitioning) transactions on the Ethereum network.IT msg.value contains the amount of wei (ether / 1e18) sent in the transaction.
  uint share = msg.value / recipients.length;
   // Here we are dividing the total value of contract into the length of the recipients array so each one in the array should get  equal share
   for( uint i = 0 , i < recipients.length , i++){
    recipients[i].transfer(share); // itterating equal amount of share transfering into recipients address
   }

   emit TransferRecieved(msg.sender , msg.value)  //throwing the value into the event
 }



}
