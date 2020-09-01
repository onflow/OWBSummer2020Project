import TopShot from 0x179b6b1cb6755e31
import Autograph from 0xf3fcd2c1a78f5eee

// This transaction is how a TopShot + Autograph user would transfer
// an autograph from a moment in their account to their account

// Parameters:
//
// momentID: The id of the moment to detach autograph
// autographID: The id of the autograph to be detached from the moment

transaction(momentID: UInt64, autographID: UInt64) {
    prepare(acct: AuthAccount) {
        // borrow a reference to the owner's collection
        let collectionRefTopShot = acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow a reference to the stored TopShot collection")

        // borrow a reference to the owner's collection
        let collectionRefAutograph = acct.borrow<&Autograph.Collection>(from: /storage/AutographCollection)
            ?? panic("Could not borrow a reference to the stored Autograph collection")

        // Withdraw the autograph from the moment
        let autograph <- collectionRefTopShot.withdrawAutograph(momentID: momentID, autographID: autographID)

        // deposit the NFT
        collectionRefAutograph.deposit(token: <-autograph)
    }
}
 