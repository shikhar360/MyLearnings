// SPDX-License-Identifier: Unlicense

import "./JobBoard.sol";

pragma solidity ^ 0.8.0;

contract ApplicantBoard {

// want the job board to approve it( should choose the applicants from the array )
uint internal applicantID = 0;



struct ApplicantDetail{
    string name;
    string addressofApplicant;
    string location;
    string[] techStack;
    uint pastExperience;
    uint id ;
}




ApplicantDetail[] internal applicantsArr;

mapping(address => ApplicantDetail) internal applicantDetails;
mapping(address => bool) internal hasApplied ;
mapping(ApplicantDetail => Job) internal appliedFor;

JobBoard internal jobBoardContract;

constructor(address _contractAddress){
jobBoardContract = JobBoard(_contractAddress);
}




function addApplicant(string memory _name , string memory _address , string memory _location , string[] memory _stack , uint _exp  ) internal{
 require( hasApplied[msg.sender] == false , "Already Registered Click on Update Profile ");
  applicantsArr.push(ApplicantDetail(_name , _address , _location , _stack , _exp , applicantID) );
  applicantDetails[msg.sender] = applicantsArr[applicantID];
  hasApplied[msg.sender] = true;
  applicantID ++ ;
}

function submitJobReq( uint _jobIndex) internal {
    require( hasApplied[msg.sender] == true , "Add Your profile First ");
    string[] jobsArray = jobBoardContract.getJobs();
    applicantDetails[msg.sender] = jobsArray[_jobIndex];
}

// Time to get Something



}
