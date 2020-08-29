// Script1.cdc 

import CharityNFt from 0x02

// Print the NFTs owned by account 0x03.
// The script will also help produce the record the public will have access to in order to view what
// what transactions are being made by the organization.

pub fun main() {
    // Get the public account object for account 0x03
    let nftOwner = getAccount(0x02)
    //potentially change the getAccount()?

    // Find the public Receiver capability for their Collection
    let capability = nftOwner.getCapability(/public/NFTDonation)!

    // borrow a reference from the capability
    let receiverRef = capability.borrow<&{NonFungibleToken.NFTDonation}>()
        ?? panic("Could not borrow the receiver reference")

    // Log the NFTs that they own as an array of IDs
    log("Sample Charitable Organization's NFTs")
    log(receiverRef.getIDs())
}