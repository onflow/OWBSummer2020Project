import NonFungibleToken from 0x01

pub fun main():Bool {
    let accountToCheck = getAccount(0x02)
    let capability = accountToCheck.getCapability(/public/NFTReceiver)
    log("-----------------------")
    log(capability)
    log("-----------------------")
    // let checkResult = capability!.check<&NonFungibleToken.Collection{NonFungibleToken.NFTReceiver}>()
    let checkResult = capability!.check<&{NonFungibleToken.NFTReceiver}>()
    // let receiverRef = capability!.check<&{NonFungibleToken.NFTReceiver}>()
    return checkResult
}