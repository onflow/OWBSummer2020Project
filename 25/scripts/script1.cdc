import CricketFlow from 0x01

pub fun main(){
    let playerOwner1 = getAccount(0x01)
    let playerOwner2 = getAccount(0x02)



    let capability1 = playerOwner1.getCapability(/public/PlayerReceiver)!
    let capability2 = playerOwner2.getCapability(/public/PlayerReceiver)!


    let receiverRef1 = capability1.borrow<&{CricketFlow.PlayerReceiver}>()
                        ?? panic("Could not borrow the receiver refrence")
    let receiverRef2 = capability2.borrow<&{CricketFlow.PlayerReceiver}>()
                        ?? panic("Could not borrow the receiver refrence")

    log("Account 1 PlayerNFT")
    log(receiverRef1.getIDs())

    log("Account 2 PlayerNFT")
    log(receiverRef2.getIDs())
}
