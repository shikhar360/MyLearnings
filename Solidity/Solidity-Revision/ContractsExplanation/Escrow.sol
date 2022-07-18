//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;


//Basically Escrow is a account which works as a third-party i.e MiddleMan , to execute a huge transaction(i.e buying the house planes etc...) 
// This third-party works as a security for both the parties , hold the funds and assets from the both party and release the funds when the condition have met.

contract Escrow{
    address internal middleMan;                // the perosn who is deploying the contract will work as a middleMan
    address internal payer;                    // the Person who is going to pay the sum
    address payable internal payee;            // the person who is going to get the sum
    uint public requestAmount;                 // the amount that is requested by payee to fulfill the transaction 

    constructor(address _payer , address payable _payee){      // at the time of deploying the contract we need to pass the arguments in the .deploy(/*arguments*/)
        middleMan = msg.sender;                               // setting up the middleman person who is deploying the contract
         payer = _payer;                                      // payer and payee are preety self explainatory
        payee = _payee;
    }

     

    function reqAmount(uint _requestedAmount) external {      // amount that a payee is going to request from the payer if this condition is met then fund will release
        require(msg.sender == payee , "Only Payee can request the Money");
        requestAmount = _requestedAmount * 1 ether;      // the amount requested will be in terms of ethers
    }

    function deposit()external payable {                                    
      require(msg.value == requestAmount , "Not depositing enough money");       // the payer should be depositing funds equal to the requested amount     
      require(msg.sender == payer, "Sender must be the payer");                  // the person who is depositing the funds should be a payer 
      require(msg.sender.balance >= requestAmount," Insufficient Balance");      // payer should have enough balance to pay the payee
    }

    function release ()external{                                     // its on the middleMan to release the funds if the transaction in real life is been executed
        require(msg.sender == middleMan , "only MiddleMan can release funds");  // execution should be dione by middleman
        payee.transfer(address(this).balance);                                    // payee will be transfered all the funds that are present in contract
        requestAmount = 0 ;                                                   // then requested amount should be zero.
    }

    
    function balanceOf() external view returns (uint){
       return address(this).balance;                        // trying to view thw balance of contract
    }
}
