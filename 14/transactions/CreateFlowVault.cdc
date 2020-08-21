// MintFlowToken

import FlowToken from 0x01cf0e2f2f715450


// This transaction configures an account to store and receive tokens defined by
// the FlowToken contract.
transaction {
  var address: Address
  // var receiverRef: [&FlowToken.Vault{FlowToken.Receiver}]

  prepare(acct: AuthAccount) {
    self.address = acct.address
    // Create a new empty Vault object
    let vaultA <- FlowToken.createEmptyVault()
      
    // Store the vault in the account storage
    acct.save<@FlowToken.Vault>(<-vaultA, to: /storage/FlowVault)

    log("Empty Vault stored")

    // Create a public Receiver capability to the Vault
    acct.link<&FlowToken.Vault{FlowToken.Receiver, FlowToken.Balance}>(/public/FlowReceiver, target: /storage/FlowVault)

    log("References created")
  }
  // execute {

  // }

  post {
    // Check that the capabilities were created correctly
    getAccount(self.address).getCapability(/public/FlowReceiver)!
                    .check<&FlowToken.Vault{FlowToken.Receiver}>():  
                    "Vault Receiver Reference was not created correctly"
  }
}