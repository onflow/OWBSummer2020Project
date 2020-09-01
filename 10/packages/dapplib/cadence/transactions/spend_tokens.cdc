// spend_tokens.cdc
import FungibleToken from 0x01
import NonFungibleToken from 0x02
import RewardsContract from 0x03

// This tx allows the user to spend tokens on an item that is currently in the retailer's 
// rewards list. The amount of fungible tokens it costs is already given inside the retailer's 
// rewards resource so we know how much to deduct/if the customer has enough in the first place

// NOTE: Setup for Customer, Setup for Retailer, Earning Tokens and Create Reward must be run prior to this tx.
// The User should also meet the required amount of tokens or this will not work, and it will be logged to the console.

// SIGNED BY: CUSTOMER 
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