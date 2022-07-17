pragma solidity >=0.5.0 <0.6.0;

contract ZombieFactory {
    
     event NewZombie(uint zombieId , string name , uint dna);       // Here in event we dont use underscore and memory keyword // it also has a emit function
    
    uint dnaDigits= 16
    
    struct Person {         //type variable
     uint age;
     string name;
    }
    
     Zombie[] public zombies;   
 //created array of structs  using this syntax , zombie struct will be pushed in a array called zombies 
                              // OR
 //type of Array is Zombie Struct whose variable name is zombies
 
 
     
     function /*createZombie*/ _createZombies (string memory _name, uint _dna) /*public*/ private {       //Remove public with private and change the naming convention
     
      //  Zombie adam = Zombie(_name , _dna);         // Zombie adam is a struct which is makinga a new zombie with the name and dna that is passing from the arguments
      //  zombies.push(adam);                          // here we are pushing the same zombie in a array

       // zombies.push(Zombie(_name , _dna)) ;           // here we are doing it all the things in a one line
       
       
       uint id = zombies.push(Zombie(_name , _dna))-1;    
        emit NewZombie( id , _name , _dna );
    }
    
     function _generateRandomDna (string memory _str )private view returns(uint){
      uint rand = uint(keccak256(abi.encodePacked(_str)));     // typecasting a whole string that we are getting from a keccak256 into a uint and saving it into a uint called rand
      return rand % dnaModulus;
    }
    
    function createRandomZombie(string memory _name)public{
      uint randDna = _generateRandomDna(_name);
       _createZombie(_name , randDna);
    }
}

/*
State variables are permanently stored in contract storage. This means they're
written to the Ethereum blockchain. Think of them like writing to a DB.
(TVV Format)[Type , Visibility , Variable]
uint is (unsigned integer) means NON-NEGATIVE opposite of int(can be posiitive and negative)
Structs allow you to create more complicated data types that have multiple properties.
They are useful for grouping together related data.
It can be declared outside of a contract and imported in another contract
Arrays
Two types:
FIXED ARRAYS
uint[2] fixedArray;   // Array with a fixed length of 2 elements:
string[5] stringArray;   // another fixed Array, can contain 5 strings:
DYNYNAMIC ARRAYS
uint[] dynamicArray;    // a dynamic Array - has no fixed size, can keep growing:
 -----Memory Keyword is required for all reference types such as arrays, structs, mappings, and strings. Even while returning from a function-----
 
 
While writing a function in solidity. 

There are two ways in which you can pass an argument to a Solidity function:


By value, which means that the Solidity compiler creates a new copy of the parameter's value and passes it to your function. This allows your
function to modify the value without worrying that the value of the initial parameter gets changed.
By reference, which means that your function is called with a... reference to the original variable. Thus, if your
function changes the value of the variable it receives, the value of the original variable gets changed.


--Functions are public by default--

Make functions private always and only make it public when you really want it to be public

private function names has a convention of starting with an underscore (_).

When the function doesn't actually change state in Solidity we could declare it as a view function.

we can also mark a function pure when it is not accessing any data from the contract i.e depends on the arguments for returning any value.


keccak256 is a hash function .
A hash function basically maps an input into a random 256-bit hexadecimal number . keccak256 expects a single parameter of type bytes
this means we have to wrap every argument into (" ") . It is a built in function.


A example of typecast , means certain type of variable is not compatible with another type of variable which belongs to the same category .
uint8 a = 5;
uint b = 6;
// throws an error because a * b returns a uint, not uint8:
uint8 c = a * b;
// we have to typecast b as a uint8 to make it work:
uint8 c = a * uint8(b);



Events are a way for your contract to communicate that something happened on the blockchain to your app front-end,
which can be 'listening' for certain events and take action when they happen.

This has 2 things 1st the event keyword that is present in the contract after the states declared,
and the other thing is (emit) that is in the function which is waiting for something to happen so that it could emmit the message 
*/
