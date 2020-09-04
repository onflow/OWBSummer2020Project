import React, { useState, useEffect, useRef } from 'react'
import * as fcl from "@onflow/fcl"
import Address from './Address.js'
import x from '../../assets/x.svg'
import link  from '../../assets/link.svg'


const FIRST_NAMES = ['Herbie', 'Sprinkles', 'Boris', 'Dave', 'Randy', 'Captain']
const LAST_NAMES = ['Starbelly', 'Fisherton', 'McCoy']



export default function ConverterFrame(props){

  const [frame,setFrame] = useState()

  const changeView = async () => {
    let temp = []

    const name = "" + FIRST_NAMES[props.selectedNftId % FIRST_NAMES.length] + " " + LAST_NAMES[props.selectedNftId % LAST_NAMES.length]

    if( props.flowId ){

      // step - 6, nft minted on flow
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id="converter-frame-eth">
              <img className="pic" src ={"https://storage.googleapis.com/opensea-prod.appspot.com/creature/"+ props.selectedNftId +".png"}/>
            </div>
            <div className="nft-info" id="nft-info-faded">{name} #{props.selectedNftId}</div>
            <div className="eth">Ethereum</div>
            <div className="address-frame-with-nft">
               <span className="address-text"><Address address={props.ethAddress}/></span>
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
          <div className="converter-flow">
           <div className="converter-frame" id="converter-frame-flow">
             <img className="pic" src ={"https://storage.googleapis.com/opensea-prod.appspot.com/creature/"+ props.selectedNftId +".png"}/>
           </div>
           <div className="nft-info" id="">{name} #{props.flowId}</div>
           <div className="flow">Flow</div>
           <div className="address-frame-with-nft">
             <span className="address-text"><Address address={props.flowAddress}/></span>
             {/* <span className="close"><img src={x} className="" alt="logo" /></span> */}
           </div>
          </div>
        </div>
      )

    }else if( props.flowAddress && props.sentToEscrow  ){

      // NOTE: (props.flowAddress && props.sentToEscrow) because blocto stores the flow address in localStorage

      // setp - 5, connected to flow, asked to convert NFT
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id="converter-frame-shifted">
              <img className="pic" src ={"https://storage.googleapis.com/opensea-prod.appspot.com/creature/"+ props.selectedNftId +".png"}/>
            </div>
            <div className="nft-info" id="">{name} #{props.selectedNftId}</div>
            <div className="eth">Ethereum</div>
            <div className="address-frame-with-nft">
               <span className="address-text"><Address address={props.ethAddress}/></span>
               {/* <span className="close"><img src={x} className="" alt="logo" /></span> */}
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
          <div className="converter-flow">
           <div className="converter-frame" id="converter-frame-shifted">
            <div className="frame-text-flow">Flow</div>
           </div>
           <div className="address-frame-flow">
             <span className="address-text"><Address address={props.flowAddress}/></span>
             <span className="close" onClick={() => { fcl.unauthenticate(); }}><img src={x} className="" alt="logo" /></span>
           </div>
          </div>
        </div>
      )

    }else if( props.sentToEscrow ){

      // step - 4 NFT sent to escrow, user logs into flow
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id="converter-frame-shifted">
              <img className="pic" src ={"https://storage.googleapis.com/opensea-prod.appspot.com/creature/"+ props.selectedNftId +".png"}/>
            </div>
            <div className="nft-info" id="">{name} #{props.selectedNftId}</div>
            <div className="eth">Ethereum</div>
            <div className="address-frame-with-nft">
               <span className="address-text"><Address address={props.ethAddress}/></span>
               {/* <span className="close"><img src={x} className="" alt="logo" /></span> */}
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
        <div className="converter-flow">
          <div className="converter-frame" id="converter-frame-shifted">
            <div className="frame-text-flow">Flow</div>
          </div>
          </div>
        </div>
      )

    }else if( props.nftSelected ){

      // step 3 - user selects NFT. send to escrow
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id="converter-frame-highlighted">
              <img className="pic" src ={"https://storage.googleapis.com/opensea-prod.appspot.com/creature/"+ props.selectedNftId +".png"}/>
            </div>
            <div className="nft-info" id="nft-info-highlighted">{name} #{props.selectedNftId}</div>
            <div className="eth">Ethereum</div>
            <div className="address-frame-with-nft" >
               <span className="address-text"><Address address={props.ethAddress}/></span>
               {/* <span className="close"><img src={x} className="" alt="logo" /></span> */}
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
        <div className="converter-flow">
          <div className="converter-frame" id="converter-frame-shifted">
            <div className="frame-text-flow">Flow</div>
          </div>
          </div>
        </div>
      )

    }else if( props.ethAddress ){

      //  step 2 - connected to Ethereum
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id=""><div className="frame-text-eth">Ethereum</div></div>
            <div className="address-frame-eth">
               <span className="address-text"><Address address={props.ethAddress}/></span>
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
        <div className="converter-flow">
          <div className="converter-frame" id="">
            <div className="frame-text-flow">Flow</div>
          </div>
          </div>
        </div>
      )

    }else{

      // step 1 - connect to ethereum
      temp.push(
        <div className="converter">
          <div className="converter-eth">
            <div className="converter-frame" id="">
             <div className="frame-text-eth">Ethereum</div>
            </div>
          </div>
          <span className="link"><img src={link} className="" alt="logo" /></span>
          <div className="converter-flow">
            <div className="converter-frame" id="">
              <div className="frame-text-flow">Flow</div>
            </div>
          </div>
        </div>
      )

    }

    setFrame(frame => [...temp])
  }

  useEffect(() => {

     changeView()

  }, [ props.flowId, props.flowAddress, props.sentToEscrow, props.selectedNftId, props.ethAddress])


  return(
    <div>
      {frame}
    </div>
  )
}
