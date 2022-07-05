//SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

contract EtherWallet {
  //an address payable can recieve ethers
  address payable public owner;

  constructor() {
    owner = payable(msg.sender); // we have typecasted it because msg.sender in nature is not payable in nature
  }
// Solidity with the modifier Payable ensures that the function can send and receive Ether
  receive()external payable {}
// recieve is a special function that is used to receive funds It executes on calls to the contract with no data (calldata), e.g. calls made via send() or transfer().


  function withdarw(uint _amount) external {         // visibility is external because we wantt it to be accessed from the third-party
    require(msg.sender == owner , "You are not the owner bro"); //only owner can use this withdraw function
      payable(msg.sender).transfer(_amount);   
      // msg.sender in other functions is different from the msg.sender which is in the constructor (like it can be another person that is using this function)
  }

  function balanceOf() external view returns(uint) {
    return address(this).balance;   // address(this).balance is refers to the balance of the contract.
  }
}
