// ForgeVault.cdc
//
// This is a complete version of the ForgeVault contract
// that includes withdraw and deposit functionality, as well as a
// collection resource that can be used to bundle NFTs together.


pub contract ForgeVault {

    // Declare the NFT resource type
    pub resource zCollar {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
        }
    }

    // We define this interface purely as a way to allow users
    // to create public, restricted references to their ForgeVault.
    // They would use this to only expose the deposit, getIDs,
    // and idExists fields in their ForgeVault
    pub resource interface FVReceiver {

        pub fun deposit(token: @zCollar)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the ForgeVault resource that
    // holds the NFTs that a user owns
    pub resource Collection: FVReceiver {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedzCollars: @{UInt64: zCollar}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedzCollars <- {}
        }

        // withdraw 
        //
        // Function that removes an NFT from the collection 
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @zCollar {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedzCollars.remove(key: withdrawID)!

            return <-token
        }

        // deposit 
        //
        // Function that takes a NFT as an argument and 
        // adds it to the forgevault dictionary
        pub fun deposit(token: @zCollar) {
            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedzCollars[token.id] <- token
            destroy oldToken
        }

        // idExists checks to see if a NFT 
        // with the given ID exists in the forgevault
        pub fun idExists(id: UInt64): Bool {
            return self.ownedzCollars[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedzCollars.keys
        }

        destroy() {
            destroy self.ownedzCollars
        }
    }

    // creates a new empty ForgeVault resource and returns it 
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    // zCollar Minter
    //
    // Resource that would be owned by an admin or by a smart contract 
    // that allows them to mint new zCollars when needed
    pub resource zCollarMinter {

        // the ID that is used to mint NFTs
        // it is only incremented so that NFT ids remain
        // unique. It also keeps track of the total number of NFTs
        // in existence
        pub var idCount: UInt64

        init() {
            self.idCount = 1
        }

        // mintzCollar 
        //
        // Function that mints a new NFT with a new ID
        // and deposits it in the recipients ForgeVault 
        // using their ForgeVault reference
        pub fun mintzCollar(recipient: &AnyResource{FVReceiver}) {

            // create a new NFT
            var newzCollar <- create zCollar(initID: self.idCount)
            
            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newzCollar)

            // change the id so that each ID is unique
            self.idCount = self.idCount + UInt64(1)
        }
    }

	init() {
		// store an empty NFT Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: /storage/ForgeVault)

        // publish a reference to the ForgeVault in storage
        self.account.link<&{FVReceiver}>(/public/FVReceiver, target: /storage/ForgeVault)

        // store a minter resource in account storage
        self.account.save(<-create zCollarMinter(), to: /storage/zCollarMinter)
	}
}