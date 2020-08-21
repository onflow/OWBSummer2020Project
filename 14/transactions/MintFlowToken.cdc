
// MintFlowToken

import FlowToken from 0x01cf0e2f2f715450

// This transaction configures an account to store and receive tokens defined by
// the FlowToken contract.

// This transaction mints tokens and deposits them into account 2's vault
transaction {


  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiverRef: &FlowToken.Vault{FlowToken.Receiver}

  prepare(acct: AuthAccount) {
    // Get the public account object for account 0x02
    let recipient = acct
    
    // Get the public receiver capability
    let cap = recipient.getCapability(/public/FlowReceiver)!

    // Borrow a reference from the capability
    self.receiverRef = cap.borrow<&FlowToken.Vault{FlowToken.Receiver}>()
            ?? panic("Could not borrow a reference to the receiver")
}

  execute {
      FlowToken.testMintTokens(amount: UFix64(1000), recipient: self.receiverRef)
      log("1000 tokens minted and deposited to account 0x02")
  }
}