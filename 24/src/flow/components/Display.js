import React, { useEffect } from "react"
import * as fcl from "@onflow/fcl"
import * as sdk from "@onflow/sdk"
import { generateCode,getEthereumID } from '../utils/utility.js'
import displayNFTs from '../contracts/displayNFTs.cdc'
import '../../App.css'



export const getFlowId = async (props) => {

    console.log("address :", props.flowAddress);

    const code = await generateCode(displayNFTs, {
        query: /(0x01|0x02|TOKEN_ID)/g,
        "0x01": localStorage.getItem('CREATURE_CONTRACT_ADDRESS'),
        "0x02": props.flowAddress,
        "TOKEN_ID": getEthereumID( props.selectedNftId ),
    });

    console.log("code :" , code)

    const response = await fcl.send([
         sdk.script`${code}`,
    ]);


    let ans = await fcl.decode(response);
    console.log("flow id is : ", ans);
    if(ans == 0){
        console.log("Something is wrong!")
    }

    props.setFlowId(ans)
};

export default function Display(props){

    useEffect(() => {
      if(props.minted){
        if(props.flowId){

        }else{
            getFlowId(props)
        }
      }

    }, [props.minted])

    const doItAgain = async () => {
      setTimeout(()=>{
        localStorage.removeItem("CURRENT_USER")
        window.location.reload()
      },1)
    }

    return (
      <div>
       {(props.flowId) &&
            <div className="minted">
                <div className="minted-heading">It’s done!</div>
                <div className="minted-txt">Congrats, you now own an NFT on the Flow blockchain.</div>
              <div className="remint-btn" onClick={() => { doItAgain(); }}><span className="remint-btn-txt">Do It Again</span></div>
            </div>
       }
      </div>
    )

}
