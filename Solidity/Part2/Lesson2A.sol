// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

// everytime we do some tracsaction there are some transaction Feilds ::
// Nonce:tx count for the account
// Gas Price:price per unit of gas(in wei)
// Gas Limit:max gas that this tx can use
// To:address that the tx is sent to
// Value:amount of wei to send
// Data:what to send to the To address
// v,r,s:components of tx signature●

import "./PriceConverter.sol";             //You Need to change Lesson2B.sol name to "./PriceConverter.sol" file to make it compatible


contract FundMe{

using PriceConverter for uint256;

uint256 public minimumUsd = 50 * 1e18; 
address[] public funders;
mapping(address => uint256) public addressToAmountFunded;
address public owner;

constructor(){
    owner = msg.sender;
}








// --------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
//                                       IMPORTANT STUFFS

//  ---- HOW TO MAKE A LIBRARY---------
// Library is similar to contracts but we cant send ethers and declare state in libraries


// by using the libraries we can convert this 
//  require(getConversionRate(msg.value) >= minimumUsd , "Aur Bhejo BE");
//  into this 
//   require (msg.value.getConversionRate() >= minimumUsd);




//To do this we have to do few things ----

//A-- Make a new PRICECONVERTOR.SOL file and move three functions into it 
//1  getPrice         2 getVersion              3getConversionRate




//B--  Change the view from PUBLIC to INTERNAL (visibility)




//C--  Import that contract  and attach using

//   using PriceConverter for uint256;    //see the first line under contract fundMe{}






// --------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------




            function fund()public payable{   //the first thing to do in order to make any contract payable with eth wei etc is to write the PAYABLE function
            

            // After using the payable keyword we can access the value ttribute by using the GLOBAL KEYWORD msg.value
            //  msg.value;
            // In case we Require to set a minimum contract value to be send we can use 






           // require(getConversionRate(msg.value) >= minimumUsd , "Aur Bhejo BE"); // if we set the minimum sending value to 1eth = 1e18 == 1 * 10**18(10tothepowerof18) == 1000000000000000000 (wei )
            // in the above statement if the first section is failed then the second section will be executed i.e "Aur bhejo BE"
            
            // ------- AFTER USING LIBRARY----

                 require(msg.value.getConversionRate() >= minimumUsd , "Aur Bhejo BE");
             
             
            // If there were 2 arguments in the getConversionRate then we will do this

            //   require(msg.value.getConversionRate(secondArgument) >= minimumUsd , "Aur Bhejo BE");






            // In other Words it is REVERTING
            // It means undo any action before and send the remaining gas(yes we spended some gas and after undo the remaining will be returned)





            
            //   require(msg.value >= minimumUsd , "Aur Bhejo BE"); // here the msg.value is in the form of ethereum (setted in terms of eth) 
            //  The Smart contract does not knw what usd is(not connected to external datas) if we are setting the MINIMUM AMOUNT of $50 to fund.
            // thats where oracle comes into play
              

          funders.push(msg.sender); //like (msg.value) msg.sender is also a Global KEYWORD will contain address whoevercalls  the function i.e(fund function here)  (basically it will have sender's address) 
          addressToAmountFunded[msg.sender] = msg.value;


            }  




 //smart contracts can hold funds like our wallets






 function withdraw()public onlyOwner{
        for(uint256 funderIndex=0 ; funderIndex > funders.length ; funderIndex++){
            address funder = funders[funderIndex] ;
            addressToAmountFunded[funder] = 0;
        }
    // resetting the array
    funders = new address[](0);

    // actually withdrawing

    // //    we can do withdrawing by 3 wayys 
    
    // // 1 Transfer     
    // payable(msg.sender).transfer(address(this).balance);

    // //2 send 
    // bool isSended = payable(msg.sender).send(address(this).balance);
    // require(isSended , "Sended Failed")  //it is like ternary operator

    // 3 call  ( didn't understood it as of now)

    (bool callSuccess,) =payable(msg.sender).call{value:address(this).balance}("");
    require(callSuccess,"Call failed");

    }




//----------------------------------------------------------------------
// There is a small issue with the Withdraw :::: Anyone can Withdraw it

//For that we have to create constructor like this
//            constructor(){
//           owner = msg.sender;
//            }
// and use 👇
// require(msg.sender == owner , "Sender is owner");   --- in the withdraw function 

// but this will overpopulate if there are more function that needs the same line thats where MODIFIER comes into play

//    MODIFIERS is gonna be KEYWORD that we use in the function declaration to modify it with the functionality
//---------------------------------------------------------------------------------------




   modifier onlyOwner{
       require(msg.sender == owner , "Sender is not owner");   // 👈this line
       _;    // this means before you read the rest of the code first CHECK the above line then (underscore i.e (_;) means) read the REST OF THE CODE
       
                // now you need to put onlyOwner after the (visibility keyword)
                // ALSO ORDER OF THE CODE SHOULD ALWAYS BE THIS OTHERWISE IT WILL DO VICE-VERSA.
   }
   
 

}
