import TopShot from 0x179b6b1cb6755e31

// This transaction is how a TopShot + Autograph user would transfer
// an autograph from a moment in their account to another moment in their account

// Parameters:
//
// momentIDFrom: The id of the moment to detach autograph
// momentIDTo: The id of the moment to attach autograph
// autographID: The id of the autograph to be moved between moments

transaction(momentIDFrom: UInt64, momentIDTo: UInt64, autographID: UInt64) {
    prepare(acct: AuthAccount) {
        // borrow a reference to the owner's collection
        let collectionRefTopShot = acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow a reference to the stored TopShot collection")

        // Borrow a reference to the specified moment
        let moment = collectionRefTopShot.borrowMoment(id: momentIDTo)
            ?? panic("Could not borrow a reference to the specified moment")

        // Withdraw the autograph from the moment
        let autograph <- collectionRefTopShot.withdrawAutograph(momentID: momentIDFrom, autographID: autographID)

        // Deposit the autograph to the moment
        moment.depositAutograph(autograph: <-autograph)
    }
}
 