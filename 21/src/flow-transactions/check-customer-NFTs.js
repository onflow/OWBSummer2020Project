import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const checkCustomerNFTs  = async (address) => {
    const response = await fcl.send([
      sdk.script`
      import FanCoin from 0xe03daebed8ca0615
      import Toke from 0xf3fcd2c1a78f5eee

      pub fun main(): [UInt64] {
                let acct = getAccount(0x${address})
                let acctRef = acct.getCapability(/public/TokeCollection)!.borrow<&{Toke.MementoCollectionPublic}>()!
                return acctRef.listNFTs()
      }
      `,
      sdk.args([]),
    ]);
    return fcl.decode(response);
  };