// scripts/check_account.cdc
// *************************
// This script checks an account's Vault balance and NFT collection
//
import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0x01cf0e2f2f715450

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

pub fun main(account: Address, accountName: String) {
    
    // get the account's public address object
    let account = getAccount(account)

    // Borrow a reference to the DemoToken Vault
    let balanceCap = account.getCapability(/public/DemoTokenBalance)!
    let balanceRef = balanceCap.borrow<&{FungibleToken.Balance}>()!
    
    // Get the balance from the DemoToken Vault
    let balance = balanceRef.balance

    // Borrow a reference to the Rock Collection
    let collectionCap = account.getCapability(/public/RockCollection)!
    let collectionRef = collectionCap.borrow<&{NonFungibleToken.CollectionPublic}>()!
    
    // Get the Rock IDs from the Collection
    let collection = collectionRef.getIDs()

    // Concatenate the account name with the Address for better output
    let accountSuffix = " (".concat(account.address.toString()).concat(")")
    let accountName = accountName.concat(accountSuffix)

    log("********************")
    log("Account Status for:")
    log(accountName)
    log("********************")
    log("DemoToken Balance:")
    log(balance.toString())
    log("********************")
    log("Rocks owned (by ID):")
    if collection.length == 0 {
        log("No Rocks in this collection")
    } else {
        log(collection)
    }
    log("********************")
}