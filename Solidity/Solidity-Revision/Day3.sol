//File!.sol

pragma solidity >=0.5.0 <0.6.0;

import "./ownable.sol";                       //imported openzeplin contract.


contract ZombieFactory is Ownable {            // Inheritance added

    event NewZombie(uint zombieId, string name, uint dna);

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 1 days;                                   //added

    struct Zombie {
        string name;
        uint dna;
        uint32 level;            //special variant of uint added to save the gas
        uint32 readyTime;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;

    function _createZombie(string memory _name, uint _dna) internal {
        uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTime))) - 1;   //added
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender]++;
        emit NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint) {
        uint rand = uint(keccak256(abi.encodePacked(_str)));
        return rand % dnaModulus;
    }

    function createRandomZombie(string memory _name) public {
        require(ownerZombieCount[msg.sender] == 0);
        uint randDna = _generateRandomDna(_name);
        randDna = randDna - randDna % 100;
        _createZombie(_name, randDna);
    }

}










///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//File2.sol

pragma solidity >=0.5.0 <0.6.0;

import "./zombiefactory.sol";

contract KittyInterface {
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
  );
}

contract ZombieFeeding is ZombieFactory {

  
  KittyInterface kittyContract;

// onlyOwner modifier has been seeted in the function
  function setKittyContractAddress(address _address) external onlyOwner {             // instead of hardcoading we set it in a function
   kittyContract = KittyInterface(_address);
  }

  function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    if (keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
      newDna = newDna - newDna % 100 + 99;
    }
    _createZombie("NoName", newDna);
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    feedAndMultiply(_zombieId, kittyDna, "kitty");
  }

}
//---------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------------------------------


/*
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Notes
------------------------------------------------------

After you deploy a contract to Ethereum, it’s immutable, which means that it can never be modified or updated again.
This is one reason security is such a huge concern in Solidity. If there's a flaw in your contract code, there's no way for you to patch it later.

So if we hardCode a value it will be impossible to changeit in future , thats why we need some functions that can change the key part (dynamic things) 
of contract that could be change when needed in future.

OWNABLE CONTRACT
Ownable — meaning they have an owner (you) who has special privileges to chnage some parts in the contract.
When you want some function to call by the owner itself it will be a ownable contract 

CONSTRUCTOR
constructor() is a constructor, which is an optional special function that has the same name as the contract.
It will get executed only one time, when the contract is first created.

Function Modifiers:
modifier onlyOwner(). Modifiers are kind of half-functions that are used to modify other functions,
usually to check some requirements prior to execution. In this case, onlyOwner can be used to limit access so only the owner of the\
contract can run this function

Struct Packing To Save GAS
Normally there's no benefit to using these sub-types because Solidity reserves 256 bits of storage regardless of the uint size.
For example, using uint8 instead of uint (uint256) won't save you any gas , but if write the type in struct it will make a difference

EXAMPLE------
struct NormalStruct {
  uint a;
  uint b;
  uint c;
}

struct MiniMe {
  uint32 a;
  uint32 b;
  uint c;
}

// `mini` will cost less gas than `normal` because of struct packing
NormalStruct normal = NormalStruct(10, 20, 30);
MiniMe mini = MiniMe(10, 20, 30); 






*/
