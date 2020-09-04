pub contract interface NonFungibleToken {

    // The total number of tokens of this type in existence
    pub var totalSupply: UInt64

    pub event ContractInitialized()

    pub event Withdraw(id: UInt64, from: Address?)

    pub event Deposit(id: UInt64, to: Address?)

    pub resource interface INFT {
        // The unique ID that each NFT has
        pub let id: UInt64
    }

    pub resource NFT: INFT {
        pub let id: UInt64
    }

    pub resource interface Provider {
        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(withdrawID: UInt64): @NFT {
            post {
                result.id == withdrawID: "The ID of the withdrawn token must be the same as the requested ID"
            }
        }
    }

    // Interface to mediate deposits to the Collection
    //
    pub resource interface Receiver {

        // deposit takes an NFT as an argument and adds it to the Collection
        //
		pub fun deposit(token: @NFT)
    }

    pub resource interface CollectionPublic {
        pub fun deposit(token: @NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NFT
    }

    // Requirement for the the concrete resource type
    // to be declared in the implementing contract
    //
    pub resource Collection: Provider, Receiver, CollectionPublic {

        // Dictionary to hold the NFTs in the Collection
        pub var ownedNFTs: @{UInt64: NFT}

        // withdraw removes an NFT from the collection and moves it to the caller
        pub fun withdraw(withdrawID: UInt64): @NFT

        // deposit takes a NFT and adds it to the collections dictionary
        // and adds the ID to the id array
        pub fun deposit(token: @NFT)

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64]

        // Returns a borrowed reference to an NFT in the collection
        // so that the caller can read data and call methods from it
        pub fun borrowNFT(id: UInt64): &NFT {
            pre {
                self.ownedNFTs[id] != nil: "NFT does not exist in the collection!"
            }
        }
    }

    // createEmptyCollection creates an empty Collection
    // and returns it to the caller so that they can own NFTs
    pub fun createEmptyCollection(): @Collection {
        post {
            result.getIDs().length == 0: "The created collection must be empty!"
        }
    }
}

pub contract Creature: NonFungibleToken {

      pub var totalSupply: UInt64

      // emit Converted(id: Creature.totalSupply, ethid: ethID)
      pub event Converted(id: UInt64, ethTokenId: UInt64, address: Address?)

      pub event ContractInitialized()
      pub event Withdraw(id: UInt64, from: Address?)
      pub event Deposit(id: UInt64, to: Address?)

      pub resource interface INFT {
          pub let ethTokenId: UInt64
          pub let name: String
          pub let symbol: String
          pub let baseTokenURI: String
      }

      pub resource NFT: Creature.INFT, NonFungibleToken.INFT {
          pub let id: UInt64
          pub let ethTokenId: UInt64
          pub let name: String
          pub let symbol: String
          pub let baseTokenURI: String

          init(initID: UInt64, ethTokenID: UInt64) {
              self.id = initID
              self.ethTokenId = ethTokenID
              self.name = "Creature"
              self.symbol = "OSC"
              self.baseTokenURI = "https://creatures-api.opensea.io/api/creature/";
          }
      }

      pub resource interface CollectionPublic {
          pub fun borrowCreature(id: UInt64): &Creature.NFT
      }

      pub resource Collection: Creature.CollectionPublic ,NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
          // dictionary of NFT conforming tokens
          // NFT is a resource type with an ID field
          pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

          init () {
              self.ownedNFTs <- {}
          }

          // withdraw removes an NFT from the collection and moves it to the caller
          pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
              let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

              emit Withdraw(id: token.id, from: self.owner?.address)

              return <-token
          }

          // deposit takes a NFT and adds it to the collections dictionary
          // and adds the ID to the id arrayowner?.address
          pub fun deposit(token: @NonFungibleToken.NFT) {
              let token <- token as! @Creature.NFT

              let id: UInt64 = token.id

              // add the new token to the dictionary which removes the old one
              let oldToken <- self.ownedNFTs[id] <- token

              emit Deposit(id: id, to: self.owner?.address)

              destroy oldToken
          }

          // getIDs returns an array of the IDs that are in the collection
          pub fun getIDs(): [UInt64] {
              return self.ownedNFTs.keys
          }

          // borrowNFT gets a reference to an NFT in the collection
          // so that the caller can read its metadata and call its methods
          pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
              return &self.ownedNFTs[id] as &NonFungibleToken.NFT
          }


          pub fun borrowCreature(id: UInt64): &Creature.NFT {
              pre {
                  self.ownedNFTs[id] != nil: "NFT does not exist in the collection!"
              }
              let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
              return ref as! &Creature.NFT
              //return &self.ownedNFTs[id] as! &Creature.NFT
          }


          destroy() {
              destroy self.ownedNFTs
          }
      }

      // public function that anyone can call to create a new empty collection
      pub fun createEmptyCollection(): @NonFungibleToken.Collection {
          return <- create Collection()
      }

      // Resource that an admin or something similar would own to be
      // able to mint new NFTs
      //
    pub resource NFTMinter {

      // mapping of ethTokenID to flowID
      pub var mintedNFTs: {UInt64: UInt64}

      init(){
          self.mintedNFTs = {}
      }

      // checks if flow token with some eth ID is already minted or not
      pub fun ethIdExists(ethTokenId: UInt64): Bool {
          if(self.mintedNFTs[ethTokenId] ==  nil){
              return false;
          }else{
              return true;
          }
      }

      // returns equivalent flow token ID if the given ethereum token ID is already minted
      pub fun getFlowIdforEthId(ethTokenId: UInt64): UInt64 {
          pre {
             self.mintedNFTs[ethTokenId] != nil: "Flow Creature with given Ethereum Token ID doesn't exist !"
          }
          return self.mintedNFTs[ethTokenId] ?? UInt64(0)
      }

      // mintNFT mints a new NFT with a new ID
      // and deposit it in the recipients collection using their collection reference
      pub fun mintNFT(recipient: &{NonFungibleToken.CollectionPublic}, ethTokenId: UInt64) {

        pre {
            self.mintedNFTs[ethTokenId] == nil: "Flow Creature with this ethereum ID is already minted !"
        }

        Creature.totalSupply = Creature.totalSupply + UInt64(1)

        // create a new NFT
        var newNFT <- create NFT(initID: Creature.totalSupply, ethTokenID: ethTokenId)

        // deposit it in the recipient's account using their reference
        recipient.deposit(token: <-newNFT)

        emit Converted(id: Creature.totalSupply, ethTokenId: ethTokenId, address: recipient.owner?.address)

        // update to minted NFTs
        self.mintedNFTs[ethTokenId] = Creature.totalSupply
      }
    }

    init() {
          // Initialize the total supply
          self.totalSupply = 0

          // Create a Collection resource and save it to storage
          let collection <- create Collection()
          self.account.save(<-collection, to: /storage/NFTCollection)

          // create a public capability for the collection
          self.account.link<&{NonFungibleToken.CollectionPublic}>(
              /public/NFTCollection,
              target: /storage/NFTCollection
          )

          // Create a Minter resource and save it to storage
          let minter <- create NFTMinter()
          self.account.save(<-minter, to: /storage/NFTMinter)

          emit ContractInitialized()
          log("Creature deployed")
    }
}
