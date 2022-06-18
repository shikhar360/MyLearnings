// SPDX-License-Identifier: GPL-3.0
pragma  solidity ^0.8.0;


  import "./SimpleStorage.sol";
// the ability of contract to interact with each other is called composibitlity
/// -------> TVV <-------- type visibility and variable ,,,,,, visibilty is depend on us wether to wite it or not bcause by default is public




// contract StorageFactory{
//  SimpleStorage public simpleStorage;   // like we used uint256(type) public(visibility) favouriteNumber(variable)

//    function createSimpleStorageContract()public{
//       simpleStorage = new SimpleStorage();
//   }


contract StorageFactory{
 SimpleStorage[] public simpleStorageArray;   //now we are Making the same SimpleStorage[] which is public and assigned to undefined variable simpleStorageArray




   function createSimpleStorageContract()public{  // this is creating new Contract
     SimpleStorage simpleStorage = new SimpleStorage();  // asigning new instance of SimpleStorage contract to simpleStorage variable whose type is also (SimpleStorage)
     simpleStorageArray.push(simpleStorage); 
   }



 // in order to interact with any other contract you need 2 things 
//  1 Address     2 ABI - Application Binary Interface

  function sfStore(uint256 _simpleStorageIndex  , uint256 _simpleStorageNumber) public{
     // SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];  // Tvv is applied // simpleStorage is function scoped .... it doesnt relate to simpleStorage from the above function
     // simpleStorage.store(_simpleStorageNumber);
                  
//  ------------------------------or------------------------
         
         simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    
  }


  function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
    // SimpleStorage simpleStorage = simpleStorageArray[_simpleStorageIndex];
    // return simpleStorage.retrieve();

    // ----------------------OR--------------

       return simpleStorageArray[_simpleStorageIndex].retrieve();
  }

  


}
