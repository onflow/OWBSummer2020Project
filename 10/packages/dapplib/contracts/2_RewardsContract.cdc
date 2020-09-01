// RewardsContract.cdc

// This contract provides the definition for the Rewards list for
// each retailer.
pub contract RewardsContract {

    pub resource Reward {
        // The other retailers whose tokens can be used for this NFT
        pub let allowedRetailers: [String]

        // The minimum UCV value the customer must have to be able to use
        // tokens from other retailers
        pub let minimumUCVForOthers: UFix64

        // The minimum CV value the customer must have to be able to use
        // tokens from other retailers
        pub let minimumCVForOthers: UFix64

        // The amount of tokens the customer needs for this NFT
        pub let tokens: UFix64

        // The amount of tokens needed if the customer uses tokens in the transaction from other retailers.
        // Calculates by self.tokens * the multiplier (for example 1.25)
        pub let tokens2nd: UFix64

        // This specifies the minimum amount of tokens from THIS retailer that they must spend
        // if also trying to spend tokens from other retailers to help out with the cost.
        pub let minTokensFromHere: UFix64

        init(theAllowedRetailers: [String], theMinimumUCVForOthers: UFix64, theMinimumCVForOthers: UFix64, theTokens: UFix64, theMinTokensPercent: UFix64, theMultiplier: UFix64) {
            self.allowedRetailers = theAllowedRetailers
            self.minimumUCVForOthers = theMinimumUCVForOthers
            self.minimumCVForOthers = theMinimumCVForOthers
            self.tokens = theTokens
            self.tokens2nd = theTokens * theMultiplier
            self.minTokensFromHere = (theTokens * theMultiplier) * theMinTokensPercent
        }
    }

    // A resource that can be given to each retailer so they can make
    // a list of rewards for a certain amount of tokens
    pub resource Rewards {
        // A dictionary that maps the name of the rewards to the amount of
        // tokens it costs.
        pub let rewards: @{String: Reward}

        // For display purposes, so the user can see the reward matched to the amount of
        // tokens it requires
        pub let displayRewards: {String: UFix64}
        
        // Creates a new reward and also specifies if this reward allows tokens to be spent that were earned
        // from other retailers (and if so, what those retailers are).
        pub fun createReward(name: String, tokens: UFix64, ucvNumber: UFix64, cvNumber: UFix64, otherRetailers: [String], minTokensPercent: UFix64, multiplier: UFix64) {
            let theReward <- create Reward(theAllowedRetailers: otherRetailers, theMinimumUCVForOthers: ucvNumber, theMinimumCVForOthers: cvNumber, theTokens: tokens, theMinTokensPercent: minTokensPercent, theMultiplier: multiplier)
            let oldReward <- self.rewards[name] <- theReward
            destroy oldReward

            self.displayRewards[name] = tokens
        }


        // Removes a reward
        pub fun removeReward(name: String) {
            let oldReward <- self.rewards.remove(key: name)!
            destroy oldReward

            self.displayRewards.remove(key: name)
        }

        // Returns the list of rewards for each retailer so customers can
        // see what their options are
        pub fun getRewards(): {String: UFix64} {
            return self.displayRewards
        }

        // Checks to see if the reward exists already
        pub fun itemExists(name: String): Bool {
            return self.rewards.keys.contains(name)
        }

        // Returns the reward resource
        pub fun getReward(name: String): @Reward {
            return <- self.rewards.remove(key: name)!
        }

        destroy() {
            destroy self.rewards
        }

        init() {
            self.rewards <- {}
            self.displayRewards = {}
        }
    }
    
    pub fun createEmptyRewards(): @Rewards {
      return <- create Rewards()
    }

    init() {

    }
}
 