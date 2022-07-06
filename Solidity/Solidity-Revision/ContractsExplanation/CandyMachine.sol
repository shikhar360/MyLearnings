//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;                                                  //  rituals

import "hardhat/console.sol";

contract CandyMachine{

  
  address public owner;
  mapping(address => uint) public candyBalance ;       // address associated to number of candies

  constructor(){
    owner = msg.sender;
    candyBalance[address(this)] = 100 ;             // at the time of deployment the total amount of candies that will be available in machine
  }

  function buyCandy(uint _amount)public payable {
   require(msg.value >= _amount * 0.001 ether , "Send more money to buy it");      // msg.value contains the amount of wei (ether / 1e18) sent in the transaction.
    require(candyBalance[address(this)] >= _amount , "Not enought candy left " );
   candyBalance[address(this)] -= _amount ;               // while purchasing two things are happening some amount odf candy is decreasing from contract
   candyBalance[address(msg.sender)]  += _amount ;  // & that same amount is going to the buyer ;msg.sender here could be different from the msg.sender in constructor

  }
  
  function getCandyBalance()public view returns(uint){
    return candyBalance[address(this)];  // candyBalance[address(this)] means the balance of candy that is left in the contract.
  }

  modifier onlyOwner(){  //modifiers used as a helper function 
    require(owner == msg.sender , "You are not the Owner");  //here we are saying that every function which has modifier must pass the following requirement
    _;                                                       // after the requirement is done do the rest of the code
  }

  function restock(uint _amount) public onlyOwner {  // here we are saying that only the owner can restock the candy machine.
   candyBalance[address(this)] += _amount ;
  }
}
