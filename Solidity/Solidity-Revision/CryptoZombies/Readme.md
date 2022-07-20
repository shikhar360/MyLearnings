## This is A cryptoZombies folder

#### //---------------------
# Clipboard ::

Re-entrancy is a recursive contract bug that can occur depending on the order of transfers and state variable updates. It is an infamous bug for causing the DAO Hack.
The turmoil over which introduced the DAO Hard Fork which split Ethereum into two active networks: Ethereum and Ethereum Classic. We'll dive into this security concern 
in detail in a later challenge.

<br/>
<br/>


~ ! ~ Difference between address and address payable types is that address payable has the methods .transfer and .send.

<br/>
<br/>
~!~ selfdestruct(msg.sender);

The address provided to the selfdestruct function gets all of the ether remaining in the contract! Ether sent to the payable constructor will be refunded to
the final caller of the tick function. 
 
 <br/>
<br/>
 <br/>
 
 Two ways to storing a reference to another contract!
 
 ```solidity
 import "./OtherContract.sol";
 
contract Example {
	OtherContract public anotherContract;
  
	constructor(address _address) {
		anotherContract = OtherContract(_address);
	}
  
	function getPrice(uint tokenId) external view returns(uint) {
		return anotherContractt.getPrice(tokenId);
	}
}
```
#### Or

```solidity
import "./OtherContract.sol";

contract Example {
	address public contractAddress;
	constructor(address _x) {
		contractAddress = _x;
	}
  
	function getPrice(uint tokenId) external view returns(uint) {
		return OtherContract(contractAddress).getPrice(tokenId);
	}
}
```
<br/>
<br/>

~ ! ~ We can use Interface like :

```solidity

//-----------------
// In OtherFile or|| we can look at the Level3.sol file for interface

interface Token {
	function transfer(address recipient, uint256 amount) external returns (bool);        
 
 // this interface accepts 2 args
}
//------------------


import "./Token.sol";
import "hardhat/console.sol";

contract Example {

	function makeTransfer(address tokenAddress) public {

    Token token = Token(tokenAddress);   //Token type of (`token` variable) is initiated with the TokenContractAddress    
    
		// transfer 100 of the token 
		// from this contract to the msg.sender
    
		bool success = token.transfer(msg.sender, 100);
    
		// was the transfer successful?
		console.log(success);
	}
}
```
<br/>
<br/>

`` (uint a , uint b , uint c) = scores();`` is same like object destructuring 

#### //-----------------------
