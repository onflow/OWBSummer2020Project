// 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
// ⚠️ THIS FILE IS AUTO-GENERATED WHEN packages/dapplib/cadence CHANGES
// DO **** NOT **** MODIFY CODE HERE AS IT WILL BE OVER-WRITTEN
// 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

const fcl = require("@onflow/fcl");

module.exports = class DappScripts {

	static read_fungtokens(imports) {
		return fcl.script`
				// read_nonprofit_tokens.cdc
				
				
				// This script reads all the tokens that a non-profit holds to see the tokens that customers have donated there for their cause
				
				${DappScripts.injectImports(imports)}
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
				
				
		`;
	}

	static read_referenceNFT(imports) {
		return fcl.script`
				// read_referenceNFT.cdc
				
				
				// This script returns information about the user's reference NFT
				
				// STEPS TO GET THIS TO WORK:
				// "Setup for Customer"
				// "Setup for Retailer"
				// "Earning Tokens"
				
				${DappScripts.injectImports(imports)}
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
				
		`;
	}

	static read_rewards(imports) {
		return fcl.script`
				// read_rewards.cdc
				
				
				// This script prints the NFTs that account 0x01 has for sale.
				${DappScripts.injectImports(imports)}
				pub fun main(retailerAddrParam: Address): [String] {
				    // 0x03 represents the retailer we would like to read the rewards from
				    let retailer = getAccount(retailerAddrParam)
				
				    // Borrows a reference to the retailer's rewards list
				    let retailerRewards = retailer.getCapability(/public/RewardsList)!
				                                .borrow<&RewardsContract.Rewards>()
				                                ?? panic("Could not borrow rewards resource")
				
				    // Logs the rewards out, each one is the name of the reward (aka the item you receive) and the
				    // cost of that reward in Fungible Tokens
				    log(retailerRewards.getRewards())
				
				    // Converts dictionary into array
				    var rewardsList: [String] = []
				    let rewardsListNames = retailerRewards.getRewards().keys
				    let rewardsListCosts = retailerRewards.getRewards().values
				
				    var i = 0
				    while i < rewardsListNames.length {
				        rewardsList.append(rewardsListNames[i].concat(" : ".concat(rewardsListCosts[i].toString())))
				        i = i + 1
				    }
				
				    return rewardsList
				}
				
		`;
	}

	static read_tokens(imports) {
		return fcl.script`
				// read_tokens.cdc
				
				
				// This script checks that the customer has tokens after 
				// the retailer gives it to them after a purchase ("Earning Tokens" tx)
				// Also checks to see if the user has an NFT in their collection if they've reached a certain
				// thresh-hold
				
				// STEPS TO GET THIS TO WORK:
				// "Setup for Customer"
				// "Setup for Retailer"
				// "Earning Tokens"
				
				${DappScripts.injectImports(imports)}
				pub fun main(accountAddrParam: Address): [String] {
				    // Get the accounts' public account objects
				    let acct1 = getAccount(accountAddrParam)
				
				    // Get references to the account's receivers
				    // by getting their public capability
				    // and borrowing a reference from the capability
				    // Note: in "Setup for Customer," if we didn't include FungibleToken.Balance has a interface we could expose, then we wouldn't
				    // be able to access it here.
				    let acct1ReceiverRef = acct1.getCapability(/public/MainReceiver)!
				                          .borrow<&FungibleToken.Vault{FungibleToken.Balance}>()
				                          ?? panic("Could not borrow acct1 vault reference")
				
				    // Log the Vault balance of both accounts and ensure they are
				    // the correct numbers.
				    // Account 0x01 should have 40.
				    // Account 0x02 should have 20.
				    log("Account 1 Balance")
				    log(acct1ReceiverRef.totalBalance)
				    log(acct1ReceiverRef.mapTokensToRetailer)
				
				    // Find the public Receiver capability for the user's collection
				    let acct1Capability = acct1.getCapability(/public/NFTReceiver)!
				                            .borrow<&{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}>()
				                            ?? panic("Could not borrow acct1 nft collection reference")
				
				     // Print both collections as arrays of IDs
				    log("Account 1 NFTs")
				    log(acct1Capability.getItems())
				    log("Account 1's UCV")
				    log(acct1Capability.myReferenceNFT.UCV)
				    log("Account 1's CV values")
				    log(acct1Capability.myReferenceNFT.CV)
				
				    return acct1Capability.getItems()
				}
				
		`;
	}

      
      static injectImports(imports) {
        let importCode = '';
        if (imports) {
          for(let key in imports) {
            importCode += '				import ' + key + ' from 0x' + imports[key].trim().replace('0x','') + '\n'; 
          };
        }
        return importCode;
      }     

      
}
