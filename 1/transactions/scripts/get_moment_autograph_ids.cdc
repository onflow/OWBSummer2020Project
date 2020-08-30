import TopShot from 0x179b6b1cb6755e31

// This is the script to get a list of all the autographs the specified moment owns
// Just change the argument to `getAccount` to whatever account you want
// and as long as they have a published Collection receiver, you can see
// the autographs their moment owns.

pub fun main(account: Address, id: UInt64): [UInt64] {
    let token = getAccount(account).getCapability(/public/MomentCollection)!
                .borrow<&{TopShot.MomentCollectionPublic}>()!.borrowMoment(id: id)!
    log(token.getAutographIDs())
    return token.getAutographIDs()
}
