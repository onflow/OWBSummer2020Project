// setup/create_auction_collection.cdc
// *************************
// This transaction creates an empty Auction Collection for the signer
// and publishes a capability to the collection in storage

import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction {

    prepare(signer: AuthAccount) {

        // create a new OrbitalAuction AuctionCollection resource
        let auction <- OrbitalAuction.createAuctionCollection()

        // store the AuctionCollection resource in the account for storage
        signer.save(<-auction, to: /storage/OrbitalAuction)

        // create a public capability to the AuctionCollection so that others
        // can call it's public methods
        signer.link<&{OrbitalAuction.AuctionPublic}>(
            /public/OrbitalAuction,
            target: /storage/OrbitalAuction
        )

        log("Auction Collection and public capability created.")
    }
}
 