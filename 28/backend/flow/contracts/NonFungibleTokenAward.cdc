// NFTv2.cdc
//
// This is a complete version of the NonFungibleToken contract
// that includes withdraw and deposit functionality, as well as a
// collection resource that can be used to bundle NFTs together.
//
// It also includes a definition for the Minter resource,
// which can be used by admins to mint new NFTs.
//
// Learn more about non-fungible tokens in this tutorial: https://docs.onflow.org/docs/non-fungible-tokens

import FungibleToken from 0x01

pub contract NonFungibleToken {

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
        }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their NFT Collection.
    // They would use this to only expose the deposit, getIDs,
    // and idExists fields in their Collection
    pub resource interface NFTReceiver {

        pub fun deposit(token: @NFT)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns
    pub resource Collection: NFTReceiver {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NFT}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedNFTs <- {}
        }

        // withdraw 
        //
        // Function that removes an NFT from the collection 
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)!

            return <-token
        }

        // deposit 
        //
        // Function that takes a NFT as an argument and 
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[token.id] <- token
            destroy oldToken
        }

        // idExists checks to see if a NFT 
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // creates a new empty Collection resource and returns it 
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    pub fun purchase(recipient: &AnyResource{NonFungibleToken.NFTReceiver}, buyTokens: @FungibleToken.Vault) {
        pre {
            buyTokens.balance >= 1.0 : "Not enough tokens to by the NFT!"
        }

        let price = 1.0

        // let vaultRef = self.account.borrow<&FungibleToken.Vault{FungibleToken.Receiver}>(from: /storage/MainVault)

        let receiverRef = self.account.getCapability(/public/MainReceiver)!
                      .borrow<&FungibleToken.Vault{FungibleToken.Receiver}>()
                      ?? panic("Could not borrow a reference to the receiver")

        // deposit the purchasing tokens into the owners vault
        receiverRef.deposit(from: <-buyTokens)

        // deposit the NFT into the buyers collection
        // recipient.deposit(token: <-self.withdraw(tokenID: tokenID))
         // Borrow a capability for the NFTMinter in storage
        let minterRef = self.account.borrow<&NonFungibleToken.NFTMinter>(from: /storage/NFTMinter)
        ?? panic("Could not borrow minter reference")

        minterRef.mintNFT(recipient: recipient)

    }



    // NFTMinter
    //
    // Resource that would be owned by an admin or by a smart contract 
    // that allows them to mint new NFTs when needed
    pub resource NFTMinter {

        // the ID that is used to mint NFTs
        // it is onlt incremented so that NFT ids remain
        // unique. It also keeps track of the total number of NFTs
        // in existence
        pub var idCount: UInt64


        init() {
            self.idCount = 1
        }

        // mintNFT 
        //
        // Function that mints a new NFT with a new ID
        // and deposits it in the recipients collection 
        // using their collection reference
        pub fun mintNFT(recipient: &AnyResource{NFTReceiver}) {

            // create a new NFT
            var newNFT <- create NFT(initID: self.idCount)
            
            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            // change the id so that each ID is unique
            self.idCount = self.idCount + UInt64(1)
        }

    }

	init() {
		// store an empty NFT Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: /storage/NFTCollection)

        // publish a reference to the Collection in storage
        self.account.link<&{NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

        // store a minter resource in account storage
        self.account.save(<-create NFTMinter(), to: /storage/NFTMinter)

        // Create a vault to store tokens used to purchase awards
        // Create a new empty Vault object
        let vaultA <- FungibleToken.createEmptyVault()
        // Store the vault in the account storage
        self.account.save<@FungibleToken.Vault>(<-vaultA, to: /storage/MainVault)
        self.account.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)

        // let vaultRef = self.account.borrow<&FungibleToken.Vault>(from: /storage/MainVault)


        // self.account.save(<-create NFTMinter(), to: /storage/NFTMinter)
        // Borrow a reference to the stored Vault
        
        // let receiver = self.account.borrow<&{FungibleToken.Receiver}>(from: /storage/MainVault)
        //     ?? panic("Could not borrow owner's vault reference")

        // let awardHandler <- create AwardPurchaseHandler(vault)

        // self.account.link<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance}>(/public/MainReceiver, target: /storage/MainVault)
        log("Empty Vault stored")
	}
}
 
