// read_nonprofit_tokens.cdc

import FungibleToken from 0x01

// This script reads all the tokens that a non-profit holds to see the tokens that customers have donated there for their cause

pub fun main(accountAddrParam: Address): [String] {
    let account = getAccount(accountAddrParam)

    // Find the public Receiver capability for the nonprofits vault
    // Gets a reference to the Non-profit's vault so we can deposit into it
    let accountVault = account.getCapability(/public/MainReceiver)!
                            .borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance, FungibleToken.Provider}>()
                            ?? panic("Could not borrow vault from the nonprofit")

    // Print out the tokens that the nonprofit has
    log("Nonprofit 1 Tokens")
    log(accountVault.mapTokensToRetailer)

    // Converts dictionary into array
    var tokensList: [String] = []
    let tokensListNames = accountVault.mapTokensToRetailer.keys
    let tokensListCosts = accountVault.mapTokensToRetailer.values

    var i = 0
    while i < tokensListNames.length {
        tokensList.append(tokensListNames[i].concat(" : ".concat(tokensListCosts[i].toString())))
        i = i + 1
    }

    return tokensList

}

