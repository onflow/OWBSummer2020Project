//import NonFungibleToken from 0x01cf0e2f2f715450
import NonFungibleToken from 0xNFTStandardAddress

import SurvivalNFT from 0xNFTAddress

// This transaction returns an array of all the nft ids in the collection

pub fun main(): [UInt64] {
    let acct = getAccount(0xtargetAddress)
    let collectionRef = acct.getCapability(/public/NFTCollection)!.borrow<&{SurvivalNFT.SurvivalCollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    log(collectionRef.getIDs())
    return collectionRef.getIDs()
}
 