// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8;

import "./SimpleStorage.sol";


        //this is called inheritance ,(will copy all the functionality of previous contract) like when you really like the old contract and want to increase the features but dont want to copyPaste 
        // by using the IS keyword


    contract ExtraStorage is SimpleStorage{ 

        // when you want some function from the parent contract to override ..
        // You need to do 2 things with the keywords ( virtual and   override)

        //----------------------- 1st Go in the Parent Contract and write VIRTUAL keyword like this--------------
        // function store(uint256 _favoriteNumber) public virtual{
        //     favoriteNumber = _favoriteNumber;
        // }


        //--------------2nd write the OVERRIDE keyword in the child contract's same function name--------------------

        function store(uint256 _favoriteNumber) public override {
            favoriteNumber= _favoriteNumber+5;   //the Argument name and variable name should  be same as Parents Contract's argument and Variable (no TYPOS)
        }


    }
