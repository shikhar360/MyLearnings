//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

contract Voting{

address internal electionCommissioner;

struct Candidate{
  string name ;
  string electionSymbol ;
  uint voteCount;
}

Candidate[] candidates;

mapping(address => bool)  hasVoted;

event VotedAddress(address);

constructor(){
 electionCommissioner = msg.sender ;
}

function addCandidate(string memory _name , string memory _symbolUrl ) external onlyElectionCommissioner {
  candidates.push(Candidate(_name , _symbolUrl ,  0));
}


function vote(uint _index )external{
  require( hasVoted[msg.sender] == false , "Already Voted");
  hasVoted[msg.sender] = true;
  candidates[_index].voteCount ++;
  emit VotedAddress(msg.sender);
}

function getCandidate() external view returns(Candidate[] memory){
  return candidates;
}

function totalVotes(uint _index)internal view returns(uint){
return candidates[_index].voteCount ;
}



function disqualifyCandidate(uint _index) external onlyElectionCommissioner {
  candidates[_index] = candidates[candidates.length - 1];
  candidates.pop();
}


modifier onlyElectionCommissioner(){
  require(msg.sender == electionCommissioner , "You are Not Commissioner");
  _;
}

}
