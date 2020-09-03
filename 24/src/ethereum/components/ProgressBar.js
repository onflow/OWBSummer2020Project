import React, { useEffect } from 'react'
import '../../App.css';
import minted from '../../assets/minted.svg'


export default function ProgressBar(props){

  useEffect(() => {

    if(props.flowId){
      document.getElementsByClassName("progress-bar")[0].id = "progress-bar-completed"
    }else if(props.sentToEscrow){
      document.getElementsByClassName("progress-bar")[0].id = "progress-bar-to-escrow"
    }else if(props.nftSelected){
       document.getElementsByClassName("progress-bar")[0].id = "progress-bar-nft-selected"
    }else if(props.ethAddress){
       // change height from top after connectting to eth
       document.getElementsByClassName("progress-bar")[0].id = "progress-bar-eth-connected"
    }else{
      document.getElementsByClassName("progress-bar")[0].id = "progress-bar-start"
    }

  }, [props.ethAddress, props.flowId, props.sentToEscrow, props.nftSelected])



  return(

    <div className="progress-bar" id="progress-bar-start">
      <div className="progress-circle completed-circle"><span className="completed-text progress-text">1</span></div>
      {(!props.ethAddress)
      ?
        <div className="progress-circle" style={{ marginLeft: 110}}><span className="progress-text">2</span></div>
      :
        <>
         <div className="line"></div>
         <div className="progress-circle completed-circle" style={{ marginLeft: 110}}><span className="completed-text progress-text">2</span></div>
        </>
      }
      {(!props.sentToEscrow)
      ?
        <>
          <div className="progress-circle" style={{ marginLeft: 220}}><span className="progress-text">3</span></div>
          <div className="progress-circle" style={{ marginLeft: 330}}><span className="progress-text">4</span></div>
        </>
      :
        <>
         <div className="line" style={{ marginLeft: 110}}></div>
         <div className="progress-circle completed-circle" style={{ marginLeft: 220}}><span className="completed-text progress-text">3</span></div>
         {(!props.flowAddress)
         ?
           <div className="progress-circle" style={{ marginLeft: 330}}><span className="progress-text">4</span></div>
         :
          <>
           <div className="line" style={{ marginLeft: 220}}></div>
           <div className="progress-circle completed-circle" style={{ marginLeft: 330}}><span className="completed-text progress-text">4</span></div>
          </>
         }
        </>
      }
      {(props.flowId) &&
        <>
          <div className="line" style={{ marginLeft: 330}}></div>
          <div className="progress-circle converted-circle" style={{ marginLeft: 440}}><span className="minted-tick"><img src={minted} className="" alt="logo" /></span></div>
        </>
      }
    </div>

  )
}
