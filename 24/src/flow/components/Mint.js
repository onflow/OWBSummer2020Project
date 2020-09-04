import React from "react"
import { sendTransaction } from "../utils/send-transaction"
import { generateCode, getEthereumID } from "../utils/utility.js"
import mintNFT from "../contracts/mintNFT.cdc"
import '../../App.css'
import loader from '../../assets/loader.svg'



const mintOnFlow = async (props) => {


  console.log("Mint to address :", props.flowAddress)
  console.log("TokenID : ", props.selectedNftId)
  console.log("Contract address : ", localStorage.getItem('CREATURE_CONTRACT_ADDRESS'))
  console.log("started minting....")

  const code = await generateCode(mintNFT, {
      query: /(0x01|0x02|TOKEN_ID)/g,
      "0x01": localStorage.getItem('CREATURE_CONTRACT_ADDRESS'),
      "0x02": props.flowAddress,
      "TOKEN_ID": getEthereumID( props.selectedNftId ),
  });

  const tx = await sendTransaction( localStorage.getItem('CREATURE_CONTRACT_ADDRESS') , code);
  console.log("Minting token completed : ", { tx });

};


export default function Mint(props){

    const startMinting = async () => {

      props.setMinting(true)
      setTimeout(async()=>{
        const response = await mintOnFlow(props)
        console.log("mint completed : ", response)
        props.setMinted(true)
      },1)
    }

    return (
      <div>
       {(props.flowAddress) && (props.sentToEscrow) && (!props.flowId) &&
        <div className="convert">
        <div className="convert-txt">Now convert your NFT</div>
         {(!props.minting)
          ?
            <div className="convert-btn" onClick={startMinting}><div className="convert-btn-txt">Start</div></div>
          :
          <>
            <div className="convert-btn convert-btn-clicked"><div className="convert-btn-txt">Start</div></div>
            <div className="loader">
              <span className="loader-gif"><img src={loader} className="" alt="logo" /></span>
              <div className="loader-text">Converting...</div>
            </div>
          </>
         }
         </div>
       }
      </div>
    )

}
