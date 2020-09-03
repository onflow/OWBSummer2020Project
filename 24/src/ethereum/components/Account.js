import React, { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import Web3Modal from "web3modal"
import { usePoller } from "../hooks"
import WalletConnectProvider from "@walletconnect/web3-provider"
import '../../App.css'
import x from '../../assets/x.svg'


const INFURA_ID = "433699ddb2194574a686098d5596dc4a"  // MY INFURA_ID, SWAP IN YOURS!
const web3Modal = new Web3Modal({
  //network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: INFURA_ID
      }
    }
  }
});

//


export default function Account(props) {


  const pollInjectedProvider = async ()=>{
    if(props.injectedProvider){
      let accounts = await props.injectedProvider.listAccounts()
      if(accounts && accounts[0] && accounts[0] != props.account){
        //console.log("ADDRESS: ",accounts[0])
        if(typeof props.setAddress == "function") props.setAddress(accounts[0])
      }
    }
  }
  usePoller(()=>{pollInjectedProvider()},props.pollTime?props.pollTime:1999)



  const loadWeb3Modal = async ()=>{
    const provider = await web3Modal.connect();
    //console.log("GOT CACHED PROVIDER FROM WEB3 MODAL",provider)
    props.setInjectedProvider(new ethers.providers.Web3Provider(provider))
  }


const logoutOfWeb3Modal = async ()=>{
  const clear = await web3Modal.clearCachedProvider();
  console.log("cleared")
  //console.log("Cleared cache provider!?!",clear)
  setTimeout(()=>{
    window.location.reload()
  },1)
}




  const change = async () => {
    const clear = await web3Modal.clearCachedProvider()
    await loadWeb3Modal()
  }



  let modalButtons = []
  if (web3Modal.cachedProvider) {
     modalButtons.push(
      <></>)
    //<div className="connect-wallet-btn" onClick={logoutOfWeb3Modal}><span className="connect-wallet-btn-text">logout</span></div>
  }else{
    modalButtons.push(
      <>
      <div className="connect-wallet-heading">Connect to an Ethereum wallet</div>
      <div className="connect-wallet-btn" onClick={loadWeb3Modal}><span className="connect-wallet-btn-text">Connect</span></div>
      </>
    )
  }



  React.useEffect(async () => {
    if (web3Modal.cachedProvider) {
      loadWeb3Modal()
    }
  }, []);


 // change account basically renders etherum address in ethereum address frame and it allows user to change address on clicking 'x'
  let changeAccount = []
  if( props.sentToEscrow ){
    changeAccount.push(
      <></>
    )
  }else if( props.nftSelected ){
      changeAccount.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="address-frame-with-nft">
               <span className="close" onClick={logoutOfWeb3Modal}><img src={x} className="" alt="logo" /></span>
            </div>
          </div>
        </div>
      )
  }else if( props.address ){
    changeAccount.push(
      <div className="converter">
        <div className="converter-eth">
          <div className="address-frame-eth" >
             <span className="close" onClick={logoutOfWeb3Modal}><img src={x} className="" alt="logo" /></span>
          </div>
        </div>
      </div>
    )
  }else{
    changeAccount.push(
      <></>
    )
  }






  return (
    <div>
      {changeAccount}
      {(!props.address) &&
        <div className="connect-wallet">
         {modalButtons}
        </div>
      }
    </div>
  );
}
