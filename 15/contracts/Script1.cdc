// Script1.cdc 

import ForgeVault from 0x02

// Print the NFTs owned by account 0x03.
pub fun main() {
    // Get the public account object for account 0x03
    let nftOwner = getAccount(0x02)

    // Find the public Receiver capability for their Collection
    let capability = nftOwner.getCapability(/public/FVReceiver)!

    // borrow a reference from the capability
    let receiverRef = capability.borrow<&{ForgeVault.FVReceiver}>()
        ?? panic("Could not borrow the receiver reference")

    // Log the NFTs that they own as an array of IDs
    log("Account 2 NFTs")
    log(receiverRef.getIDs())
}