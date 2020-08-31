// Auction.cdc
//
// The Orbital Auction contract is a mathematical Auction game on the Flow blockchain where you bid for NFT prizes. 
// NFTs are distributed into Orbs which Players can make bids on and compete for ownership of.
// 
//
import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0x01cf0e2f2f715450

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc
//

pub contract OrbitalAuction {

    // Events
    pub event NewAuctionCreated(id: UInt64, totalSessions: UInt64)
    pub event NewBid(auctionID: UInt64, address: Address, bidTotal: UFix64)
    pub event UpdatedBid(auctionID: UInt64, address: Address, bidIncrease: UFix64, bidTotal: UFix64)
    pub event NewEpochStarted(auctionID: UInt64, epochID: UInt64, epochEndBlock: UInt64)
    pub event NewPrizeAddedToOrb(auctionID: UInt64, orbID: UInt64, tokenID: UInt64)
    pub event OrbOwnerAssigned(auctionID: UInt64, orbID: UInt64, owner: Address)
    pub event OrbBalanceIncreased(auctionID: UInt64, orbID: UInt64, amount: UFix64)
    pub event OrbTokensRedeemed(auctionID: UInt64, orbID: UInt64, address: Address, amount: UFix64)
    pub event OrbPrizeRedeemed(auctionID: UInt64, orbID: UInt64, address: Address, tokenID: UInt64)
    pub event UnusedBidsReturned(address: Address, amount: UFix64)
    pub event AuctionCompleted(auctionID: UInt64)

    // AuctionPublic is a resource interface that restricts users to
    // placing bids and reading data from an Auction instance
    pub resource interface AuctionPublic {
        pub fun placeBid(
            auctionID: UInt64,
            vaultCap: Capability<&{FungibleToken.Receiver}>,
            collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>,
            bidTokens: @FungibleToken.Vault,
            address: Address
        )
        pub fun getAuctionInfo(): [&Auction]
        pub fun getAuctionMeta(_ auctionID: UInt64): &Meta
        pub fun getAuctionBidderCount(_ auctionID: UInt64): Int
        pub fun getAuctionBidders(_ auctionID: UInt64): {Address: UFix64}
        pub fun logCurrentEpochInfo(_ auctionID: UInt64)
        pub fun logOrbInfo(auctionID: UInt64, orbID: UInt64)
        pub fun logAllOrbInfo(_ auctionID: UInt64)
        pub fun logOrbBalance(auctionID: UInt64, orbID: UInt64)
        pub fun logAllOrbBalances(_ auctionID: UInt64)
    }

    // AuctionAdmin is a resource interface that provides admin users
    // with access to restricted Auction methods that may impact
    // the outcome of the auction
    //
    // AuctionAdmin can be used to manage the Auction from an external 
    // script
    //
    pub resource interface AuctionAdmin {
        pub fun checkIsNextEpoch(_ auctionID: UInt64)
        pub fun startNextEpoch(_ auctionID: UInt64)
        pub fun addPrizeCollectionToAuction(_ auctionID: UInt64, collection: @NonFungibleToken.Collection)
        pub fun addPrizeToOrb(_ auctionID: UInt64, orbID: UInt64)
        pub fun payoutOrbs(_ auctionID: UInt64)
    }

    // AuctionCollection contains all orbital auctions for an account and provides
    // methods for manipulating and reading data from the auction
    pub resource AuctionCollection: AuctionPublic, AuctionAdmin {
        
        // The total amount of Auctions in the AuctionCollection
        access(contract) var totalAuctions: UInt64

        // Auctions
        access(contract) var auctions: @{UInt64: Auction}

        init() {
            self.totalAuctions = UInt64(0)
            self.auctions <- {}
        }

        // createNewAuction initializes a new Auction resource with prizes, auction
        // settings and required metadata
        //
        pub fun createNewAuction(
            totalEpochs: UInt64,
            epochLengthInBlocks: UInt64,
            vault: @FungibleToken.Vault,
            prizes: @NonFungibleToken.Collection
        ) {
            // Set the auction ID based on the total amount of 
            // auctions in the collection
            let auctionID = self.totalAuctions + UInt64(1)
            
            // Create the auction Meta
            let AuctionMeta = Meta(
                auctionID: auctionID,
                totalEpochs: totalEpochs,
                epochLengthInBlocks: epochLengthInBlocks
            )
            
            // Create the Auction resource
            let Auction <- create Auction(
                vault: <- vault,
                meta: AuctionMeta
            )
            
            // Add the new auction to the auctions dictionary
            let oldToken <- self.auctions[auctionID] <- Auction
            destroy oldToken

            // Add the prizes to the auction so they can be added to orbs as they
            // are created
            self.addPrizeCollectionToAuction(auctionID, collection: <-prizes)

            /*
            **  TODO: Auction should not start until there are enough
            **  bidders for each epoch.
            **
            **  This will need to change before launch.
            */
            
            // Create the first Epoch struct to begin the auction
            self.createNewEpoch(auctionID, epochID: UInt64(1))

            // Create the first Orb resource. This will be owned by
            // the highest bidder at the end of the Epoch
            self.createNewOrb(auctionID)

            emit NewAuctionCreated(id: auctionID, totalSessions: totalEpochs)
        }

        // borrowAuction returns a reference to the Auction resource 
        // with the provided ID
        pub fun borrowAuction(_ auctionID: UInt64): &Auction {
            return &self.auctions[auctionID] as &Auction
        }

        // newBid creates a new Bidder resource, adds it to the Auction and deposits
        // the bidder's tokens into the Auction vault
        pub fun placeBid(
            auctionID: UInt64,
            vaultCap: Capability<&{FungibleToken.Receiver}>,
            collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>,
            bidTokens: @FungibleToken.Vault,
            address: Address
        ) {
            
            // Make sure we are bidding on an active Epoch
            self.checkIsNextEpoch(auctionID)

            // Get the auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Panic if auction has already completed. We should not be able to bid.
            if auctionRef.meta.auctionCompleted { panic("auction has already completed") }

            // Store the bid amount for use in the events
            let bidAmount = bidTokens.balance

            // If the bidder has already bid...
            if auctionRef.bidderExists(address) {

                // ...get the Bidder's Vault reference so we can check if it exists
                let bidderRef = &auctionRef.bidders[address] as &Bidder
                let vaultRef = &bidderRef.bidVault as &FungibleToken.Vault

                // ...if the Vault reference is nil...
                if vaultRef == nil {
                    
                    // ...create a new resource for the returning Bidder, replacing
                    // the instance that was moved into an Orb
                    auctionRef.addNewBidder(
                        address: address,
                        bidVault: <-bidTokens,
                        vaultCap: vaultCap,
                        collectionCap: collectionCap
                    )

                // ...if the Vault reference exists...
                } else {
                    
                    // ...deposit the bid tokens into the returning Bidder's bidVault
                    bidderRef.bidVault.deposit(from: <-bidTokens)
                }

                emit UpdatedBid(auctionID: auctionRef.meta.auctionID, address: address, bidIncrease: bidAmount, bidTotal: bidderRef.bidVault.balance)

            // ... if this is a new Bidder...
            } else {

                // ... create a new Bidder resource
                auctionRef.addNewBidder(
                    address: address,
                    bidVault: <-bidTokens,
                    vaultCap: vaultCap,
                    collectionCap: collectionCap
                )

                emit NewBid(auctionID: auctionRef.meta.auctionID, address: address, bidTotal: bidAmount)
            }
        }

        // getHighestBidder returns the Bidder resource with the highest
        // bidVault value
        pub fun getHighestBidder(_ auctionID: UInt64): @Bidder {
            
            // Get the Auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Get a reference to the bidders resource dictionary
            let bidders = &auctionRef.bidders as &{Address: Bidder}

            // TODO: Should return home early, logging to avoid using a panic here
            // TODO: Auction needs to handle a case where there are no bidders!!
            if bidders.length == 0 { log("there are no bidders") }

            // Set a placeholder value for the highestBidderAddress using the first key
            var highestBidderAddress = bidders.keys[0] 

            // For each address in the Bidders dictionary
            for address in bidders.keys {
                
                // Get a reference to the current highest Bidder
                let highBidder = &bidders[highestBidderAddress] as &Bidder
                // Get a reference to the current checked Bidder
                let checkedBidder = &bidders[address] as &Bidder

                // If the checked Bidder's balance is higher than the current highest Bidder's
                // balance...
                if checkedBidder.bidVault.balance > highBidder.bidVault.balance {
                    // ...update the highestBidderAddress to the checked Bidder
                    highestBidderAddress = address
                }
            }
            
            // Remove the highest Bidder resource from the Bidders dictionary
            let highestBidder <- bidders[highestBidderAddress] <- nil

            // Return the highest Bidder resource to the caller
            return <- highestBidder!
        }

        /* 
        **  TODO: We will need a checkAuctionStart() method to check
        **  if there are as many bidders in the auction as totalEpochs.
        **  If so, a new Epoch will be created and the auction will start.
        **
        **  pub fun checkAuctionStart(_ auctionID: UInt64) {
        **      let auctionRef = self.borrowAuction(auctionID)
        **        
        **      if auctionRef.bidders.length >= auctionRef.meta.totalEpochs {
        **          self.createNewEpoch(auctionID, epochID: UInt64(1))
        **      }
        **  }
        */

        // checkIsNextEpoch runs the handleEndOfEpoch method if the
        // currentBlock height is greater than the endBlock number
        // of the current Epoch
        pub fun checkIsNextEpoch(_ auctionID: UInt64) {
            
            // Get the auction reference
            let auctionRef = self.borrowAuction(auctionID)
            
            // Get the current Epoch
            let epoch = auctionRef.borrowCurrentEpoch()
            
            // Get the current block height
            let currentBlock = getCurrentBlock().height

            // If the current block height is greater than or equal to
            // the endBlock for the current Epoch...
            if currentBlock >= epoch.endBlock {
                
                // ... if the auction has not completed...
                if !auctionRef.meta.auctionCompleted {
                    
                    // ... handle the end of the current Epoch
                    self.handleEndOfEpoch(auctionID)
                }
            }
        }

        // handleEndOfEpoch moves the highest Bidder resource into the corresponding Orb 
        // at the end of an Epoch and distributes the tokens from the highest bid according
        // to the weights for the current epoch
        //
        // It will start a new Epoch and create a new Orb if the auction
        // has not completed. Otherwise it clears the bidders and emits the
        // AuctionCompleted event
        //
        // TODO: Flatten this method
        // TODO: Handle case if there are no bids
        pub fun handleEndOfEpoch(_ auctionID: UInt64) {

            // Get the auction reference
            let auctionRef = self.borrowAuction(auctionID)
            
            // Get the Orb for the curernt Epoch
            let orb = auctionRef.borrowOrb(auctionRef.meta.currentEpoch)
            
            // Get the highest Bidder resource
            let highestBidder <- self.getHighestBidder(auctionID)
            
            // Store the Bidder's balance amount for use in events
            let bidAmount = highestBidder.bidVault.balance

            // Withdraw the Bidder's tokens to distribute them to the active Orbs
            let bidderTokens <- highestBidder.bidVault.withdraw(amount: bidAmount)

            // Distribute the Bidder's tokens to the active Orbs
            auctionRef.distributeBidTokens(<-bidderTokens)

            // Assign the highest bidder to the orb for the current Epoch
            orb.assignOwner(bidder: <-highestBidder)

            emit OrbOwnerAssigned(auctionID: auctionID, orbID: orb.id, owner: orb.bidder?.address!)

            // If this is the final Epoch...
            if auctionRef.meta.currentEpoch >= auctionRef.meta.totalEpochs {

                // ...the Auction has completed
                auctionRef.meta.auctionCompleted = true
                
                // ...clear the remaining Bidders, returning their unused bids
                auctionRef.clearBidders()
                
                emit AuctionCompleted(auctionID: auctionID)

            // ...if this is not the final Epoch
            } else {
                
                // ...start a new Epoch
                self.startNextEpoch(auctionID)

                // ...create a new Orb
                self.createNewOrb(auctionID)
            }
        }

        // startNextEpoch creates the next Epoch and updates the currentEpoch
        // value in the Auction meta data to the new Epoch ID
        pub fun startNextEpoch(_ auctionID: UInt64) {
            
            // Get the auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Get the current Epoch
            let currentEpoch = auctionRef.borrowCurrentEpoch()

            // Increment the previous Epoch ID by one to set the new Epoch ID
            let newEpochID = currentEpoch.id + UInt64(1)
            
            // Create the new Epoch
            self.createNewEpoch(auctionID, epochID: newEpochID)

            // Update the currentEpoch ID in the AuctionMeta
            auctionRef.meta.currentEpoch = newEpochID

            // Get the newEpoch data
            let newEpoch = auctionRef.borrowCurrentEpoch()

            emit NewEpochStarted(auctionID: auctionID, epochID: newEpochID, epochEndBlock: newEpoch.endBlock)
        }

        // createNewEpoch initializes a new Epoch struct and adds it to the 
        // designated Auction's epochs dictionary
        pub fun createNewEpoch(_ auctionID: UInt64, epochID: UInt64) {
            
            // Get the Auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Get the final block number for the new epoch by adding the Auction's
            // epochLength value to the current block number
            let endBlock = getCurrentBlock().height + auctionRef.meta.epochLength

            // Create the new Epoch struct
            let newEpoch = Epoch(id: epochID, endBlock: endBlock)

            // Add the new Epoch to the Auction's epochs dictionary
            auctionRef.epochs[newEpoch.id] = newEpoch
        }


        // createNewOrb creates a new Orb resource for the highest Bidder of 
        // the current Epoch and adds it to the designated Auction's orbs dictionary
        //
        // an empty vault is created for the new Orb by withdrawing 0 tokens from 
        // the Auction's masterVault. The masterVault is provided on auction creation
        // to keep the entire contract composable. Any FungibleToken that adheres to the
        // onflow token standard can bew used to create the masterVault
        //
        pub fun createNewOrb(_ auctionID: UInt64) {

            // Get the Auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Get the current Epoch
            let currentEpoch = auctionRef.meta.currentEpoch

            // Create a new Orb
            let newOrb <- create Orb(
                auctionID,
                id: currentEpoch,
                vault: <-auctionRef.masterVault.withdraw(amount: UFix64(0))
            )

            // Add the orb to the Auction's orbs dictionary
            let oldOrb <- auctionRef.orbs[currentEpoch] <- newOrb
            destroy oldOrb

            // Add an NFT prize to the Orb
            self.addPrizeToOrb(auctionID, orbID: currentEpoch)
        }

        // addPrizeToAuction adds a single Prize to the Auction's prizes dictionary
        pub fun addPrizeToAuction(_ auctionID: UInt64, prize: @NonFungibleToken.NFT) {
            
            // Get the auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Increment the length og the prizes dictionary to set the new Prize ID
            let prizeID = UInt64(auctionRef.prizes.length + 1)

            // Add the Prize to the prizes dictionary
            auctionRef.prizes[prizeID] <-! prize
        }

        // addPrizeCollectionToAuction adds a Collection of NFTs to the Auction's prizes dictionary
        pub fun addPrizeCollectionToAuction(_ auctionID: UInt64, collection: @NonFungibleToken.Collection) {
            
            // For each token ID in the Collection's array of token IDs...
            for tokenID in collection.getIDs() {
                
                // Withdraw the NFT from the Collection
                let token <- collection.withdraw(withdrawID: tokenID)
                
                // Add the NFT to the Auction's prizes dictionary 
                self.addPrizeToAuction(auctionID, prize: <-token)
            }

            // Destroy the empty NFT Collection
            destroy collection
        }

        // addPrizeToOrb assigns a Prize to the Orb with the same ID. This method can
        // be used by an AuctionAdmin to assign a Prize to an Orb after it's Epoch has expired
        pub fun addPrizeToOrb(_ auctionID: UInt64, orbID: UInt64) {
            
            // Get the Auction reference
            let auctionRef = self.borrowAuction(auctionID)

            // Get the Orb reference
            let orbRef = &auctionRef.orbs[orbID] as &Orb

            // If the Orb doesn't exist...
            if orbRef == nil {

                // ...panic and revert the transaction
                panic("Orb doesn't exist yet")
            }

            // If there is a Prize available for this Orb...
            if let prize <- auctionRef.prizes[orbID] <- nil {

                // ...Assign the prize to the Orb
                orbRef.assignPrize(prize: <-prize)

            // ...If there is no prize available...
            } else {
                // ...let the user know they haven't added a prize yet
                log("No prize available for this epoch")
            }
        }

        // payoutOrbs send the Prizes and FungibleTokens from the Orb to
        // the Orb's owner if the Auction has completed
        pub fun payoutOrbs(_ auctionID: UInt64) {
            
            // Get the Auction Reference
            let auctionRef = self.borrowAuction(auctionID)

            // If the Auction has completed...
            if auctionRef.meta.auctionCompleted {

                // For each Orb in the Auction...
                for orb in auctionRef.orbs.keys {

                    // Get the Orb reference
                    let orb = &auctionRef.orbs[orb] as &Orb

                    // Send the Prize to the owner
                    orb.sendPrizeToOwner()

                    // Send the Tokens to the owner
                    orb.sendTokensToOwner()
                }

            // ...If the Auction has not completed...
            } else {

                // ...let the user know the Orbs can not be paid out yet
                log("Auction has not completed. Can not payout Orbs yet...")
            }


        }

        // getAuctionInfo returns an array of Auction references that belong to
        // the AuctionCollection
        pub fun getAuctionInfo(): [&Auction] {
            
            // Get an array of the Auction IDs in the collection
            let auctions = self.auctions.keys

            // Create an empty array of Auction references
            let auctionInfo: [&Auction] = []
            
            // For each ID in the auctions array...
            for id in auctions {

                // ...append the Auction reference to the auctionInfo array
                auctionInfo.append(self.borrowAuction(id))
            }

            // return the array of Auction references to the caller
            return auctionInfo
        }

        // getAuctionMeta takes an auctionID and returns a refernce to it's 
        // Meta struct
        pub fun getAuctionMeta(_ auctionID: UInt64): &Meta {
            let auctionRef = self.borrowAuction(auctionID)
            let auctionMeta = &auctionRef.meta as &Meta
            return auctionMeta
        }

        // getAuctionBidderCount takes an auctionID and returns the length of
        // the auction's bidders dictionary
        pub fun getAuctionBidderCount(_ auctionID: UInt64): Int {
            let auctionRef = self.borrowAuction(auctionID)
            return auctionRef.bidders.length
        }

        // logCurrentEpochInfo logs the state of the current Epoch
        // to the emulator console
        pub fun logCurrentEpochInfo(_ auctionID: UInt64) {
            let auctionRef = self.borrowAuction(auctionID)
            let epoch = auctionRef.borrowCurrentEpoch()
            let orb = auctionRef.borrowOrb(auctionRef.meta.currentEpoch)

            log("*************")
            log("Current Epoch")
            log(epoch.id)
            log("Current Block")
            log(getCurrentBlock().height)
            log("Epoch End Block")
            log(epoch.endBlock)
            log("Distribution")
            log(epoch.distribution.weights)
        }

        // logOrbInfo logs the state of the Orb
        // to the emulator console
        pub fun logOrbInfo(auctionID: UInt64, orbID: UInt64) {
            let auctionRef = self.borrowAuction(auctionID)
            let orb = auctionRef.borrowOrb(orbID)
            
            log("*************")
            log("Orb ID: ".concat(orb.id.toString()))
            log("*************")
            if let orbOwner = orb.bidder?.address {
                log("Orb Owner:")
                log(orbOwner.toString())
            } else {
                log("Orb is unowned")
            }
            log("*************")
            log("Orb DemoToken Balance:")
            log(orb.vault.balance.toString())
            log("*************")
            log("Orb Prize ID:")
            if let orbPrizeID = orb.prize?.id {
                log(orbPrizeID.toString())
            } else {
                log("Orb doesn't have a prize")
            }
        }

        // logAllOrbInfo logs the state of all Orbs in the auction
        // to the emulator console
        pub fun logAllOrbInfo(_ auctionID: UInt64) {
            let auctionRef = self.borrowAuction(auctionID)
            let orbs = auctionRef.orbs.keys

            for id in orbs {
                let orb = self.logOrbInfo(auctionID: auctionID, orbID: id)
            }
        }

        // logOrbBalance logs the Orb ID and vault balance
        // to the emulator console
        pub fun logOrbBalance(auctionID: UInt64, orbID: UInt64) {
            let auctionRef = self.borrowAuction(auctionID)
            let orb = auctionRef.borrowOrb(orbID)

            log("******************")
            log("Orb ".concat(orb.id.toString()).concat(" Balance"))
            log(orb.vault.balance)
            log("******************")
        }

        // logAllOrbBalances logs the balances and IDs of all Orbs in 
        // the auction to the emulator console
        pub fun logAllOrbBalances(_ auctionID: UInt64) {
            let auctionRef = self.borrowAuction(auctionID)
            let orbs = auctionRef.orbs.keys

            for id in orbs {
                let orb = self.logOrbBalance(auctionID: auctionID, orbID: id)
            }
        }

        // getAuctionBidders returns a dictionary containing the bidder's address
        // and bid total
        pub fun getAuctionBidders(_ auctionID: UInt64): {Address: UFix64} {

            // Get the Auction reference
            let auction = self.borrowAuction(auctionID)

            // Return a dictionary of Bidder addresses and their bid totals to
            // the caller
            return auction.getBidders()
        }

        destroy() {
            destroy self.auctions
        }
    }

    // Auction contains the Resources and metadata for a single auction
    pub resource Auction {
        access(contract) var epochs: {UInt64: Epoch}
        access(contract) var orbs: @{UInt64: Orb}
        access(contract) let masterVault: @FungibleToken.Vault
        access(contract) var bidders: @{Address: Bidder}
        access(contract) var prizes: @{UInt64: NonFungibleToken.NFT}
        access(contract) var meta: Meta

        init(vault: @FungibleToken.Vault, meta: Meta) {
            self.epochs = {}
            self.orbs <- {}
            self.masterVault <- vault
            self.bidders <- {}
            self.prizes <- {}
            self.meta = meta
        }

        // borrowOrb returns a reference to the Orb to the caller
        pub fun borrowOrb(_ orbID: UInt64): &Orb {
            return &self.orbs[orbID] as &Orb
        }

        // borrowCurrentEpoch returns a reference to the current 
        // Epoch to the caller
        pub fun borrowCurrentEpoch(): &Epoch {
            return &self.epochs[self.meta.currentEpoch] as &Epoch
        }

        // borrowCurrentEpoch returns a reference to the Epoch 
        // with the provided ID to the caller
        pub fun borrowEpoch(_ epoch: UInt64): &Epoch {
            return &self.epochs[epoch] as &Epoch
        }

        // addNewBidder adds a new Bidder resource to the Auction's
        // bidders dictionary
        access(contract) fun addNewBidder(
            address: Address,
            bidVault: @FungibleToken.Vault,
            vaultCap: Capability<&{FungibleToken.Receiver}>,
            collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>) {
            
            // Create the new Bidder resource
            let bidder <- create Bidder(
                address: address,
                bidVault: <-bidVault,
                vaultCap: vaultCap,
                collectionCap: collectionCap
            )

            // Add the resource to the bidders dictionary
            self.bidders[address] <-! bidder
        }

        // bidderExist returns false if there is no Bidder resource for the
        // provided address, otherwise it returns true
        access(contract) fun bidderExists(_ address: Address): Bool {
            if self.bidders[address] == nil {
                return false
            } else {
                return true
            }
        }

        // distributeBidTokens sends the tokens from the provided Vault to the
        // Orbs designated by the current Epoch distribution weights. Each Orb
        // gets a percentage of the tokens as determined by the current Epoch
        //
        access(contract) fun distributeBidTokens(_ vault: @FungibleToken.Vault) {
            
            // Store the initial balance of the provided Vault
            let initialBalance = vault.balance

            // Get the current Epoch weights
            let epoch = self.borrowCurrentEpoch()
            let weights = epoch.distribution.weights

            // For each Orb ID in the distribution weights dictionary...
            for id in weights.keys {

                // ...borrow a reference to the Orb
                let orb = self.borrowOrb(id)

                // ...calculate the tokens for the Orb by multiplying the
                // initial Vault balance by the distribution weight of the Orb
                let withdrawAmount = initialBalance * weights[id]!

                // ...withdraw the tokens from the provided Vault
                let tokens <- vault.withdraw(amount: withdrawAmount)

                // ...deposit the tokens in the Orb's Vault
                orb.vault.deposit(from: <-tokens)
                
                emit OrbBalanceIncreased(auctionID: self.meta.auctionID, orbID: orb.id, amount: withdrawAmount)
            }

            // Destroy the empty Vault
            destroy vault
        }

        // clearBidders removes all Bidder resources from the bidders dictionary
        access(contract) fun clearBidders() {

            // For each Bidder address in the bidders dictionary...
            for address in self.bidders.keys {

                // ...remove the Bidder from the dictionary
                let bidder <- self.bidders[address] <- nil

                // ...destroy the Bidder resource
                destroy bidder
            }
        }
        
        // getBidders returns a dictionary with the bidder's address and bidTotal
        access(contract) fun getBidders(): {Address: UFix64} {

            // Borrow a reference to the bidders dictionary
            let bidders = &self.bidders as &{Address: Bidder}

            // Create an empty dictionary to store the Bidder address
            // and bidVault balance
            let bidderMeta: {Address: UFix64} = {}
            
            // For each Bidder address in the bidders dictionary...
            for address in bidders.keys {

                // ...borrow a reference to the Bidder
                let bidder = &bidders[address] as &Bidder

                // ...store the Bidder address and Vault balance
                // in the bidderMeta dictionary
                bidderMeta[address] = bidder.bidVault.balance
            }
            
            // return the bidderMeta dictionary to the caller
            return bidderMeta
        }


        destroy() {
            // TODO: Safely destroy the auction resources by sending
            // FTs and NFTs back to their owners
            destroy self.orbs
            destroy self.bidders
            destroy self.masterVault
            destroy self.prizes
        }
    }

    // Orb contains the prizes from the auction as well as the Bidder
    // that eventually owns it
    pub resource Orb {
        pub let auctionID: UInt64
        pub let id: UInt64
        pub var bidder: @Bidder?
        pub var prize: @NonFungibleToken.NFT?
        pub var vault: @FungibleToken.Vault

        init(_ auctionID: UInt64, id: UInt64, vault: @FungibleToken.Vault) {
            self.auctionID = auctionID
            self.id = id
            self.bidder <- nil
            self.prize <- nil
            self.vault <- vault
        }

        // assignOwner takes a Bidder resource and adds it to the Orb
        access(contract) fun assignOwner(bidder: @Bidder) {
            pre {
                self.bidder == nil: "Orb already has an owner"
            }
            self.bidder <-! bidder
        }

        // assignPrize takes a NonFungibleToken resource and adds it to the Orb
        access(contract) fun assignPrize(prize: @NonFungibleToken.NFT) {
            pre {
                self.prize == nil: "Orb already has a prize"
            }
            self.prize <-! prize

            emit NewPrizeAddedToOrb(auctionID: self.auctionID, orbID: self.id, tokenID: self.prize?.id!)
        }

        // sendPrizeToOwner sends the NonFungibleToken Prize to the Orb owner if
        // a Prize exists and the owner has the proper Capability
        access(contract) fun sendPrizeToOwner() {
            pre {
                self.bidder != nil: "Orb has no owner"
            }

            // Get the Orb owner's NonFungibleToken Collection Capability
            let collectionCap = self.bidder?.collectionCap??
                panic("Orb owner has no collection capability")

            // Borrow a reference to the Orb owner's NonFungibleToken Collection
            let collectionRef = collectionCap.borrow()??
                panic("Couldn't borrow Orb owner collection reference")

            // If the Orb has a Prize...
            if let prize <- self.prize <- nil {

                // ...get the Prize ID
                let tokenID = prize.id

                // ...deposit the Prize into the Orb owner's NonFungibleToken Collection
                collectionRef.deposit(token: <-prize)

                emit OrbPrizeRedeemed(auctionID: self.auctionID, orbID: self.id, address: self.bidder?.address!, tokenID: tokenID)
            
            // ...if the Orb has no Prize
            } else {
                
                // ...log a message to the console for testing the contract
                log("Orb has no prize")
            }
        }

        // sendTokensToOwner send the balance of the Orb's Vault to the Orb owner's 
        // FungibleToken Vault if the Orb's Vault balance is greater than zero and
        // the Orb owner has the required Vault Capability
        //
        access(contract) fun sendTokensToOwner() {
            pre {
                self.vault.balance > UFix64(0): "Vault has no token balance"
            }

            // Get the Orb owner's FungibleToken Vault Recevier Capability
            let vaultCap = self.bidder?.vaultCap??
                panic("Orb owner has no vault receiver capability")

            // Borrow a reference to the owner's Vault Receiver
            let vaultRef = vaultCap.borrow()??
                panic("Couldn't borrow Orb owner vault receiver reference")

            // Withdraw the entire Vault balance from the Orb
            let vaultBalance = self.vault.balance
            let tokens <- self.vault.withdraw(amount: vaultBalance)

            // Deposit the FungibleTokens into the Orb owner's FungibleToken Vault
            vaultRef.deposit(from: <-tokens)

            emit OrbTokensRedeemed(auctionID: self.auctionID, orbID: self.id, address: self.bidder?.address!, amount: vaultBalance)
        }

        // logOwner logs the Orb owner's address to the console
        pub fun logOwner() {
            log(self.bidder?.address)
        }

        destroy() {
            // Safely destroy the Orb by sending the Prize and tokens to the Owner
            //
            // TODO: Add a solution for destroyed Orbs with no owner
            // - send Prizes back to OG seller
            self.sendPrizeToOwner()
            self.sendTokensToOwner()
            
            destroy self.bidder
            destroy self.prize
            destroy self.vault
        }
    }

    // Bidder contains a Vault and the capabilities used to send
    // prizes to the Bidder
    pub resource Bidder {

        // Address
        pub let address: Address

        // Bid Vault
        pub let bidVault: @FungibleToken.Vault

        // Capabilities
        pub let vaultCap: Capability<&{FungibleToken.Receiver}>
        pub let collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>

        init(
            address: Address,
            bidVault: @FungibleToken.Vault,
            vaultCap: Capability<&{FungibleToken.Receiver}>,
            collectionCap: Capability<&{NonFungibleToken.CollectionPublic}>
        ) {
            self.address = address
            self.bidVault <- bidVault
            self.vaultCap = vaultCap
            self.collectionCap = collectionCap
        }

        // returnBidderTokens withdraws the tokens from the Bidder's bidVault and
        // desposits them to the FungibleToken Vault Receiver the Bidder provided
        // when placing their bid
        //
        access(self) fun returnBidderTokens() {

            // Get the bidVault balance
            let vaultBalance = self.bidVault.balance

            // Borrow a reference to the bidder's Vault Receiver Capability
            let vaultReceiver = self.vaultCap.borrow()

            // Withdraw the tokens from the bidVault
            let vaultTokens <- self.bidVault.withdraw(amount: vaultBalance)

            // Deposit the tokens from the bidVault into the Bidder account's
            // FungibleToken Vault
            vaultReceiver!.deposit(from: <-vaultTokens)

            emit UnusedBidsReturned(address: self.address, amount: vaultBalance)
        }

        destroy() {
            
            // Return unused bidder tokens before destroying the Bidder resource
            self.returnBidderTokens()

            destroy self.bidVault
        }
    }

    // Meta contains the metadata for an Auction
    pub struct Meta {

        // Auction Settings
        pub let auctionID: UInt64
        pub let totalEpochs: UInt64
        pub let epochLength: UInt64

        // Auction State
        pub(set) var currentEpoch: UInt64
        pub(set) var auctionCompleted: Bool

        init(
            auctionID: UInt64,
            totalEpochs: UInt64,
            epochLengthInBlocks: UInt64
        ) {
            self.auctionID = auctionID
            self.totalEpochs = totalEpochs
            self.epochLength = epochLengthInBlocks

            /*
            **  TODO: This should start at 0. Once
            **  there are as many bidders as total
            **  Epochs in an auction, the first
            **  Epoch will be created.
            */
            self.currentEpoch = UInt64(1)
            self.auctionCompleted = false
        }
    }

    // Epoch represents a single cycle in the auction and contains the
    // weights used to distribute the tokens at the end of the cycle
    pub struct Epoch {

        pub let id: UInt64
        pub let endBlock: UInt64
        pub var distribution: Distribution

        init(id: UInt64, endBlock: UInt64) {
            self.id = id
            self.endBlock = endBlock
            self.distribution = Distribution(id)
        }
    }

    // Distribution calculates the weights used to distribute the tokens
    // at the end of an Epoch cycle
    pub struct Distribution {

        pub(set) var weights: {UInt64: UFix64}
        pub(set) var sumFactors: UInt64
        pub(set) var sqrtVal: UInt64

        init(_ epoch: UInt64) {
            self.weights = {}
            self.sumFactors = 0
            self.sqrtVal = 0

            // Update the field values on init
            self.updateFields(epoch)
        }

        // updateFields takes a number and calls each method to set
        // the field values as required. 
        //
        // Splitting these methods up and using static field
        // values helped increase the amount of Epochs we could calculate 
        // on-chain
        pub fun updateFields(_ n: UInt64) {

            // Set the floored square root value for the number
            self.sqrtVal = self.sqrt(n)

            // Set the sum of the number's factors
            self.sumFactors = self.sumOfFactors(n)

            // Set the number's distribution weights
            self.weights = self.getWeights(n)
        }

        // getWeights takes number and returns a dictionary of Orb IDs
        // and their calcualted distribution weights
        access(self) fun getWeights(_ n: UInt64): {UInt64: UFix64} {
            
            // Create an empty dictionary for the OrbIDs and distribution weights
            var weights: {UInt64: UFix64} = {}

            // Create an incrementor variable starting at 1
            var i = UInt64(1)
            
            // While the incrementor value is less than the incremented Epoch ID
            while i < n + UInt64(1) {
                
                // ...if the Epoch ID is evenly divisible by the incrementor
                if n % i == UInt64(0) {

                    // .. add the incrementor value to the weights dictionary as an ID
                    // and add the quotient of the incrementor divided by the sum of 
                    // the Epoch's factors as the distribution weight for the incrementor
                    weights[i] = (UFix64(i) / UFix64(self.sumFactors))
                }

                // ...increase the incrementor by 1
                i = i + UInt64(1)
            }

            // Return the weights dictionary to the caller
            return weights
        }

        // sumOfFactors takes a number as an argument and returns the sum of 
        // it's factors 
        access(self) fun sumOfFactors(_ n: UInt64): UInt64 {
            
            // If the number equals 1, return 1
            if n == UInt64(1) {
                return n
            }

            // Set the initial result to 0
            var res = UInt64(0)

            // Set an incrementor to 2 as we're handling a
            // case for 1 at the start of the method
            var i = UInt64(2)


            // While the incrementor is less than or equal 
            // to the square root value of the number
            while i <= self.sqrtVal {
                
                // ...if the number is evenly divisible by the incrementor...
                if n % i == UInt64(0) {

                    // ...if the incrementor is equal to the number divided
                    // by the incrementor...
                    if i == (n / i) {

                        // ... add the incrementor value to the result
                        res = res + i

                    // ...if the incrementor is not equal to the number divided
                    // by the incrementor
                    } else {

                        // ...divide the number by the incrementor, add the quotient
                        // to the incrementor and add it to the result
                        res = res + (i + n/i)
                    }
                }

                // Update the incrementor by one
                i = i + UInt64(1)
            }

            // Increment the number by one and add it to the result
            res = res + n + UInt64(1)

            // Return the result to the caller
            return res
        }

        // sqrt takes a number and returns the floored square root of the
        // provided number
        access(self) fun sqrt(_ n: UInt64): UInt64 {
            
            // If the number equals zero
            if n == UInt64(0) {

                // Return the number
                return n
            }

            // If the number equals one
            if n == UInt64(1) {

                // Return the number
                return n
            }

            // Set the inital result to one
            var res = UInt64(1)

            // Set an incrementor to one
            var i = UInt64(1)

            // While the result is less than or equal to the number
            while res <= n {

                // Add one tot he incrementor
                i = i + UInt64(1)

                // Set the result to the incrementor value squared
                res = i * i
            }

            // Subtract one from the incrementor and return it to the caller
            return i - UInt64(1)
        }
    }

    // createAuctionCollection returns a new AuctionCollection resource 
    // to the caller
    pub fun createAuctionCollection(): @AuctionCollection {
        let AuctionCollection <- create AuctionCollection()
        return <- AuctionCollection
    }

    init() {}   
}
 