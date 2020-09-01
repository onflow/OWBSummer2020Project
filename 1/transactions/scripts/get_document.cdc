import Autograph from 0xf3fcd2c1a78f5eee

// This script gets the document associated with a autograph
// in a collection by looking up its ID and then searching
// for that autograph's document in the Autograph contract

// Paramters
// account: The Flow Address of the account whose autograph data needs to be read
// id: The unique ID for the autograph whose data needs to be read
//
// Returns: A string of the document associated with the specified autograph

pub fun main(account: Address, id: UInt64): String {

    // get the public capability for the owner's autograph collection
    // and borrow a reference to it
    let collectionRef = getAccount(account).getCapability(/public/AutographCollection)!
        .borrow<&{Autograph.AutographCollectionPublic}>()
        ?? panic("Could not get public autograph collection reference")

    // Borrow a reference to the specified autograph
    let token = collectionRef.borrowAutograph(id: id)
        ?? panic("Could not borrow a reference to the specified autograph")

    // Get the autograph's document
    log(token.document)
    return token.document
}