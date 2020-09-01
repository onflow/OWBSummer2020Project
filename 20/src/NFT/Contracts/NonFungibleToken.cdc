pub contract NonFungibleToken {


    // Declare the NFT resource type
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // String mapping to hold metadata
        pub var metadata: {String: String}

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
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

      // If a resource has member fields that are resources,
      // it is required to define a `destroy` block to specify
      // what should happen to those member fields
      // if the top level object is destroyed
      destroy() {
          destroy self.ownedNFTs
      }
  }

  // creates a new empty Collection resource and returns it 
  pub fun createEmptyCollection(): @Collection {
      return <- create Collection()
  }

  pub resource NFTMinter {

      // the ID that is used to mint NFTs
      // it is onlt incremented so that NFT ids remain
      // unique. It also keeps track of the total number of NFTs
      // in existence
      pub var idCount: UInt64

      init() {
          self.idCount = 1
      }


      // Function that mints a new NFT with a new ID
      // and deposits it in the recipients collection 
      // using their collection reference
      pub fun mintNFT(recipient: &AnyResource{NFTReceiver}) {
        
        
          // TODO Minting an NFT should be going the course of 'uploading' a picture and creating an NFT with it. Adding this NFT to your photo-collection which afterwards can be rated.

          // create a new NFT
          var newNFT <- create NFT(initID: self.idCount)

          // deposit it in the recipient's account using their reference
          recipient.deposit(token: <-newNFT)

          // change the id so that each ID is unique
          self.idCount = self.idCount + UInt64(1)
      }
  }

      pub resource interface Provider {
        pub fun withdraw(amount: UFix64): @Vault {
            post {
                // `result` refers to the return value of the function
                result.balance == UFix64(amount):
                    "Withdrawal amount must be the same as the balance of the withdrawn Vault"
            }
        }
    }
    pub resource interface Receiver {
        // deposit
        //
        // Function that can be called to deposit tokens 
        // into the implementing resource type
        //
        pub fun deposit(from: @Vault) {
            pre {
                from.balance > UFix64(0):
                    "Deposit balance must be positive"
            }
        }
    }

    // Balance
    //
    // Interface that specifies a public `balance` field for the vault
    //
    pub resource interface Balance {
        pub var balance: UFix64
    }


     pub resource Vault: Provider, Receiver, Balance {
        
		// keeps track of the total balance of the account's tokens
        pub var balance: UFix64

        // initialize the balance at resource creation time
        init(balance: UFix64) {
            self.balance = balance
        }

        // withdraw
        //
        // Function that takes an integer amount as an argument
        // and withdraws that amount from the Vault.
        //
        // It creates a new temporary Vault that is used to hold
        // the money that is being transferred. It returns the newly
        // created Vault to the context that called so it can be deposited
        // elsewhere.
        //
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            return <-create Vault(balance: amount)
        }
        
        // deposit
        //
        // Function that takes a Vault object as an argument and adds
        // its balance to the balance of the owners Vault.
        //
        // It is allowed to destroy the sent Vault because the Vault
        // was a temporary holder of the tokens. The Vault's balance has
        // been consumed and therefore can be destroyed.
        pub fun deposit(from: @Vault) {
            self.balance = self.balance + from.balance
            destroy from
        }
    }


  init() {
    // store an empty NFT Collection in account storage
    self.account.save<@Collection>(<-self.createEmptyCollection(), to: /storage/NFTCollection)

    // publish a reference to the Collection in storage
    self.account.link<&{NFTReceiver}>(/public/NFTReceiver, target: /storage/NFTCollection)

    // store a minter resource in account storage
    self.account.save<@NFTMinter>(<-create NFTMinter(), to: /storage/NFTMinter)

        // Create a single new NFT and save it to account storage
		self.account.save<@NFT>(<-create NFT(initID: 1), to: /storage/NFT1)
	
  }
}
 