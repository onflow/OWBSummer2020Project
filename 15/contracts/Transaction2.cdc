// Transaction2.cdc

import ForgeVault from 0x02

// This transaction allows the Minter account to mint an NFT
// and deposit it into its collection.

transaction {

    // The reference to the collection that will be receiving the NFT
    let receiverRef: &{ForgeVault.FVReceiver}

    // The reference to the Minter resource stored in account storage
    let minterRef: &ForgeVault.zCollarMinter

    prepare(acct: AuthAccount) {
        // Get the owner's collection capability and borrow a reference
        self.receiverRef = acct.getCapability(/public/FVReceiver)!
                               .borrow<&{ForgeVault.FVReceiver}>()
                               ?? panic("Could not borrow receiver reference")
        
        // Borrow a capability for the NFTMinter in storage
        self.minterRef = acct.borrow<&ForgeVault.zCollarMinter>(from: /storage/zCollarMinter)
            ?? panic("Could not borrow minter reference")
    }

    execute {
        // Use the minter reference to mint an NFT, which deposits
        // the NFT into the collection that is sent as a parameter.
        self.minterRef.mintzCollar(recipient: self.receiverRef)

        log("NFT Minted and deposited to Account 2's Collection")
    }
}