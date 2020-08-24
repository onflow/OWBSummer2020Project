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

    // Create a new Sale object, 
    // initializing it with the reference to the owner's vault
    let dex <- Dex.createDex(
      x: <- flowVault.withdraw(amount: UFix64(50)),
      y: <- baloonVault.withdraw(amount: UFix64(50))
    )

    dex.XToY(
      from: <- flowVault.withdraw(amount: UFix64(1)),
      to:baloonVault
    )
    // dex.YToX(from:1, to:flowVault)
    acct.save<@Dex.Pool>(<-dex, to: /storage/DexPool)

    // Create a public capability to the sale so that others can call its methods
    acct.link<&Dex.Pool{Dex.PoolPublic}>(/public/DexPool, target: /storage/DexPool)

  }

  execute {
    // 
    // dex2 = Dex.new(10,500)
    // dex2.x_to_y(1)
    // dex2.y_to_x(50)
  }

  post {

  }
}
 