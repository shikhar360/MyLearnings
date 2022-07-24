// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Healthcare1 {

    address public admin;
    uint internal patient_ID = 0;

    struct Patient {
        uint id;
        string name;
        uint age;
        string sex;
    PatientDocumentation[]  docs;
        
       
    }
    
    struct PatientDocumentation{
        string docName;
        string hash ;
    }
    
    mapping(address => string[]) internal patientDocs;

    mapping(address => uint) public patientMap;

    Patient[] public patientArray;

    constructor () {
        admin = msg.sender;
    }

    function addPatient(  string memory _name, uint _age,string memory _sex )  public  {

        patientArray.push( Patient( patient_ID, _name, _age, _sex , PatientDocumentation[] ));
       
       patientMap[msg.sender] = patient_ID;

        patient_ID++;
    }
    
  

    function  addToDocsArr(string memory _docName , string memory _docHash) public {
        patientArray[patientMap[msg.sender]].docs.push(PatientDocumentation(_docName , _docHash));
      
    }   
        
   
    function getPatientsInfo() public view returns(Patient[] memory) {
        return patientArray;
    }

    function getPatientsDocsInfo() public view returns(string[] memory) {
        return patientDocs[msg.sender];
    }


    
}
