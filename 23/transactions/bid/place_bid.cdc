// bid/place_bid.cdc
// *************************
// This transaction takes an auctionOwner Address, auctionID UInt64,
// bidAmount UFix64 and places a bid on the Auction ID in the 
// auctionOwner's Collection
//
// The transaction passes a Rock Collection Capability
// and a DemoToken Receiver to the Auction along with the
// bidTokens and the signer's account address
//
// This transaction checks that the Capabilities are properly
// linked before completing, ensuring that the Bidder's
// DemoTokens and Rocks can be safely returned
//

import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0x01cf0e2f2f715450
import DemoToken from 0x179b6b1cb6755e31
import Rocks from 0xf3fcd2c1a78f5eee
import OrbitalAuction from 0xe03daebed8ca0615

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction(auctionOwner: Address, auctionID: UInt64, bidAmount: UFix64) {
    let collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>
    let publicVaultCap: Capability<&{FungibleToken.Receiver}>
    let bidTokens: @FungibleToken.Vault
    let bidderAddress: Address

    prepare(signer: AuthAccount) {
        
        // Get the CollectionPublic interface from the signer's Rock Collection
        self.collectionCap = signer.getCapability<&{NonFungibleToken.CollectionPublic}>(/public/RockCollection)!
        
        // Check that the CollectionPublic interface capability is properly linked
        if self.collectionCap.check() == nil {
            panic("new_bid.cdc: collection cap is not linked")
        }
        
        // Get the DemoToken Receiver interface capability from the signer's DemoToken Vault
        self.publicVaultCap = signer.getCapability<&{FungibleToken.Receiver}>(/public/DemoTokenReceiver)!
        
        // Check that the DemoToken Receiver interface capability is properly linked
        if self.publicVaultCap.check() == nil {
            panic("new_bid.cdc: collection cap is not linked")
        }

        // Borrow a reference to the signer's DemoToken Vault
        let adminVaultRef = signer.borrow<&FungibleToken.Vault>(from: /storage/DemoTokenVault)!

        // Withdraw the bid tokens from the signer's Vault
        self.bidTokens <- adminVaultRef.withdraw(amount: bidAmount)

        // Set the bidder's address to the signer's address
        self.bidderAddress = signer.address
    }

    execute {

        // Get the public account object where the Auction capability is stored
        let seller = getAccount(auctionOwner)

        // Get the public Capability to the AuctionCollection
        let auctionCap = seller.getCapability(/public/OrbitalAuction)!

        // Borrow a reference to the AuctionPublic interface Capability
        let auctionRef = auctionCap.borrow<&{OrbitalAuction.AuctionPublic}>()??
            panic("Could not borrow a reference to the AuctionPublic interface")

        // Place the bid
        auctionRef.placeBid(
            auctionID: auctionID,
            vaultCap: self.publicVaultCap,
            collectionCap: self.collectionCap,
            bidTokens: <-self.bidTokens,
            address: self.bidderAddress
        )
    }
}
 