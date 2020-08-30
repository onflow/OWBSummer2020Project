import FungibleToken from 0x01
import NonFungibleToken from 0x02


transaction {
    prepare(acct: AuthAccount) {
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
            log("References created")
        } else {
            log("Account already has a vault set up")
        }

        // Check if the account already has a collection
        let hasCollection = acct.getCapability(/public/NFTReceiver)!.check<&{NonFungibleToken.NFTReceiver}>()
        if !hasCollection {
            // Create a new empty collection
            let collection <- NonFungibleToken.createEmptyCollection()
            // store the empty NFT Collection in account storage
            acct.save<@NonFungibleToken.Collection>(<-collection, to: /storage/NFTCollection)

            log("Collection created for account 1")

            // create a public capability for the Collection
            acct.link<&{NonFungibleToken.NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

            log("Capability created")
        }
    }
}