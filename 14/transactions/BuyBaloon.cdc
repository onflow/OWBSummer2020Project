// Transaction1.cdc
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

transaction {
  prepare(acct: AuthAccount) {
    let flowVault = acct.borrow<&{FlowToken.Receiver, FlowToken.Provider, FlowToken.Balance}>(from: /storage/FlowVault)
            ?? panic("Could not borrow a reference to the owner's vault")
    let baloonVault = acct.borrow<&{BaloonToken.Receiver, BaloonToken.Provider, BaloonToken.Balance}>(from: /storage/BaloonVault)
            ?? panic("Could not borrow a reference to the owner's vault")

    let dexAccount = getAccount(0xf3fcd2c1a78f5eee)
    let dexRef =  dexAccount.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")

    dexRef.XToY(
      from: <- flowVault.withdraw(amount: UFix64(1)),
      to:baloonVault
    )
  }
}
 