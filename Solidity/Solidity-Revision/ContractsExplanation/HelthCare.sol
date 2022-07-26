// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Healthcare {

    address internal doctor;
    uint internal patient_ID = 0;
   

    struct Patient {
        uint id;
        address addr;
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
    mapping(address => bool) internal hasReg;

    Patient[] internal patientArray;

    constructor () {
        doctor = msg.sender;
    }


    function addPatient(  string memory _name, uint _age,string memory _sex  )  external  {
        require(hasReg[msg.sender] == false , "Already Registered");
        patientToAdd[msg.sender].addr = msg.sender;
        patientToAdd[msg.sender].name = _name;
        patientToAdd[msg.sender].age = _age;
        patientToAdd[msg.sender].sex = _sex;
        patientArray.push(patientToAdd[msg.sender]);
        patientMap[msg.sender] = patient_ID;
        hasReg[msg.sender] = true;
        patient_ID++;
    }
    
    function deletePatient(uint _index) external{  //we have to pass the id of the patient in this 
        require(msg.sender == doctor , "Only Doctors can delete Patients");
        delete patientArray[_index];
    }

    
   function updatePatient(string memory _name, uint _age,string memory _sex) external {
    patientArray[patientMap[msg.sender]].name = _name;
    patientArray[patientMap[msg.sender]].age = _age;
    patientArray[patientMap[msg.sender]].sex = _sex;

   }

    function  addToDocsArr(string memory _docName , string memory _docHash) external {
        require(msg.sender == patientArray[patientMap[msg.sender]].addr , "Register First Or Cant Add other's File" );
        patientArray[patientMap[msg.sender]].docs.push(PatientDocument(_docName , _docHash));
      
    }   

    function deleteDocs(uint _index) external {
        require(msg.sender == patientArray[patientMap[msg.sender]].addr , "You can,t DELETE other's file" );
        patientArray[patientMap[msg.sender]].docs[_index] = patientArray[patientMap[msg.sender]].docs[patientArray[patientMap[msg.sender]].docs.length -1];
        patientArray[patientMap[msg.sender]].docs.pop();
    }    
   
    function getPatientsInfo() public view returns(Patient[] memory) {
        return patientArray;
    }

    function getDocsInfo() public view returns(PatientDocument[] memory) {
     require(msg.sender == patientArray[patientMap[msg.sender]].addr , "Register First" );  
        return patientArray[patientMap[msg.sender]].docs;
    }

    function getId() public view returns(uint) {
     require(msg.sender == patientArray[patientMap[msg.sender]].addr , "Register First" );  
        return patientArray[patientMap[msg.sender]].id;
    }


    
}
