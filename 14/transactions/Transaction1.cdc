// Transaction1.cdc

import FlowToken from 0x01cf0e2f2f715450

// This transaction creates the followings
// At prepare
// - Create empty vault
// - Set capability of each account into receiverRef
// At execute
// - Mint token to each user (1,2,3,40) tokens

transaction {
  // Local variable for storing the reference to the minter resource
  let mintingRef: &FlowToken.VaultMinter

  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiverRef: [&FlowToken.Vault{FlowToken.Receiver}]

  prepare(acct: AuthAccount) {

    // Create a link to the Vault in storage that is restricted to the
    // fields and functions in `Receiver` and `Balance` interfaces, 
    // this only exposes the balance field 
    // and deposit function of the underlying vault.
    //
    // Set minting ref
    log("Set minting Ref")
    self.mintingRef = acct.borrow<&FlowToken.VaultMinter>
                                 (from: /storage/FlowMinter)
                                        ?? panic("Could not borrow a reference to the minter")
      log("create empty Vault for FlowToken")
      let vault <- FlowToken.createEmptyVault()
      acct.save<@FlowToken.Vault>(<-vault, to: /storage/FlowVault)
      // Link each account
      element.link<&FlowToken.Vault{FlowToken.Receiver, FlowToken.Balance}>(/public/FlowReceiver, target: /storage/FlowVault)
      // set

      let recipient = getAccount(element.address)
      let cap = recipient.getCapability(/public/FlowReceiver)!
      // Borrow a reference from the capability
      self.receiverRef.append( cap.borrow<&FlowToken.Vault{FlowToken.Receiver, FlowToken.Balance}>()
            ?? panic("Could not borrow a reference to the receiver"))
  }

    execute {
      // Mint 30 tokens and deposit them into the recipient's Vault
      var tokens = [10000,10000,10000,10000]
      var a = 0
      log("Mint tokens")
      while a < tokens.length {
        log(tokens[a])
        self.mintingRef.mintTokens(amount: UFix64(tokens[a]), recipient: self.receiverRef[a])
        a = a+1;
      }
    }

  post {
    // Check that the capabilities were created correctly
    // by getting the public capability and checking 
    // that it points to a valid `Vault` object 
    // that implements the `Receiver` interface
    getAccount(0x01).getCapability(/public/FlowReceiver)!
                    .check<&FlowToken.Vault{FlowToken.Receiver}>():
                    "0x01 Vault Receiver Reference was not created correctly"
    getAccount(0x02).getCapability(/public/FlowReceiver)!
                    .check<&FlowToken.Vault{FlowToken.Receiver}>():
                    "0x02 Vault Receiver Reference was not created correctly"
    getAccount(0x03).getCapability(/public/FlowReceiver)!
                    .check<&FlowToken.Vault{FlowToken.Receiver}>():
                    "0x03 Vault Receiver Reference was not created correctly"
    getAccount(0x04).getCapability(/public/FlowReceiver)!
                    .check<&FlowToken.Vault{FlowToken.Receiver}>():
                    "0x04 Vault Receiver Reference was not created correctly"


    }
}
 