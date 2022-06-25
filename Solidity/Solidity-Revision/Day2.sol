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
        emit NewZombie(id, _name, _dna);
    } 

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

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

*/
