// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;                            //Watch the video (link in Lesson3A.sol)
contract FallBackExample{
    uint256 public result;

    receive()external payable{
     result = 1;
    }

    fallback()external payable{
        result = 23;
    }

    function doSome()public{
        result = 123;
    }
}
