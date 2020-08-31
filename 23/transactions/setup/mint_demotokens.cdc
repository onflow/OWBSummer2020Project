// setup/mint_demotokens.cdc
// *************************
// This transaction must be signed by the DemoToken Admin
// with a valid DemoToken Minter in account storage
//
// This transaction takes a receiver address and a UFix64 amount
// and mints the provided amount of tokens to the receiver's
// DemoToken Vault. The receiver must already have a DemoToken
// Vault in account storage

import FungibleToken from 0xee82856bf20e2aa6
import DemoToken from 0x179b6b1cb6755e31

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(receiver: Address, amount: UFix64) {

    // public Vault reciever references for both accounts
    let vaultReceiver: &{FungibleToken.Receiver}

    let minterRef: &DemoToken.Minter
    
    prepare(signer: AuthAccount) {

        // get the public object for Account 2
        let receiver = getAccount(receiver)

        // retreive the public vault references for both accounts
        self.vaultReceiver = receiver.getCapability(/public/DemoTokenReceiver)!
                                     .borrow<&{FungibleToken.Receiver}>()
                                        ?? panic("Could not borrow owner's vault reference")

        let minterCap = signer.getCapability(/private/DemoTokenMinter)!

        // get the stored Minter reference from account 2
        self.minterRef = signer.borrow<&DemoToken.Minter>(from: /storage/DemoTokenMinter)
            ?? panic("Could not borrow owner's vault minter reference")
    }

    execute {

        // mint tokens for both accounts
        self.vaultReceiver.deposit(from: <-self.minterRef.mintTokens(amount: UFix64(amount)))
        log("Minted new DemoTokens")
    }
}
 