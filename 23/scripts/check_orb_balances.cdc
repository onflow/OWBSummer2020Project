// This script checks for any auctions and logs the reference to the Auction resource
//

import OrbitalAuction from 0xe03daebed8ca0615


// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - onflow/NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - demo-token.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - auction.cdc

pub fun main(auctionOwner: Address, auctionID: UInt64) {
    // get the accounts' public address objects
    let account = getAccount(auctionOwner)

    // get the reference to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let auctionCap = account.getCapability(/public/OrbitalAuction)!

    if let auctionRef = auctionCap.borrow<&{OrbitalAuction.AuctionPublic}>() {
        log(auctionRef.logAllOrbBalances(auctionID))
    } else {
        log("unable to borrow orbital auction reference")
    }
    
}
 