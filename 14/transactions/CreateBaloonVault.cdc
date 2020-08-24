import BaloonToken from 0x179b6b1cb6755e31

// This transaction configures an account to store and receive tokens defined by
// the BaloonToken contract.
transaction {
  var address: Address
  // var receiverRef: [&BaloonToken.Vault{BaloonToken.Receiver}]

  prepare(acct: AuthAccount) {
    self.address = acct.address
    // Create a new empty Vault object
    let vaultA <- BaloonToken.createEmptyVault()
      
    // Store the vault in the account storage
    acct.save<@BaloonToken.Vault>(<-vaultA, to: /storage/BaloonVault)

    log("Empty Vault stored")

    // Create a public Receiver capability to the Vault
    acct.link<&BaloonToken.Vault{BaloonToken.Receiver, BaloonToken.Balance}>(/public/BaloonReceiver, target: /storage/BaloonVault)

    log("References created")
  }
  // execute {

  // }

  post {
    // Check that the capabilities were created correctly
    getAccount(self.address).getCapability(/public/BaloonReceiver)!
                    .check<&BaloonToken.Vault{BaloonToken.Receiver}>():  
                    "Vault Receiver Reference was not created correctly"
  }
}