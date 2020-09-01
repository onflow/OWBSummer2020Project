// This script checks for any auctions and logs the reference to the Auction resource
//

import OrbitalAuction from 0xe03daebed8ca0615


// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - onflow/NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - demo-token.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - auction.cdc

pub fun main(account: Address) {
    // get the accounts' public address objects
    let account = getAccount(account)

    // get the reference to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let auctionCap = account.getCapability(/public/OrbitalAuction)!

    if let auctionCollectionRef = auctionCap.borrow<&{OrbitalAuction.AuctionPublic}>() {

        let auctionInfo = auctionCollectionRef.getAuctionMeta(UInt64(1))

        // Set the auction status
        var auctionStatus = "Status: Active"
        if auctionInfo.auctionCompleted == true {
            auctionStatus = "Status: Inactive (Completed)"
        }

        // Concatenate the log output for better readability
        let auctionID = "Auction ID: ".concat(auctionInfo.auctionID.toString())
        let epochCount = "Epochs: ".concat(auctionInfo.totalEpochs.toString())
        let epochLength = "Epoch Length: ".concat(auctionInfo.epochLength.toString())
        let currentEpoch = "Current Epoch: ".concat(auctionInfo.currentEpoch.toString())

        log("********************")
        log(auctionID)
        log("********************")
        log("Auction Settings")
        log(epochCount)
        log(epochLength)
        log("********************")
        log("Auction Status")
        log(auctionStatus)
        log(currentEpoch)
        log("********************")

    } else {
        log("unable to borrow orbital auction reference")
    }
    
}
 