import FungibleToken from 0x01
import NonFungibleToken from 0x02

// This tx sets up a new user for the marketplace
// by publishing a Vault reference, so that retailers can deposit
// tokens into the user's account. It also creates an empty NFT Collection for the
// user so they can eventually receive NFTs from the retailer after certain thresh-holds.

// SIGNED BY: CUSTOMER
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

    log("Created Vault reference on the user's account")

    // store an empty NFT Collection in account storage so the user can later receive NFTs at certain FT thresh-holds
    acct.save<@NonFungibleToken.Collection>(<-NonFungibleToken.createEmptyCollection(), to: /storage/NFTCollection)

    // publish a capability to the Collection in storage so it can be deposited into
    acct.link<&{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}>(/public/NFTReceiver, target: /storage/NFTCollection)

    log("Created a new NFT empty collection and published a reference")
  }
}
