//SPDX-License-Identifier: MIT

// solhint-disable-next-line
 pragma solidity ^0.8.0; 

 import "hardhat/console.sol";

 contract Notes{

  struct Note{    //a struct(like object to storethe data)
   string title;
   string description;
  }

  address public owner;

  constructor(){
   owner = msg.sender ;
  }


  Note[] public notes; // a notes array of type Note (struct)
  
  function gettingNotes(string memory _title , string memory _description)public{
    
    notes.push(Note(_title , _description));  //push struct into array by using parenthesis
  }
   
   function getNotesArr() public view returns(Note[] memory){
  
    return notes ;
   }

  function getTotalNotes() public view returns(uint){
    return notes.length ;
  
  }


  function deleteit(uint _index)public{
    delete notes[_index];  //deletes array of certain index that we are passing.
  }

 }
