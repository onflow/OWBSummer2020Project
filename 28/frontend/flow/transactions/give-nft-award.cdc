import FungibleToken from 0x01
import NonFungibleToken from 0x02


transaction {

  let temporaryVault: @FungibleToken.Vault

  prepare(acct: AuthAccount) {
      let vaultRef = acct.borrow<&FungibleToken.Vault>(from: /storage/MainVault)
            ?? panic("Could not borrow owner's vault reference")
    // withdraw tokens from the buyers Vault
    self.temporaryVault <- vaultRef.withdraw(amount: 1.0)
  }

  execute {
    let recipient = getAccount(0x03)
    let collectionRef = recipient.getCapability(/public/NFTReceiver)!
                               .borrow<&{NonFungibleToken.NFTReceiver}>()
                                                        ?? panic("Could not borrow receiver reference")
    NonFungibleToken.purchase(recipient: collectionRef, buyTokens: <-self.temporaryVault)
  }
}