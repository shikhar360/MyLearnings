//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;                                                  //  rituals

import "hardhat/console.sol";

contract CandyMachine{

  
  address payable public owner;                     // the owner will be recieving the money thats why we have set the owner payable
  mapping(address => uint) public candyBalance ;       // address associated to number of candies

  constructor(){
    owner = msg.sender;
    candyBalance[address(this)] = 100 ;             // at the time of deployment the total amount of candies that will be available in machine
  }

  function buyCandy(uint _amount)external payable {
   require(msg.value >= _amount * 0.001 ether , "Send more money to buy it");      // msg.value contains the amount of wei (ether / 1e18) sent in the transaction.
    require(candyBalance[address(this)] >= _amount , "Not enought candy left " );
   candyBalance[address(this)] -= _amount ;               // while purchasing two things are happening some amount odf candy is decreasing from contract
   candyBalance[address(msg.sender)]  += _amount ;  // & that same amount is going to the buyer ;msg.sender here could be different from the msg.sender in constructor

  }
  
  function getCandyBalance()external view returns(uint){
    return candyBalance[address(this)];  // candyBalance[address(this)] means the balance of candy that is left in the contract.
  }

  modifier onlyOwner(){  //modifiers used as a helper function 
    require(owner == msg.sender , "You are not the Owner");  //here we are saying that every function which has modifier must pass the following requirement
    _;                                                       // after the requirement is done do the rest of the code
  }

  function restock(uint _amount) external onlyOwner {        // here we are saying that only the owner can restock the candy machine.
   candyBalance[address(this)] += _amount ;
  }
  
  
   function totalPurchasedByAddress(address _addr) external view returns(uint){ // cheecking how much amount of caandy each address have purchased
    return candyBalance[_addr] ;
  }

  function withdrawFunds(uint _amount) external  onlyOwner{        // withdrawin the required amount from the contract 
    require( address(this).balance >= _amount * 0.01 ether , "Withdrawing more than sale");
    payable(msg.sender).transfer( _amount * 0.01 ether);     //msg.sender is not payable in nature by default thatsb  why we have 
     
  } 

 function getEarnings()external view returns(uint){          // reading the balance  that this contract have after selling the candies
   return address(this).balance;                            // this refers to the balance of the contract
 }
}








  
