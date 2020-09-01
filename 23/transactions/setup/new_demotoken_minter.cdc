// setup/new_demotoken_minter.cdc
// *************************
// This transaction must be signed by the DemoToken Admin.
//
// This transaction takes a UFix64 allowedAmount, creates 
// a new DemoToken minter for the DemoToken Admin and stores 
// it in account storage. It creates a private capability 
// for the Minter and links to it.

import FungibleToken from 0xee82856bf20e2aa6
import DemoToken from 0x179b6b1cb6755e31

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(allowedAmount: UFix64) {

    // reference to the DemoToken administrator
    let adminRef: &DemoToken.Administrator
    
    prepare(signer: AuthAccount) {               
        
        // borrow a reference to the Administrator resource in the signer's storage
        self.adminRef = signer.borrow<&DemoToken.Administrator>(from: /storage/DemoTokenAdmin)
                            ?? panic("Signer is not the token admin!")
        
        // create a new minter with the allowedAmount and store it in the signer's storage
        let minter <-self.adminRef.createNewMinter(allowedAmount: allowedAmount)
        signer.save<@DemoToken.Minter>(<-minter, to: /storage/DemoTokenMinter)

        // create a private capability for the new minter
        let minterRef = signer.link<&DemoToken.Minter>(
            /private/DemoTokenMinter,
            target: /storage/DemoTokenMinter
        )

        log("New DemoToken minter created")
    }
}
 