// earning_tokens.cdc

import FungibleToken from 0x01
import NonFungibleToken from 0x02

// This tx is signed by the retailer and then deposits fungible tokens (tokens) into
// the customer's account. It also updated the user's UCV value for purchasing at the store.

// NOTE: Setup for Customer and Setup for Retailer must be run prior to this transact

// SIGNED BY: RETAILER
transaction(customerAddrParam: Address, amountToEarnParam: Int) {        

    let FTMinterRef: &FungibleToken.VaultMinter

    prepare(acct: AuthAccount) {
    /*  You can do this without capabilities too, but it's more secure the second way.
        self.FTMinterRef = acct.borrow<&FungibleToken.VaultMinter>(from: /storage/MainMinter)
                                ?? panic("Could not borrow the retailer's FT minting reference")
    */
        // Gets a reference to the fungible token minter of the retailer
        self.FTMinterRef = acct.getCapability(/private/PrivFTMinter)!
                                .borrow<&FungibleToken.VaultMinter>()
                                ?? panic("Could not borrow the fungible token minter from the retailer")

    }

    execute {
        // Gets the PublicAccount for the customer
        let customerAccount = getAccount(customerAddrParam)

        // Borrows a reference by using a capability to the customer's fungible token vault
        let customerVault = customerAccount.getCapability(/public/MainReceiver)!
                                .borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>()
                                ?? panic("Could not borrow owner's vault reference")

        let customerCollection = customerAccount.getCapability(/public/NFTReceiver)!
                                    .borrow<&{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}>()
                                    ?? panic("Could not borrow owner's NFT collection")
        // The retailer mints the new tokens and deposits them into the customer's vault, taking into
        // account 10% of the UCV value.
        self.FTMinterRef.mintTokens(amount: UFix64(amountToEarnParam) + customerCollection.myReferenceNFT.UCV * UFix64(0.1), recipient: customerVault)

        log("Retailer minted >= 10 tokens and gave them to the customer")

        customerCollection.myReferenceNFT.purchase(retailer: self.FTMinterRef.name)

        log("Updated customer's UCV and CV value")

    }
}