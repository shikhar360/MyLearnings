// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.8 ; // This is the version of solidity ^0.8.1 means any version above this is ok for this contract  




contract SimpleStorage{
    //  boolean , uint , int , address , bytes
    
   // bool isFav = true;
   // uint256 fav = 6 ; // uint8 to uint 256
   // string fav = "five";
   // int256 fav = -7; //positive + negative number also it is from int8 to int256
   // address myAddress =  ; 
   // bytes32 fav = "cat";
   
   
   

//------------------------------------------------------------------------------
//                      IMPORTANT NOTE
//  Just Like we use Const and let before declaring any variable in JS
//  Here we are doing the same thing just we are replacing let and const with the (type) of variable that we want to declare
// only exception i see till the time of writing this is that { WE ARE NOT DECLARING (TYPE)of STATE when using it in function   }  
//------------------------------------------------------------------





mapping( string => uint256) public nameToFavouriteNumber;  // this will assign value of string to uint256





  // if value doesnt setted then it will be equal to null value
  
  
  uint /*public*/ fav;  // commented because retrive does the same thing
  
  
  
   function setFav(uint256 _number )public{
    fav = _number;       //more the computation inside this funtion more the gas price will be

  }
  
  
  
  
  // view and pure are 2 functions that doesnt cost gas thats why uncoloured in compiler
  // pure function additionally disallow to read from blockchain state (any math or algo that dosnt require to read any storage)
  // calling a function is FREE unless u calling it under function that cost gas 



   function retrive()public view returns(uint256){
       return fav ;
   } 



//   to store multiple values like object we use structs 

   People public person = People({favouriteNumber :3 , name : "Shikhar"}); //we use structs tats why we are using {}


    struct People{
        uint256 favouriteNumber;
        string name;
    }
 
 
 
 
 
 
 // to store multiple objects or values we can build a array

//  uint256[] public favouriteNumberList;
           //or
 People[] public people; //currently empty (length can be as many as you want) // if People[4] it means it will have maximum length of 4
 
 
 
 
 
 
 function addPeople(string memory _name ,uint256 _favouriteNumber ) public {    // order of putting argument should be same
//    People memory newPerson = People({favouriteNumber : _favouriteNumber , name : _name});
//    People memory newPerson = People(_favouriteNumber , _name); // same as above line
//    people.push(newPerson); 

   people.push(People(_favouriteNumber , _name));        //we dont need memory keyword now


    nameToFavouriteNumber[_name] = _favouriteNumber;     //by searching name you will get fav number (mapping)
   
 }
      
      
      
      
       // EVM can store & access info in 6 places
 //    1 stack       2 memory     3 calldata    4 storage    5 code     6 logs
 
 


 // calldata and memory means information will be temorary and will be gone after refresh  

 //calldata is temporary variable that cant be modified
 // memory is temporary variable that can be modified
 // storage is permanent variable that can be modified

 // the memory and calldata can only be specified for array struct or mapping type -- when setting parameter to different functions ,
 // since string is also a array type thats why we use memory there and not on uint256

// Mapping is a Data structure (remember in js ) where a key is mapped to a single value.


}
