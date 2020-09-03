import React, { useState, useEffect, useRef } from 'react'
import { ethers } from "ethers"
import '../../App.css'
const ESCROW="0x556B0560205E62c3F690d86C775138d1f9911FA3"




export default function Escrow(props) {


   const transferToEscrow = async () => {

     if(props.selectedNftId){

       console.log("Transfer request of NFT with ethereum token ID: ", props.selectedNftId);

        // In case we want to store flow address on ethereum escrow contract too
        //const response = await writeContracts['Creature']["safeTransferFrom(address,address,uint256,bytes)"](props.address, ESCROW, new ethers.utils.BigNumber(props.selectedNftId.toString()), "OPTIONAL")

        const response = await props.writeContracts['Creature'].safeTransferFrom(props.address, ESCROW,new ethers.utils.BigNumber(props.selectedNftId.toString()) );
        console.log("NFT Transfer done to escrow:", response);
        props.setSentToEscrow(true);

      }else{
        console.log("NFT not selected")
      }
   }

   // change position of instruction text
   useEffect(() =>{
    if(props.address){

      if(props.nftSelected){
        document.getElementsByClassName("inst")[0].id = "inst-nft-selected";
      }else{
        document.getElementsByClassName("inst")[0].id = "";
      }
    }

   }, [props.nftSelected, props.selectedNftId])


   return (
     <div>
      { (props.address) && (!props.sentToEscrow) &&

        <div className="inst" id="">
          <div className="inst-heading">Select an NFT</div>
          <div className="inst-text">We will put your NFT to an escrow contract. Notice that you will not be able to withdraw NFT after the conversion.</div>
          {props.nftSelected &&
            <div className="transfer-escrow" onClick={transferToEscrow}><span className="transfer-escrow-text">Got it, Continue</span></div>
          }
        </div>
      }
     </div>
   )

}
