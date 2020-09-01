// NonFungibleToken.cdc
//
// This is a complete version of the NonFungibleToken contract
// that includes withdraw and deposit functionality, as well as a
// collection resource that can be used to bundle NFTs together.
//
// It also includes a definition for the Minter resource,
// which can be used by admins to mint new NFTs.
//
// Learn more about non-fungible tokens in this tutorial: https://docs.onflow.org/docs/non-fungible-tokens

pub contract NonFungibleToken {

    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64
        // The retailer that this NFT was minted from
        pub let retailer: String
        // The item that this NFT represents
        pub(set) var item: String

        // Initialize both fields in the init function
        init(initID: UInt64, initRetailer: String, initItem: String) {
            self.id = initID
            self.retailer = initRetailer
            self.item = initRetailer.concat(":").concat(initItem)
        }
    }

    pub resource ReferenceNFT {
        // The UCV value of the NFT
        pub var UCV: UFix64

        // The CV at each Retailer. Maps Retailer name -> CV there
        pub var CV: {String: UFix64}

        pub fun purchase(retailer: String) {
            self.UCV = self.UCV + UFix64(1)

            // Checks to see if it already exists using optional binding
            if let mapper = self.CV[retailer] {
                self.CV[retailer] = self.CV[retailer]! + UFix64(1)
            } else {
                self.CV[retailer] = UFix64(1)
            }
        }

        pub fun ad(retailer: String) {
            self.UCV = self.UCV + UFix64(0.5)

            // Checks to see if it already exists using optional binding
            if let mapper = self.CV[retailer] {
                self.CV[retailer] = self.CV[retailer]! + UFix64(0.5)
            } else {
                self.CV[retailer] = UFix64(0.5)
            }
        }

        init() {
            self.UCV = UFix64(0)
            self.CV = {}
        }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their NFT Collection.
    // They would use this to only expose the deposit, getIDs,
    // and idExists fields in their Collection
    pub resource interface NFTReceiver {

        pub fun deposit(token: @NFT)

        pub fun getItems(): [String]

        pub fun itemExists(item: String): Bool
    }

    pub resource interface ReferenceUser {
        pub var myReferenceNFT: @ReferenceNFT
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns
    pub resource Collection: NFTReceiver, ReferenceUser {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{String: NFT}

        // this is the reference NFT that we want put in the Collection, it holds the UCV value 
        // for each customer
        pub var myReferenceNFT: @ReferenceNFT

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedNFTs <- {}
            self.myReferenceNFT <- create ReferenceNFT()
        }

        // withdraw 
        //
        // Function that removes an NFT from the collection 
        // and moves it to the calling context
        pub fun withdraw(withdrawItem: String): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawItem)!

            return <-token
            
        }

        // deposit 
        //
        // Function that takes a NFT as an argument and 
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // If an NFT already exists with the same name, the dictionary will replace it,
            // which we don't want to happen. This will add a number to the end of it so we can
            // count how many of the NFTs we have, and make sure they don't get replaced by other
            // NFTs with the same name!
            var replacer = 2
            while self.ownedNFTs.keys.contains(token.item) {
                log(token.item)
                token.item = token.item.concat(replacer.toString())
                replacer = replacer + 1
            }

            // first remove the old token by indexing the dictionary, THEN put the new token there, and then destroy
            // the old token.
            let oldToken <- self.ownedNFTs[token.item] <- token
            destroy oldToken
        }

        // idExists checks to see if a NFT 
        // with the given ID exists in the collection
        pub fun itemExists(item: String): Bool {
            return self.ownedNFTs[item] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getItems(): [String] {
            return self.ownedNFTs.keys
        }

        destroy() {
            destroy self.ownedNFTs
            destroy self.myReferenceNFT
        }
    }

    // creates a new empty Collection resource and returns it 
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
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

        pub var name: String

        init(name: String) {
            self.idCount = 1
            self.name = name
        }

        // mintNFT 
        //
        // Function that mints a new NFT with a new ID
        // and deposits it in the recipients collection 
        // using their collection reference
        pub fun mintNFT(recipient: &AnyResource{NFTReceiver}, item: String) {

            // create a new NFT
            var newNFT <- create NFT(initID: self.idCount, initRetailer: self.name, initItem: item)
            
            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            // change the id so that each ID is unique
            self.idCount = self.idCount + UInt64(1)
        }
    }

    // A function for retailers that allows them to use this minter to mint NFTs and give them to
    // their customers
    pub fun createNFTMinter(name: String): @NFTMinter {
        return <- create NFTMinter(name: name)
    }

	init() {

	}
}
 
