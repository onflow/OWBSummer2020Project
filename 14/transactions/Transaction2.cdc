// Transaction1.cdc

import BaloonToken from 0x02

// This transaction creates the followings
// At prepare
// - Create empty vault
// - Set capability of each account into receiverRef
// At execute
// - Mint token to each user (1,2,3,40) tokens

transaction {
  // Local variable for storing the reference to the minter resource
  let mintingRef: &BaloonToken.VaultMinter

  // Local variable for storing the reference to the Vault of
  // the account that will receive the newly minted tokens
  var receiverRef: [&BaloonToken.Vault{BaloonToken.Receiver}]

  prepare(first: AuthAccount, second:AuthAccount, third:AuthAccount, forth: AuthAccount) {

    // Create a link to the Vault in storage that is restricted to the
    // fields and functions in `Receiver` and `Balance` interfaces, 
    // this only exposes the balance field 
    // and deposit function of the underlying vault.
    //
    // Set minting ref
    log("Set minting Ref")
    self.mintingRef = second.borrow<&BaloonToken.VaultMinter>
                                 (from: /storage/BaloonMinter)
                                        ?? panic("Could not borrow a reference to the minter")
		self.receiverRef = []

    log("Empty Vault stored")
    var array = [first, third, forth]
    for element  in array {
      let vault <- BaloonToken.createEmptyVault()
      element.save<@BaloonToken.Vault>(<-vault, to: /storage/BaloonVault)
    }
    array.insert(at:0, second)
    for element in array {
      log(element)
      // Link each account
      element.link<&BaloonToken.Vault{BaloonToken.Receiver, BaloonToken.Balance}>(/public/BaloonReceiver, target: /storage/BaloonVault)
      // set

      let recipient = getAccount(element.address)
      let cap = recipient.getCapability(/public/BaloonReceiver)!
      // Borrow a reference from the capability
      self.receiverRef.append( cap.borrow<&BaloonToken.Vault{BaloonToken.Receiver, BaloonToken.Balance}>()
            ?? panic("Could not borrow a reference to the receiver"))
    }
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
    getAccount(0x01).getCapability(/public/BaloonReceiver)!
                    .check<&BaloonToken.Vault{BaloonToken.Receiver}>():
                    "0x01 Vault Receiver Reference was not created correctly"
    getAccount(0x02).getCapability(/public/BaloonReceiver)!
                    .check<&BaloonToken.Vault{BaloonToken.Receiver}>():
                    "0x02 Vault Receiver Reference was not created correctly"
    getAccount(0x03).getCapability(/public/BaloonReceiver)!
                    .check<&BaloonToken.Vault{BaloonToken.Receiver}>():
                    "0x03 Vault Receiver Reference was not created correctly"
    getAccount(0x04).getCapability(/public/BaloonReceiver)!
                    .check<&BaloonToken.Vault{BaloonToken.Receiver}>():
                    "0x04 Vault Receiver Reference was not created correctly"


    }
}
