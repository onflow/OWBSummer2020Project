import Autograph from 0xf3fcd2c1a78f5eee

// This is the script to get a list of all the autographs an account owns
// Just change the argument to `getAccount` to whatever account you want
// and as long as they have a published Collection receiver, you can see
// the Autographs they own.

pub fun main(account: Address): [UInt64] {

    let acct = getAccount(account)

    let collectionRef = acct.getCapability(/public/AutographCollection)!
                            .borrow<&{Autograph.AutographCollectionPublic}>()!

    log(collectionRef.getIDs())

    return collectionRef.getIDs()
}
