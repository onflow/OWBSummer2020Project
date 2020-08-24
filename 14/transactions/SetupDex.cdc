// Transaction1.cdc
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

transaction {
  prepare(acct: AuthAccount) {
    // Borrow a reference to the stored Vault
    let flowVault = acct.borrow<&{FlowToken.Receiver, FlowToken.Provider, FlowToken.Balance}>(from: /storage/FlowVault)
            ?? panic("Could not borrow a reference to the owner's vault")
    let baloonVault = acct.borrow<&{BaloonToken.Receiver, BaloonToken.Provider, BaloonToken.Balance}>(from: /storage/BaloonVault)
            ?? panic("Could not borrow a reference to the owner's vault")

    // Create a new Dex object, 
    // initializing it with the references to the owner's token vault pair
    let dex <- Dex.createDex(
      x: <- flowVault.withdraw(amount: UFix64(100)),
      y: <- baloonVault.withdraw(amount: UFix64(100))
    )

    // Example of exchanging tokens
    // dex.XToY(
    //   from: <- flowVault.withdraw(amount: UFix64(1)),
    //   to:baloonVault
    // )
    // dex.YToX(from:1, to:flowVault)
    acct.save<@Dex.Pool>(<-dex, to: /storage/DexPool)

    // Create a public capability to the sale so that others can call its methods
    acct.link<&Dex.Pool{Dex.PoolPublic}>(/public/DexPool, target: /storage/DexPool)

  }

  execute {
  }

  post {

  }
}
 