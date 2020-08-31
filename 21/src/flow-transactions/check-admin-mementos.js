import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const checkAdminMementos  = async (address) => {
    const response = await fcl.send([
      sdk.script`
      import FanCoin from 0xe03daebed8ca0615
      import Toke from 0xf3fcd2c1a78f5eee

      pub fun main(): {UInt32:String} {
                let acct = getAccount(0x${address})
                let acctRef = acct.getCapability(/public/TokePublic)!
                                           .borrow<&{Toke.AdminPublic}>()!               
                return acctRef.listMementos()
      }
      `,
      sdk.args([]),
    ]);
    return fcl.decode(response);
  };