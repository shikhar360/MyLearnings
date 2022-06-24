pragma solidity >=0.5.0 <0.6.0;

contract ZombieFactory {

    uint dnaDigits= 16
    
    struct Person {         //type variable
     uint age;
     string name;
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



*/
