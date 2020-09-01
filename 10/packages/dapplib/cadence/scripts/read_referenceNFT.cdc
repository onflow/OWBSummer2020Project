// read_referenceNFT.cdc

import NonFungibleToken from 0x02

// This script returns information about the user's reference NFT

// STEPS TO GET THIS TO WORK:
// "Setup for Customer"
// "Setup for Retailer"
// "Earning Tokens"

pub fun main(customerAddrParam: Address, retailerNameParam: String): [String] {
    // Get the accounts' public account objects
    let acct1 = getAccount(customerAddrParam)

    // Find the public Receiver capability for the user's collection
    let acct1Capability = acct1.getCapability(/public/NFTReceiver)!
                            .borrow<&{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}>()
                            ?? panic("Could not borrow acct1 nft collection reference")

    log("Account 1's UCV")
    log(acct1Capability.myReferenceNFT.UCV)
    log("Account 1's CV values")
    log(acct1Capability.myReferenceNFT.CV) 

    // Converts information about the user's UCV and CV at a specific retailer into an array to be viewed
    var referenceList: [String] = []
    referenceList.append("UCV: ".concat(acct1Capability.myReferenceNFT.UCV.toString()))
    referenceList.append("CV @ Retailer: ".concat(acct1Capability.myReferenceNFT.CV[retailerNameParam]!.toString()))

    return referenceList
}
