//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;



import "./PriceConverter.sol";            //(Take file from Part2/Lesson2B.sol  to make it compatible)

error NotOwner(); 

contract FundMe{

using PriceConverter for uint256;

// We can do gas optimization by putting constant 
//There are 2 keywords which could be use if we dont want to change the value of variable
//1 CONSTANT    2 IMMUTABLE 


// constant have different naming conventions allCAPS with UNDERSCORES
uint256 public constant /*minimumUsd*/ MINIMUM_USD = 50 * 1e18;     // here we are seeing that we are not going to change it in future (in this case we can do gas optiization by putting constant) 

//-------------------------
// ALL THE GLOBAL FUNCTIONS LIKE msg.value , msg.sender etc ARE ONLY GOING TO WORK WHEN THEY ARE USED INSIDE A FUNCTION
// By using constant and immutable they are directly stored in the bytecode of the contract instead of storageSlot.
//-----------------


address[] public funders;
mapping(address => uint256) public addressToAmountFunded;



//Variables that the declared outside (in this case state i.e owner) but they are getting its value inside a function can be marked as IMMUTABLE to save gas
// Also naming convention for immutable is i_stateName
address public immutable i_owner;


    constructor(){
        i_owner = msg.sender;
    }


    function fund()public payable{   
   require(msg.value.getConversionRate() >= MINIMUM_USD , "Aur Bhejo BE");
   funders.push(msg.sender); 
   addressToAmountFunded[msg.sender] += msg.value;
  }  



 function withdraw()public onlyOwner{
        for(uint256 funderIndex=0 ; funderIndex > funders.length ; funderIndex++){
            address funder = funders[funderIndex] ;
            addressToAmountFunded[funder] = 0;
        }
    
    funders = new address[](0);

  
    (bool callSuccess,) =payable(msg.sender).call{value:address(this).balance}("");
    require(callSuccess,"Call failed");

    }

//One another way we can save gas is by using CUSTOM ERRORS 
// 1-- Go on top(OUTSIDE CONTRACT) and put {error Notowner();}
//2-- Use if statement with revert keyword like this


   modifier onlyOwner{
    //    require(msg.sender == i_owner , "Sender is not owner"); 
    if(msg.sender != i_owner){ revert NotOwner();}  // we can change this with all the require statement
       _;   
             
   }
   
 //What happens if someone sends this contract funds without calling the fund function Or they called the wrong function
//  For this we have 2 things
//1 recieve()  2 fallback()

// Fallback() is called when you call a fiunction that does not exist in the contract
//the Main usage of fallback is to ENABLE DIRECT ETH SENDING FEATURE 

/*
Ether is sent to contract
    is msg.data empty?
         /\
        yes no --> fallback()
        /
  receive()exists?
            /\
         yes   no
        /      \
    receive()  fallback()

    https://www.youtube.com/watch?v=CMVC6Tp9gq4         (watch this for more clear understanding)
*/

receive()external payable {
    fund();
}

fallback()external payable{
    fund();
}

/*
1. Enums
2. Events
3. Try/Catch
4. Function Selectors
5.abi.encode/decode
6.Hashing
7. Yul/Assembly
*/

}
