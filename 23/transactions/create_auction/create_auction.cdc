// create_auction/create_auction.cdc
// *************************
// This transaction takes an epochCount UInt64 and an
// epochLengthInBlocks UInt64 and creates a new Auction
// for the signer using a DemoToken Vault and Rock Collection
// for bid currency and prizes
//
// The signer must already have a Rock Collection and Orbital
// Auction Collection in storage

import DemoToken from 0x179b6b1cb6755e31
import NonFungibleToken from 0x01cf0e2f2f715450
import Rocks from 0xf3fcd2c1a78f5eee
import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(epochCount: UInt64, epochLengthInBlocks: UInt64) {

    prepare(signer: AuthAccount) {

        let orbitalRef = signer.borrow<&OrbitalAuction.AuctionCollection>(from: /storage/OrbitalAuction)!
        
        let collectionRef = signer.borrow<&NonFungibleToken.Collection>(from: /storage/RockCollection)!

        let tokenIDs = collectionRef.getIDs()

        let tempCollection <- Rocks.createEmptyCollection()

        for id in collectionRef.getIDs() {
            let token <- collectionRef.withdraw(withdrawID: id)
            tempCollection.deposit(token: <-token)
        }

        let vault <- DemoToken.createEmptyVault()

        // create a new auction in the auction collection
        orbitalRef.createNewAuction(
            totalEpochs: epochCount,
            epochLengthInBlocks: epochLengthInBlocks,
            vault: <-vault,
            prizes: <-tempCollection
        )
    }
}
 