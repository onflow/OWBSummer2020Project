// payout/payout_orbs.cdc
// *************************
// This transaction must be run by the Auction Admin.
//
// This transaction takes an auctionID UInt64 and pays
// out the prizes and tokens owned by each Orb to it's
// owner if the Auction has completed.

import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(auctionID: UInt64) {

    let auctionAdminRef: &{OrbitalAuction.AuctionAdmin}

    prepare(account: AuthAccount) {

        // Borrow a reference to the AuctionAdmin interface in the signer's account storage
        self.auctionAdminRef = account.borrow<&{OrbitalAuction.AuctionAdmin}>(from: /storage/OrbitalAuction)!
    }

    execute {

        // Pay out the Orbs for the Auction
        self.auctionAdminRef.payoutOrbs(auctionID)
    }
}