import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const checkCustomerNFT  = async (address,mementoID) => {
    const response = await fcl.send([
      sdk.script`
      import FanCoin from 0xe03daebed8ca0615
      import Toke from 0xf3fcd2c1a78f5eee
      
      pub fun main(): {UInt64:UInt64} {
              let acct = getAccount(0x${address})
              let receiverRef = acct.getCapability(/public/TokeCollection)!.borrow<&{Toke.MementoCollectionPublic}>()
                  ?? panic("Cannot borrow a reference to the recipient's moment collection")
                     
              let nft = receiverRef.borrowMemento(id: UInt64(${mementoID}))
      
              return {UInt64(${mementoID}):nft!.fanPoints}
      }
      `,
      sdk.args([]),
    ]);
    return fcl.decode(response);
  };