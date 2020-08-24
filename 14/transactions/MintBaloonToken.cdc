
// MintBaloonToken

import BaloonToken from 0x179b6b1cb6755e31

// This transaction configures an account to store and receive tokens defined by
// the BaloonToken contract.

// This transaction mints tokens and deposits them into account 2's vault
transaction {


  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiverRef: &BaloonToken.Vault{BaloonToken.Receiver}

  prepare(acct: AuthAccount) {
    // Get the public account object for account 0x02
    let recipient = acct
    
    // Get the public receiver capability
    let cap = recipient.getCapability(/public/BaloonReceiver)!

    // Borrow a reference from the capability
    self.receiverRef = cap.borrow<&BaloonToken.Vault{BaloonToken.Receiver}>()
            ?? panic("Could not borrow a reference to the receiver")
}

  execute {
      BaloonToken.testMintTokens(amount: UFix64(1000), recipient: self.receiverRef)
      log("1000 tokens minted and deposited to account 0x02")
  }
}