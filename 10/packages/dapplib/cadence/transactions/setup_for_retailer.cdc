// setup_for_retailer.cdc

import FungibleToken from 0x01
import NonFungibleToken from 0x02
import RewardsContract from 0x03

// This tx sets up the retailer for the marketplace by giving
// them the ability to mint fungible and nonfungible tokens, so that they
// can then transfer them to the customer. Note that both the 
// fungible and nonfungible minting methods take in a recipient, 
// so these are just definitions for the retailer to be able to deposit
// tokens into a customer's account.

// SIGNED BY: RETAILER
transaction(retailerNameParam: String) {

  prepare(acct: AuthAccount) {
    // Create a new MintAndBurn resource and store it in account storage
    acct.save(<-FungibleToken.createFTMinter(name: retailerNameParam), to: /storage/FTMinter)

    // Create a private capability link for the FTMinter
    // Capabilities can be used to create temporary references to an object
    // so that callers can use the reference to access fields and functions
    // of the objet.
    // 
    // The capability is stored in the /private/ domain, which is only
    // accesible by the owner of the account, which means only
    // accessible by AuthAccount, and not PublicAccount (which is what
    // getAccount returns)
    acct.link<&FungibleToken.VaultMinter>(/private/PrivFTMinter, target: /storage/FTMinter)

    log("Created a tokens minter for the retailer")

    // store  anonfungible token minter resource in account storage
    acct.save(<-NonFungibleToken.createNFTMinter(name: retailerNameParam), to: /storage/NFTMinter)

    // Create a public capability link for the NFTMinter
    acct.link<&NonFungibleToken.NFTMinter>(/public/PubNFTMinter, target: /storage/NFTMinter)

    log("Created a NFT minter for the retailer")

    // Creates a Rewards resource and stores it in the /storage/Rewards path so retailers can
    // make their own rewards
    acct.save(<-RewardsContract.createEmptyRewards(), to: /storage/Rewards)

    // Create a public capability link for the rewards
    acct.link<&RewardsContract.Rewards>(/public/RewardsList, target: /storage/Rewards)

    log("Created an empty rewards resource for the retailer")
  }
  execute {
   
  }
}