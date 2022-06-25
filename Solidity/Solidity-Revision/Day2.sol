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

    function _createZombie(string memory _name, uint _dna) private {
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


/*
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



require makes it so that the function will throw an error and stop executing if some condition is not true.
It works like a gaurd clause , means if the condition is true then proceede the function else throw aa error.

function sayHiToVitalik(string memory _name) public returns (string memory) {

  // (Side note: Solidity doesn't have native string comparison, so we
  // compare their keccak256 hashes to see if the strings are equal)
  
  require(keccak256(abi.encodePacked(_name)) == keccak256(abi.encodePacked("Vitalik")));     //Throws an error and exits if not true.
  
  return "Hi!";
}


Rather than making one extremely long contract, sometimes it makes sense to split your code logic across multiple contracts to organize the code.
One feature of Solidity that makes this more manageable is contract inheritance
we can use inheritance by 

contract Dog{
//some contract stuffs
}

contract BabyDog is Dog{      // by using the is keyword  
//some contract stuff
}

Splitting the contract up into multiple files to make it more manageable. This is normally how you will handle long codebases in your Solidity projects
using a import statement
import 'someotercontract.sol';

There are two locations you can store variables — in storage and in memory;
Storage refers to variables stored permanently on the blockchain.
Memory variables are temporary, and are erased between external function calls to your contract





*/
