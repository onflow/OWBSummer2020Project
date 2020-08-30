import FungibleToken from 0x01

// This transaction mints tokens and deposits them into account 2's vault
transaction {

    // Local variable for storing the reference to the minter resource
    let mintingRef: &FungibleToken.VaultMinter

    // Local variable for storing the reference to the Vault of
    // the account that will receive the newly minted tokens
    var receiverRef: &FungibleToken.Vault{FungibleToken.Receiver}

	prepare(acct: AuthAccount) {
        // Borrow a reference to the stored, private minter resource
        self.mintingRef = acct.borrow<&FungibleToken.VaultMinter>(from: /storage/MainMinter)
            ?? panic("Could not borrow a reference to the minter")

        // Get the public account object for account 0x02
        let recipient = getAccount(0x02)

        // Get their public receiver capability
        let capability = recipient.getCapability(/public/MainReceiver)!

        // Borrow a reference from the capability
        self.receiverRef = capability.borrow<&FungibleToken.Vault{FungibleToken.Receiver}>()
            ?? panic("Could not borrow a reference to the receiver")
	}

    execute {
        // Mint tokens and deposit them into the recipient's Vault
        self.mintingRef.mintTokens(amount: UFix64(AMOUNT), recipient: self.receiverRef)
    }
}
