// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;                       // some rituals


contract Voting{

address public electionCommissioner;               // it is basically the owner 

struct Candidate{                                // Here we are setting up the Candidate that we are going to add in the future.. 
  string name ;                                   // We are taking 3 parameters here in which 2 will be comming from the outside and one will be untouched
  string electionSymbol ;
  uint voteCount;
}

Candidate[] internal candidates;               // Here we have made the array of type - Candidate and named that variable candidates       
                                               // Also we will be using it inside this contract thats why put its visibility as Internal
                                               
mapping(address => bool) internal hasVoted;    // associating Address to a boolean to check wether if the voter has voted or not
mapping(address => string) internal votedTo;    // to whom the voter has voted
event VotedAddress(address);
 
 address[] internal voterList;                 // I Added this because was unable to render the emited event on the frontend but now know to to do that

constructor(){
 electionCommissioner = msg.sender ;          // setting the owner
}

function addCandidate(string memory _name , string memory _symbolUrl ) external onlyElectionCommissioner {
  candidates.push(Candidate(_name , _symbolUrl ,  0));                                                             //only commissioner can add the candidates
}


function vote(uint _index )external{                           // Here we will get index of candidate whom the voter had voted to ; from the frontend
  require( hasVoted[msg.sender] == false , "Already Voted");    // checking if he has voted already or not
  hasVoted[msg.sender] = true;                                  // if he has not voted than associate the address to a bool ; that he has voted now
  votedTo[msg.sender] = candidates[_index].name;                // to get the name of candidate that the voter has voted
  candidates[_index].voteCount ++;                             // increasing the votecount of the candidate
  voterList.push(msg.sender);                                  // pushing the address to the voter List
  emit VotedAddress(msg.sender);
}

function getVotedTo(address _addr) external view returns(string memory){            // Simple function to get the name of the candidate  
return votedTo[_addr];
}

function getCandidate() external view returns(Candidate[] memory){             // to get the candidate array
  return candidates;
}

function getVoterList()external view returns(address[] memory){               // function to get the voterList array
  return voterList;

}
function totalVotes(uint _index)internal view returns(uint){        // function created but got never used because we are able to get data from cadidfates array
return candidates[_index].voteCount ;                                 // You can SKIP this function
}



function disqualifyCandidate(uint _index) external onlyElectionCommissioner {   // A function to delete the Candidate if he caught in Bad activities
  candidates[_index] = candidates[candidates.length - 1];                   // assignin the last position of array to the current  position
  candidates.pop();                                                      // pop-ing the last item from the array 
}


modifier onlyElectionCommissioner(){                                         // modifiers are basically used as a Gaurd Clause like in any other language
  require(msg.sender == electionCommissioner , "You are Not Commissioner");   // Gaurd clause are basically helper functions
  _;
}

}
