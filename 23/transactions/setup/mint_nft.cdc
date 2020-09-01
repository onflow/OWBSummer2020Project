// setup/mint_nft.cdc
// *************************
// This transaction must be signed by the Rocks NonFungibleToken Admin
// with a valid Rock Minter in account storage
//
// This transaction takes a receiver address, mints a new Rock and deposits
// it in the receiver's Rock Collection. The receiver must already have a 
// Rock Collection in account storage.

import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0x01cf0e2f2f715450
import DemoToken from 0x179b6b1cb6755e31
import Rocks from 0xf3fcd2c1a78f5eee

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(receiver: Address){

    // private reference to this account's minter resource
    let minterRef: &Rocks.NFTMinter
    
    prepare(signer: AuthAccount) {
        
        // borrow a reference to the NFTMinter in storage
        self.minterRef = signer.borrow<&Rocks.NFTMinter>(from: /storage/RockMinter)
                            ?? panic("Could not borrow owner's vault minter reference")
        
    }

    execute {
        
        // Get the recipient's public account object
        let recipient = getAccount(receiver)

        // get the collection reference for the receiver
        // getting the public capability and borrowing the reference from it
        let receiverCap = recipient.getCapability(/public/RockCollection)!

        let receiverRef = receiverCap.borrow<&{NonFungibleToken.CollectionPublic}>()
                            ?? panic("unable to borrow nft receiver reference")

        // mint an NFT and deposit it in the receiver's collection
        self.minterRef.mintNFT(recipient: receiverRef)
    }
}
 