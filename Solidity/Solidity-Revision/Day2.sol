pragma solidity >=0.5.0 <0.6.0;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    mapping(uint => address) public zombieToOwner;           // more about this in comments
    mapping(address=> uint)  ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) /*private*/ internal {    //made this a internal visibility so that other contracts can call this function
        uint id = zombies.push(Zombie(_name, _dna)) - 1;
         zombieToOwner[id] = msg.sender;                    //mapping zombieToOwner is called
        ownerZombieCount[msg.sender]++;                     //increasing the count of ownerZombieCount  
        emit NewZombie(id, _name, _dna);
    } 

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
    require(ownerZombieCount[msg.sender] == 0);    // using require statement so that the owner should not have more than one zombies
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}


contract ZombieFeeding is ZombieFactory{

}

//now we have made 2 files and will import  the above ZombieFactory contract; 

/*

///////////////////////////////////////////////////////////////////////////////////////////////////////////
NOTES
///////////////////////////////////////////////////////////////////////////////////////////////////////////
MAPPINGS
Mappings is the another way of storing data it is different from arrays in array we have to store data in a sequential way but in mapping
we could associate any value to any type of key

mapping (address => uint) public accountBalance;

We can write mapping likee this in which one type is associated to the other type

contract something{
mapping(uint=> name) public rollToName;

function acssociate(uint256 _roll , string memory _name)public{
rollToName[_roll] = _name;
}

}

msg.sender and many others are global variables that are available to all functions.


REQUIRE
require makes it so that the function will throw an error and stop executing if some condition is not true.
It works like a gaurd clause , means if the condition is true then proceede the function else throw aa error.

function sayHiToVitalik(string memory _name) public returns (string memory) {

  // (Side note: Solidity doesn't have native string comparison, so we
  // compare their keccak256 hashes to see if the strings are equal)
  
  require(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked("Vitalik")));     //Throws an error and exits if not true.
  
  return "Hi!";
}

INHERITANCE
Rather than making one extremely long contract, sometimes it makes sense to split your code logic across multiple contracts to organize the code.
One feature of Solidity that makes this more manageable is contract inheritance
we can use inheritance by 

contract Dog{
//some contract stuffs
}

contract BabyDog is Dog{      // by using the is keyword  
//some contract stuff
}

IMPORT
Splitting the contract up into multiple files to make it more manageable. This is normally how you will handle long codebases in your Solidity projects
using a import statement
import 'someotercontract.sol';


STORAGE AND MEMORY
There are two locations you can store variables — in storage and in memory;
Storage refers to variables stored permanently on the blockchain.
Memory variables are temporary, and are erased between external function calls to your contract


Internal and External
In addition to public and private, Solidity has two more types of visibility for functions: internal and external.
internal is the same as private, except that it's also accessible to contracts that inherit from this contract.
external is similar to public, except that these functions can ONLY be called outside the contract — they can't be called by other functions inside that contract.


INTERFACES
For our contract to talk to another contract on the blockchain that we don't own, first we need to define an interface.
Lets suppose this is a contract on blockchain
contract LuckyNumber {
  mapping(address => uint) numbers;

  function setNum(uint _num) public {
    numbers[msg.sender] = _num;
  }

  function getNum(address _myAddress) public view returns (uint) {
    return numbers[_myAddress];
  }
}

and we want to access the getnum function then First we'd have to define an interface of the LuckyNumber contract by
contract NumberInterface {         //also we dont have any state variable
  function getNum(address _myAddress) public view returns (uint);      //notice we dont have curly braces here , by this way compiler will know its a interface
}

function someFunction() public {
    uint num = numberContract.getNum(msg.sender);  //this is how we use it
  
  }







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/



//File2.sol

pragma solidity >=0.5.0 <0.6.0;

import "./zombiefactory.sol";

contract KittyInterface{                                  // This is how we create interfaces  more in the notes above
    function getKitty(uint256 _id) external view returns (
    bool isGestating,
    bool isReady,
    uint256 cooldownIndex,
    uint256 nextActionAt,
    uint256 siringWithId,
    uint256 birthTime,
    uint256 matronId,
    uint256 sireId,
    uint256 generation,
    uint256 genes
);                        //we dont use curly braces in the interface , it is similar to a contract
}

contract ZombieFeeding is ZombieFactory {                    // this contract is using the interface
address ckAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d;
                                                                     // in order to use the interface we first have to initialize that inside another Contract
   KittyInterface kittyContract = KittyInterface(ckAddress);

 function feedAndMultiply(uint _zombieId, uint _targetDna , string memory _species /* _species added*/ ) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    
    if(keecak256(abi.encodePacked(_species)) == keecak256(abi.encodePacked("kitty"))){        // if statement in solidity works same  as JS
      newDna = newDna - newDna % 100 + 99;  
    }
    
    _createZombie("NoName" , newDna);
  }

 function feedOnKitty(uint _zombieId , uint _kittyId)public{
     uint kittyDna;
      (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);    // lots of commas because getkitty function returns total 10 values , so to excess the last one 
    
      // feedAndMultiply(_zombieId , kittyDna);
      
      feedAndMultiply(_zombieId, kittyDna , "kitty");  //updated because above feed and multiply updated
  }


}


