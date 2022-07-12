//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract Voting{

address public electionCommissioner;

struct Candidate{
  string name ;
  uint voteCount;
}

Candidate[] candidates;

mapping(address => bool) public hasVoted;


constructor(){
 electionCommissioner = msg.sender ;
}

function addCandidate(string memory _name ) public onlyElectionCommissioner {
  candidates.push(Candidate(_name , 0));
}


function vote(uint _index )public{
  require( hasVoted[msg.sender] == false , "Already Voted");
  hasVoted[msg.sender] = true;
  candidates[_index].voteCount ++;
  
}

function getCandidate() external view returns(Candidate[] memory){
  return candidates;
}

function totalVotes(uint _index)public view returns(uint){
return candidates[_index].voteCount ;
}

function disqualifyCandidate(uint _index) public onlyElectionCommissioner {
  candidates[_index] = candidates[candidates.length - 1];
  candidates.pop();
}


modifier onlyElectionCommissioner(){
  require(msg.sender == electionCommissioner , "You are Not Commissioner BC");
  _;
}

}
