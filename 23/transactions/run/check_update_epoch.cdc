// run/check_update_epoch.cdc
// *************************
// This transaction must be run by the Auction Admin
//
// This transaction takes an auctionID UInt64 and calls
// a method that checks whether the curent Epoch has
// expired. It is used to advance the auction to the
// end for our project demonstration

import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(auctionID: UInt64) {

    let auctionAdminRef: &{OrbitalAuction.AuctionAdmin}

    prepare(account: AuthAccount) {
        
        // Borrow a reference to the AuctionAdmin interface from the signer's storage
        self.auctionAdminRef = account.borrow<&{OrbitalAuction.AuctionAdmin}>(from: /storage/OrbitalAuction)!
    }

    execute {

        // Run the checkIsNextEpoch method on the Auction
        self.auctionAdminRef.checkIsNextEpoch(auctionID)
    }
}