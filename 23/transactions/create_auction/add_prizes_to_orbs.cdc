// create_auction/add_prizes_to_orbs.cdc
// *************************
// This transaction must be signed by the Auction Admin
//
// This transaction takes an auctionID UInt64, withdraws
// all of the Rocks from the signer's Rock Collection,
// deposits them into a temporary Collection and adds them
// to the Auction as prizes

import DemoToken from 0x179b6b1cb6755e31
import NonFungibleToken from 0x01cf0e2f2f715450
import Rocks from 0xf3fcd2c1a78f5eee
import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(auctionID: UInt64) {

    prepare(signer: AuthAccount) {

        // Borrow a reference to the signer's Orbital Auction Admin interface
        let orbitalRef = signer.borrow<&{OrbitalAuction.AuctionAdmin}>(from: /storage/OrbitalAuction)!
        
        // Borrow a reference to the signer's Rock Collection
        let collectionRef = signer.borrow<&NonFungibleToken.Collection>(from: /storage/RockCollection)!

        // Create an empty Rock Collection
        let tempCollection <- Rocks.createEmptyCollection()

        // For each token ID in the signer's Collection...
        for id in collectionRef.getIDs() {

            // ...withdraw the NFT ID from the Collection
            let token <- collectionRef.withdraw(withdrawID: id)

            // ...deposit the NFT into the temporary Collection
            tempCollection.deposit(token: <-token)
        }
        
        // Add the Rock Collection to the Auction
        orbitalRef.addPrizeCollectionToAuction(auctionID, collection: <-tempCollection)        
    }
}
 