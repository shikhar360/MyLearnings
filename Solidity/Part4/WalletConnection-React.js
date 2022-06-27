import React from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
 const [currentAccount , setCurrentAccount] = React.useState('');
  
  
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
      }else{
        console.log("Please make account on Meatmask")
      }

      
    }catch(err){
      console.log('err');
    }
  }

  const connectWallet = async() => {  // if the wallet is comnected then request the account

    const {ethereum} = window;

    if(ethereum){

      const accounts  = await ethereum.request({method: "eth_requestAccounts"});  //method given by  metamask check metamask docs
      connsole.log("connected" , accounts[0]);
      setCurrentAccount(accounts[0]);
    }else{
      alert('Bro please get metamask yrr')
    }
    
  }

  
  React.useEffect(()=>{
    metamaskChecking();
  },[])
 
  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am Shikhar and I worked on self-driving cars so that's pretty cool right? Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
         {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
