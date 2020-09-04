// Script to get minted Flow ID corresponding to given ethereum ID
import NonFungibleToken,Creature from 0x01

pub fun main(): UInt64 {
    
    let ref = getAccount(0x02)
                      .getCapability(/public/NFTReceiver)!
                      .borrow<&{Creature.CollectionPublic,NonFungibleToken.CollectionPublic} >()!
          
    let x = ref.getIDs()

    let len = x.length
    var index = 0
    while index < len {
        if(ref.borrowCreature(id: x[index]).ethTokenId == UInt64(TOKEN_ID)){
            return ref.borrowCreature(id: x[index]).id
        }
        index = index + 1
    }

    return 0

}