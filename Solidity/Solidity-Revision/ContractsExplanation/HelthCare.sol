// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Healthcare {

    address public admin;
    uint internal patient_ID = 0;
    

    struct Patient {
        uint id;
        string name;
        uint age;
        string sex;
        PatientDocument[] docs;
    }
    
    struct  PatientDocument{
        string docName;
        string hash ;
    }
    
   
    mapping(address => Patient) internal patientToAdd;
    mapping(address => uint) internal patientMap;

    Patient[] public patientArray;

    constructor () {
        admin = msg.sender;
    }


    function addPatient(  string memory _name, uint _age,string memory _sex  )  public  {

        patientToAdd[msg.sender].name = _name;
        patientToAdd[msg.sender].age = _age;
        patientToAdd[msg.sender].sex = _sex;
        patientArray.push(patientToAdd[msg.sender]);
        patientMap[msg.sender] = patient_ID;

        patient_ID++;
    }
    
  

    function  addToDocsArr(string memory _docName , string memory _docHash) public {
        patientArray[patientMap[msg.sender]].docs.push(PatientDocument(_docName , _docHash));
      
    }   
        
   
    function getPatientsInfo() public view returns(Patient[] memory) {
        return patientArray;
    }

    function getDocsInfo() public view returns(PatientDocument[] memory) {
        return patientArray[patientMap[msg.sender]].docs;
    }


    
}
