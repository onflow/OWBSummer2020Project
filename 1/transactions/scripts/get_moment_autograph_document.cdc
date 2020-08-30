import TopShot from 0x179b6b1cb6755e31

// This script gets the document associated with a autograph
// in a moment by looking up its ID and then searching
// for that autograph's document in the Autograph contract

// Paramters
// account: The Flow Address of the account whose moment autograph data needs to be read
// momentID: The unique ID for the momenent whose autograph needs to be read
// autographID: The unique ID for the autograph whose data needs to be read
//
// Returns: String of the specified autograph document

pub fun main(account: Address, momentID: UInt64, autographID: UInt64): String {

    // get the public capability for the owner's moment collection
    // and borrow a reference to it
    let collectionRef = getAccount(account).getCapability(/public/MomentCollection)!
        .borrow<&{TopShot.MomentCollectionPublic}>()
        ?? panic("Could not get public moment collection reference")

    // Borrow a reference to the specified moment
    let moment = collectionRef.borrowMoment(id: momentID)
        ?? panic("Could not borrow a reference to the specified moment")

    // Borrow a reference to the specified autograph
    let autograph = moment.borrowAutograph(autographID: autographID)
        ?? panic("Could not borrow a reference to the specified autograph")

    // Get the autograph's document
    log(autograph.document)
    return autograph.document
}
 