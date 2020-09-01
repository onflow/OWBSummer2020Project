// setup_for_nonprofit.cdc

import FungibleToken from 0x01

// This tx sets up a new non-profit for the marketplace
// by creating an empty NFT Collection for the non-profit
// so they can eventually receive NFTs from the customers who stake
// their campaigns

// SIGNED BY: NON-PROFIT
transaction {
  prepare(acct: AuthAccount) {
     // create a new vault instance for the customer with an initial balance of 0
    let vaultA <- FungibleToken.createEmptyVault()

    // Store the vault in the account storage
    acct.save<@FungibleToken.Vault>(<-vaultA, to: /storage/MainVault)
  
    // Create a public Receiver capability to the Vault so retailers can
    // give them tokens for loyalty
    acct.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance, FungibleToken.Provider}>
             (/public/MainReceiver, target: /storage/MainVault)

    log("Created Vault reference on the nonprofit's account")
  }
}