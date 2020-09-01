import Autograph from 0xf3fcd2c1a78f5eee

// This script returns true if a autograph with the specified ID
// exists in a user's collection

pub fun main(account: Address, id: UInt64): Bool {
    let collectionRef = getAccount(account).getCapability(/public/AutographCollection)!
        .borrow<&{Autograph.AutographCollectionPublic}>()
        ?? panic("Could not get public autograph collection reference")

    return collectionRef.borrowNFT(id: id) != nil
}