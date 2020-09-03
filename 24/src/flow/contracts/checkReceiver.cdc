// Script tp check if receiver is setup or not
import NonFungibleToken, Creature from 0x01

pub fun main(): Bool {

    let nftOwner = getAccount(0x02)

    // Find the public Receiver capability for their Collection
    let capability = nftOwner.getCapability(/public/NFTReceiver)!

    // borrow a reference from the capability
    let receiverRef = capability.borrow<&{Creature.CollectionPublic, NonFungibleToken.CollectionPublic}>() ?? nil

    // check if receiver is set up or not
    if (receiverRef != nil){
        log("true")
        return true
    }else{
        log("false")
        return false
    }
}
