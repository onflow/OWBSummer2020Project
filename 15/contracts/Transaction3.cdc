// Transaction3.cdc

import ForgeVault from 0x02

// This transaction configures a user's account
// to use the NFT contract by creating a new empty collection,
// storing it in their account storage, and publishing a capability
transaction {
    prepare(acct: AuthAccount) {

        // Create a new empty collection
        let collection <- ForgeVault.createEmptyCollection()

        // store the empty NFT Collection in account storage
        acct.save<@ForgeVault.Collection>(<-collection, to: /storage/ForgeVault)

        log("Collection created for account 1")

        // create a public capability for the Collection
        acct.link<&{ForgeVault.FVReceiver}>(/public/FVReceiver, target: /storage/ForgeVault)

        log("Capability created")
    }
}