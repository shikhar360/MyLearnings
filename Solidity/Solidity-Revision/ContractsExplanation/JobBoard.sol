// SPDX-License-Identifier: Unlicense

pragma solidity ^ 0.8.0;

contract JobBoard {
    address public boardOwner;
    uint256 public jobID = 0;


    constructor(){
        boardOwner = msg.sender;
    }    
    
    struct Job {
        uint id ;
        string title;
        string companyName;
        string description;
        string employmentType;
        string location;
        uint salary;
        string contactEmail;
    }

    Job[] public jobsArray;
  
    mapping (address => Job ) internal associatedJob ;

    function addJob(
        
        string memory _title,
        string memory _companyName,
        string memory _description,
        string memory _employmentType,
        string memory _location,
        uint _salary,
        string memory _contactEmail
    )
    public {
        jobsArray.push(
            Job( jobID , 
             _title,
            _companyName, 
            _description, 
            _employmentType, 
            _location, 
            _salary, 
            _contactEmail)
        );
        jobID++;
    }



    function getJobs() public view returns(Job[] memory) {
        return jobsArray;
    }

    function getAllJobsLength() public view returns(uint) {
        return jobsArray.length;
    }
    
    // function recruitingApplicant()
}
