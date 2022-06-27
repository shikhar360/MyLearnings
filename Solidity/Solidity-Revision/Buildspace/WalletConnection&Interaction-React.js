import React from "react";
import { ethers } from "ethers";
import './App.css';
import {abi} from './utils/waveportal.js';

export default function App() {
 const [currentAccount , setCurrentAccount] = React.useState('');
 // const contractAddress = "0x4f576ABe589F99EfB90E20f12c1946709546d1BF"; // pass address as a string

 const [allWaves , setAllWaves] = React.useState([]); 
  console.log(allWaves);
  const contractAddress = "0xA61dEC478053E7508Fa5b2516Ed172f4dcEE4008";
  
  const contractABI = abi;

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // check the wallet is authorize or not
  const metamaskChecking =async ()=>{    //check if the wallet is connected or not
    try{
      
    const {ethereum} = window;
    if(!ethereum){
      console.log('Please install Metamask');
    }else{
      console.log("Yay you hav Metamask Installed" , ethereum)
    }

      const accounts = await ethereum.request({method: "eth_accounts"})
      
      if(accounts.length !== 0){
        const account = accounts[0];
        console.log(`Your authorize account is ${account}`);
        setCurrentAccount(account)
        getWaves();
      }else{
        console.log("Please make account on Meatmask")
      }


      
      
    }catch(err){
      console.log('err');
    }
  }
///////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // CONNECT WALLET
  const connectWallet = async() => {  // if the wallet is comnected then request the account

    const {ethereum} = window;

    if(ethereum){

      const accounts  = await ethereum.request({method: "eth_requestAccounts"});
      connsole.log("connected" , accounts[0]);
      setCurrentAccount(accounts[0]);
    }else{
      alert('Bro please get metamask yrr')
    }
    
  }

 React.useEffect(()=>{
    metamaskChecking();
  },[])
 

  /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // TO RUN THE WAVE FUNCTION
  
  const wave = async ()=>{
    try{
      
    const {ethereum} = window;
    if(ethereum){
      const provider = new ethers.providers.Web3Provider(ethereum); //provider will be new not awaits  
      const signer = provider.getSigner(); //signer dont need await and new

      const contract = new ethers.Contract(contractAddress , contractABI , signer);

      let count = await contract.getTotalWavesCount();  //when we are reading it make it a ""let"" variable else make it a const when signing a tnx
      console.log("Retrieved total wave count...", count.toNumber());

      const waveTnx = await contract.wave("this will be message");   //start mining 
      console.log("Mining...", waveTnx.hash);
      
      await waveTnx.wait()                     //wait till the mining ends   
      console.log("Mined...", waveTnx.hash);

       count = await contract.getTotalWavesCount();
       console.log("Retrieved total wave count...", count.toNumber());
    }else{
      console.log("Contract object doesnt exits")
    }
      
    }catch(err){
      console.log(err)
    }
  }

// /////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  // Get the ARRAYS OF WAVES

 const getWaves = async ()=>{
   try{
     const {ethereum} = window;      //to check if the metamask is present or not
     if (ethereum){  //if its present we need 3 things (signer provider and contract)
     const provider = new ethers.providers.Web3Provider(ethereum);
       const signer = provider.getSigner();
       // again contract need 3 things (address abi and the signer)
       const contract = new ethers.Contract(contractAddress , contractABI , signer);

       //this is how we are interacting with the contract to the 
       const waves  = await contract.getWaves() ;

       let wavesCleaned = [];
       waves.forEach(wave =>{
         wavesCleaned.push({
           address: wave.waver,
           timestamp:new Date(wave.timestamp * 1000),
           message:wave.message
         })
       })

       setAllWaves(wavesCleaned);
          
     }else{
        console.log("Ethereum object doesn't exist!");
     }
   }catch(err){
     console.log(err);
   }
 }
  
 function inputed(e){
   console.log(e.target.value);
 }
  //we have not set it to send customize message yet
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Shikhar and I am based in India , Loving Buildspace soo far , Looking forward to work in it also.
        </div>
         <input className='inputarea' onChange={inputed} type='text'/> 
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
       
         {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        
        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
