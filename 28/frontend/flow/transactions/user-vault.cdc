import FungibleToken from 0x01

// This transaction configures an account to store and receive tokens defined by
// the FungibleToken contract.
transaction {
	prepare(acct: AuthAccount) {

    log("--------------------!")
    log("Check if account already has capability")
    log("--------------------")
    // Check if the account already has a vault
    let hasVault = acct.getCapability(/public/MainReceiver)!
                        .check<&FungibleToken.Vault{FungibleToken.Receiver}>()
    // If it does not, create one                
    if !hasVault { 
      // Create a new empty Vault object
		  let vaultA <- FungibleToken.createEmptyVault()
      // Store the vault in the account storage
		  acct.save<@FungibleToken.Vault>(<-vaultA, to: /storage/MainVault)
      log("Empty Vault stored")
      // Create a public Receiver capability to the Vault
		  let ReceiverRef = acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)
      // log("References created")
    } else {
      log("Account already has a vault set up")
    }
    


		

		

    

    

    
	}

    post {
        // Check that the capabilities were created correctly
        // getAccount(0x02).getCapability(/public/MainReceiver)!
        //                 .check<&FungibleToken.Vault{FungibleToken.Receiver}>():
        //                 "Vault Receiver Reference was not created correctly"
    }
}
