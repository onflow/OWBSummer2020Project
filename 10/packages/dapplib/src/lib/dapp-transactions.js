// 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
// ⚠️ THIS FILE IS AUTO-GENERATED WHEN packages/dapplib/cadence CHANGES
// DO **** NOT **** MODIFY CODE HERE AS IT WILL BE OVER-WRITTEN
// 🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨

const fcl = require("@onflow/fcl");

module.exports = class DappTransactions {

	static create_reward(imports) {
		return fcl.transaction`
				// create_reward.cdc
				
				
				// This tx is meant for retailer's to create a new reward for customers
				
				// NOTE: Setup for Retailer must be signed before this tra
				
				// SIGNED BY: RETAILER
				
				
				${DappTransactions.injectImports(imports)}
				transaction(rewardItemParam: String, minimumTokensParam: Int, allowedRetailersParam: [String], minimumUCVParam: Int, minimumCVParam: Int) {
				
				
				    prepare(acct: AuthAccount) {
				        // Borrows a reference to the retailer's rewards resource so they can create a new reward
				        // with a name and number of tokens
				        let RetailerRewards = acct.borrow<&RewardsContract.Rewards>(from: /storage/Rewards)
				                                ?? panic("Could not borrow rewards resource")
				
				        // If the item does not exist, panic
				        if RetailerRewards.itemExists(name: rewardItemParam) == true {
				            panic("Item already exists!")
				        }
				
				        // Creates the new reward
				        // Specifies the NFT they will receive (a water bottle)
				        // The amount of tokens (from this retailer) the NFT will cost 
				        // THE NEXT FIELDS ONLY APPLY IF THE USER USES ANOTHER RETAILER'S TOKENS TO PURCHASE THE REWARD
				        // ucvNumber, which is the minimum UCV the customer must have to use tokens from another retailer
				        // otherRetailers, which is a list of retailers the user is allowed to spend their tokens from to help out with thr purchase
				        // minTokensPercent, which is a percent of the amount of tokens the user must spend from THIS retailer in the tx
				        // multiplier, which multiplies the base cost of the NFT by a number to get a new cost if incorporating another r
				        RetailerRewards.createReward(name: rewardItemParam, tokens: UFix64(minimumTokensParam), ucvNumber: UFix64(minimumUCVParam), cvNumber: UFix64(minimumCVParam), otherRetailers: allowedRetailersParam, minTokensPercent: UFix64(0.5), multiplier: UFix64(1.25))
				
				        log("Created reward")
				    }
				
				    execute {
				
				    }
				}
		`;
	}

	static earning_tokens(imports) {
		return fcl.transaction`
				// earning_tokens.cdc
				
				
				// This tx is signed by the retailer and then deposits fungible tokens (tokens) into
				// the customer's account. It also updated the user's UCV value for purchasing at the store.
				
				// NOTE: Setup for Customer and Setup for Retailer must be run prior to this transact
				
				// SIGNED BY: RETAILER
				${DappTransactions.injectImports(imports)}
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
		`;
	}

	static instagram_ad(imports) {
		return fcl.transaction`
				// instagram_ad.cdc
				
				// SIGNED BY: RETAILER
				
				// This tx occurs when a user posts on instagram promoting the retailer. They will
				// earn tokens and receive an updated UCV value for their good deeds (less than what they would
				// get for purchasing at the retailer, though).
				
				${DappTransactions.injectImports(imports)}
				transaction(customerAddrParam: Address) {
				
				    let FTMinterRef: &FungibleToken.VaultMinter
				
				    prepare(acct: AuthAccount) {
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
				        // account 5% of the UCV value.
				        self.FTMinterRef.mintTokens(amount: UFix64(10) + customerCollection.myReferenceNFT.UCV * UFix64(0.05), recipient: customerVault)
				
				        log("Retailer minted >= 10 tokens and gave them to the customer")
				
				        customerCollection.myReferenceNFT.ad(retailer: self.FTMinterRef.name)
				
				        log("Updated customer's UCV and CV value")
				    }
				
				}
		`;
	}

	static remove_reward(imports) {
		return fcl.transaction`
				// remove_reward.cdc
				
				
				// This tx is meant for retailer's to remove an existing reward for customers
				
				// SIGNED BY: RETAILER
				
				${DappTransactions.injectImports(imports)}
				transaction(rewardNameParam: String) {
				
				    prepare(acct: AuthAccount) {
				        // Borrows a reference to the retailer's rewards resource so they can remove a reward
				        let RetailerRewards = acct.borrow<&RewardsContract.Rewards>(from: /storage/Rewards)
				                                ?? panic("Could not borrow rewards resource")
				        
				        // If the item does not exist, panic
				        if RetailerRewards.itemExists(name: rewardNameParam) == false {
				            panic("Item does not exist!")
				        }
				
				        // Removes the new reward
				        RetailerRewards.removeReward(name: rewardNameParam)
				
				        log("Removed reward")
				    }
				
				    execute {
				
				    }
				}
		`;
	}

	static setup_for_customer(imports) {
		return fcl.transaction`
				
				// This tx sets up a new user for the marketplace
				// by publishing a Vault reference, so that retailers can deposit
				// tokens into the user's account. It also creates an empty NFT Collection for the
				// user so they can eventually receive NFTs from the retailer after certain thresh-holds.
				
				// SIGNED BY: CUSTOMER
				${DappTransactions.injectImports(imports)}
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
				
		`;
	}

	static setup_for_nonprofit(imports) {
		return fcl.transaction`
				// setup_for_nonprofit.cdc
				
				
				// This tx sets up a new non-profit for the marketplace
				// by creating an empty NFT Collection for the non-profit
				// so they can eventually receive NFTs from the customers who stake
				// their campaigns
				
				// SIGNED BY: NON-PROFIT
				${DappTransactions.injectImports(imports)}
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
		`;
	}

	static setup_for_retailer(imports) {
		return fcl.transaction`
				// setup_for_retailer.cdc
				
				
				// This tx sets up the retailer for the marketplace by giving
				// them the ability to mint fungible and nonfungible tokens, so that they
				// can then transfer them to the customer. Note that both the 
				// fungible and nonfungible minting methods take in a recipient, 
				// so these are just definitions for the retailer to be able to deposit
				// tokens into a customer's account.
				
				// SIGNED BY: RETAILER
				${DappTransactions.injectImports(imports)}
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
		`;
	}

	static spend_tokens(imports) {
		return fcl.transaction`
				// spend_tokens.cdc
				
				// This tx allows the user to spend tokens on an item that is currently in the retailer's 
				// rewards list. The amount of fungible tokens it costs is already given inside the retailer's 
				// rewards resource so we know how much to deduct/if the customer has enough in the first place
				
				// NOTE: Setup for Customer, Setup for Retailer, Earning Tokens and Create Reward must be run prior to this tx.
				// The User should also meet the required amount of tokens or this will not work, and it will be logged to the console.
				
				// SIGNED BY: CUSTOMER 
				${DappTransactions.injectImports(imports)}
				transaction(retailerAddrParam: Address, rewardNameParam: String, otherRetailerBoolParam: Bool, otherRetailerNameParam: String, amountFromOtherRetailerParam: Int) {  
				    let CustomerCollection: &{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}
				    let CustomerVaultToWithdraw: &FungibleToken.Vault{FungibleToken.Balance, FungibleToken.Provider}
				    let CostOfItem: UFix64
				    let CostOfItemWithOtherRetailer: UFix64
				
				    // Whether or not the customer would like to use the other retailer
				    let OtherRetailerBool: Bool
				    // The other retailer they would like to incorporate
				    let OtherRetailer: String
				    // The allowed retailers
				    let AllowedRetailers: [String]
				    // The minimum UCV value that the customer must have to be able to use 
				    // the other tokens for this reatiler's NFT
				    let MinUCV: UFix64
				    let MinCV: UFix64
				    // The amount of tokens the user will use from THIS retailer
				    let TokensFromHere: UFix64
				    // The minimum tokens the user can use from this retailer (if the user is using a seperate retailer)
				    let MinTokensFromHere: UFix64
				    
				    prepare(acct: AuthAccount) {
				        // Borrows a reference to the retailer's rewards so we can see if the item exists and
				        // how much it costs
				        let retailerAccount = getAccount(retailerAddrParam)
				        let RetailerRewards = retailerAccount.getCapability(/public/RewardsList)!
				                                .borrow<&RewardsContract.Rewards>()
				                                ?? panic("Could not borrow rewards resource")
				
				        // If the reward does not exist, panic
				        if RetailerRewards.itemExists(name: rewardNameParam) == false {
				            panic("Item does not exist!")
				        }
				
				        // Borrows a reference by using a capability to the customer's NFT collection
				        // so we can deposit into this collection
				        self.CustomerCollection = acct.getCapability(/public/NFTReceiver)!
				                                    .borrow<&{NonFungibleToken.NFTReceiver, NonFungibleToken.ReferenceUser}>()
				                                    ?? panic("Could not borrow owner's NFTCollection reference") 
				
				        // Borrows a reference by using a capability to the customer's fungible token vault
				        // so that we can withdraw tokens and check the vault's balance
				        self.CustomerVaultToWithdraw = acct.getCapability(/public/MainReceiver)!
				                                        .borrow<&FungibleToken.Vault{FungibleToken.Balance, FungibleToken.Provider}>()
				                                        ?? panic("Could not borrow owner's vault reference")                                
				
				        // Borrows the reward resource that corresponds to the NFT we are talking about
				        let reward <- RetailerRewards.getReward(name: rewardNameParam)
				        // Record the cost of the reward
				        self.CostOfItem = reward.tokens 
				        // Record the cost of the reward if another retailer's tokens is involved
				        self.CostOfItemWithOtherRetailer = reward.tokens2nd
				
				        // The allowed retailers if there are tokens being used by other retailers
				        self.AllowedRetailers = reward.allowedRetailers
				        // The min UCV the customer must have to use tokens from other retailers
				        self.MinUCV = reward.minimumUCVForOthers
				        // The min UCV the customer must have to use tokens from other retailers
				        self.MinCV = reward.minimumCVForOthers
				        // Minimum amount of tokens the user must spend from this retailer if another
				        // retailer's tokens are involved
				        self.MinTokensFromHere = reward.minTokensFromHere
				        // Put the reward back in the dictionary by using the double <- move operator
				        let oldReward <- RetailerRewards.rewards[rewardNameParam] <- reward
				        // Destroy the temp reward 
				        destroy oldReward
				
				        // This is saying the user will use another retailer's tokens in the tx
				        // If FALSE: the user will only use their tokens from this retailer (will
				        self.OtherRetailerBool = otherRetailerBoolParam
				        // Specifies the retailer from which the user will use their tokens that they earned there
				        self.OtherRetailer = otherRetailerNameParam
				        // The amount of tokens the user will use from this retailer (THIS ONLY APPLIES IF THE USER
				        // IS USING A SEPERATE RETAILER'S TOKENS)
				        self.TokensFromHere = UFix64(amountFromOtherRetailerParam)
				
				    }
				
				    execute {    
				        let NFTMinterAccount = getAccount(retailerAddrParam)
				
				        // Borrow a reference to the retailer's NFT Minter so they can mint tokens into the user's account
				        let NFTMinterRef = NFTMinterAccount.getCapability(/public/PubNFTMinter)!
				                            .borrow<&NonFungibleToken.NFTMinter>()
				                            ?? panic("Could not borrow NFTMinter")
				
				        // Checks to see if another retailer's tokens will be withdrawn
				        if (self.OtherRetailerBool) {
				            // Makes sure that the retailer the customer wants to use to help pay for the NFT is in the allowed
				            // category of the reward, and also makes sure the customer meets the UCV requirements
				            if (self.AllowedRetailers.contains(self.OtherRetailer) && self.CustomerCollection.myReferenceNFT.UCV >= self.MinUCV && self.CustomerCollection.myReferenceNFT.CV[NFTMinterRef.name]! >= self.MinCV) {
				                // Makes sure the user is using the minimum amount of tokens from this retailer
				                if (self.TokensFromHere < self.MinTokensFromHere) {
				                    panic("You are not using enough tokens from this retailer")
				                }
				                // The cost of the item in tokens is deducted from the user's account
				                let removedTokensVault <- self.CustomerVaultToWithdraw.withdraw(amount: self.TokensFromHere, retailer: NFTMinterRef.name)
				                destroy removedTokensVault
				
				                // Removes tokens from the other retailer as well
				                // The amount of tokens is the cost of the NFT if another retailer is involved - the amount of tokens we're using from
				                // the retailer we're purchasing fr
				                let removedTokensOtherVault <- self.CustomerVaultToWithdraw.withdraw(amount: self.CostOfItemWithOtherRetailer - self.TokensFromHere, retailer: self.OtherRetailer)
				                destroy removedTokensOtherVault
				                
				                log("Took tokens away")  
				
				                // The retailer mints the new NFT and deposits it into the customer's collection
				                NFTMinterRef.mintNFT(recipient: self.CustomerCollection, item: rewardNameParam)
				
				                log("Minted an NFT and put it in the customer's account")
				            } else {
				                panic("This retailer is not allowed or you do not meet the UCV/CV requirements")
				            }
				        } else {
				            // This is if they are just using tokens from the retailer they are getting the NFT from
				            // The cost of the item in tokens is deducted from the user's account
				            let removedTokensVault <- self.CustomerVaultToWithdraw.withdraw(amount: self.CostOfItem, retailer: NFTMinterRef.name)
				            destroy removedTokensVault
				
				            log("Took tokens away")  
				
				            // The retailer mints the new NFT and deposits it into the customer's collection
				            NFTMinterRef.mintNFT(recipient: self.CustomerCollection, item: rewardNameParam)
				
				            log("Minted an NFT and put it in the customer's account")
				        }
				        
				    }
				
				}
		`;
	}

	static stake_nonprofit(imports) {
		return fcl.transaction`
				// stake_nonprofit.cdc
				
				// SIGNED BY: CUSTOMER
				
				// This tx occurs when a user is giving their tokens to a non-profit to stake their campaign
				
				${DappTransactions.injectImports(imports)}
				transaction(nonprofitAddrParam: Address, ftToGiveParam: Int, retailerFromParam: String) { 
				
				    let customerVault: &FungibleToken.Vault
				    let retailerName: String
				
				    prepare(acct: AuthAccount) {  
				        // Borrows a reference by using a capability to the customer's fungible token vault
				        self.customerVault = acct.borrow<&FungibleToken.Vault>(from: /storage/MainVault)
				                                ?? panic("Could not borrow owner's vault reference")
				        self.retailerName = retailerFromParam
				    }
				
				    execute {
				        // Gets the NonProfit account
				        let nonprofitAccount = getAccount(nonprofitAddrParam)
				
				        // Gets a reference to the Non-profit's vault so we can deposit into it
				        let nonprofitVault = nonprofitAccount.getCapability(/public/MainReceiver)!
				                                    .borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance, FungibleToken.Provider}>()
				                                    ?? panic("Could not borrow vault from the nonprofit")
				
				        // Withdraws the tokens from the customer's vault
				        let vault <- self.customerVault.withdraw(amount: UFix64(ftToGiveParam), retailer: self.retailerName)
				
				        // Donates it to the non-profit's vault
				        nonprofitVault.deposit(from: <-vault, retailer: self.retailerName)
				
				        log("Donated tokens to the Non-Profit!")
				
				    }
				
				}
		`;
	}

	static trade(imports) {
		return fcl.transaction`
				// trade.cdc
				
				// This tx trades an NFT for a certain amount of fungible tokens. One user receives an NFT 
				// and one user receives a certain amount of fungible tokens.
				
				// SIGNER: The person giving away the NFT
				${DappTransactions.injectImports(imports)}
				transaction(secondAccount: Address, nftToGiveParam: String, ftToGiveParam: Int, fromWhatRetailerParam: String) {
				
				    let account1NFTGive: &NonFungibleToken.Collection
				    let transferingNFT: @NonFungibleToken.NFT
				    let account1VaultTake: &FungibleToken.Vault{FungibleToken.Receiver}
				    prepare(acct: AuthAccount) {
				        // Borrow the NFT Collection for account 1. Notice we do not use
				        // the NFTReceiver interface because that would restrict us from withdrawing the NFT
				        self.account1NFTGive = acct.borrow<&NonFungibleToken.Collection>(from: /storage/NFTCollection)
				                                ?? panic("Could not borrow account 1's NFT Collection")
				
				        // Store the NFT that will be traded
				        self.transferingNFT <- self.account1NFTGive.withdraw(withdrawItem: nftToGiveParam)
				
				        // Borrows a reference by using a capability to account 1's fungible token vault,
				        // using the Receiver interface because they will be receiving fungible tokens
				        self.account1VaultTake = acct.getCapability(/public/MainReceiver)!
				                                    .borrow<&FungibleToken.Vault{FungibleToken.Receiver}>()
				                                    ?? panic("Could not borrow account 1's vault reference")
				
				    }
				
				    execute {
				        // Get the 2nd account
				        let account2 = getAccount(secondAccount)
				        // Borrow a reference to account 2's fungible token vault, using the Provider interface
				        // because they will be giving the fungible tokens
				        let account2VaultGive = account2.getCapability(/public/MainReceiver)!
				                                        .borrow<&FungibleToken.Vault{FungibleToken.Provider}>()
				                                        ?? panic("Could not borrow account 2's vault reference") 
				        // Removes the fungible token's from account 2 and stores them in a vault
				        // NOTE: The retailer must match the retailer in the next line of code so tokens
				        // from different retailers don't get confused.
				        let removedTokensVault <- account2VaultGive.withdraw(amount: UFix64(ftToGiveParam), retailer: fromWhatRetailerParam)
				
				        // Deposits the vault into account 1 in the same retailer as the retailer that the other account
				        // withdrew their tokens from
				        self.account1VaultTake.deposit(from: <-removedTokensVault, retailer: fromWhatRetailerParam)
				
				        // Gets a reference to account 2's NFT Collection because they will be
				        // receiving NFTs
				        let account2NFTTake = account2.getCapability(/public/NFTReceiver)!
				                                .borrow<&{NonFungibleToken.NFTReceiver}>()
				                                ?? panic("Could not borrow account 2's NFT Collection")
				
				        // Deposits the NFT into account 2
				        account2NFTTake.deposit(token: <-self.transferingNFT)
				
				        log("Trade completed!")
				    }
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
