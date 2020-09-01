/*
    Description: Smart Contract for Autograph

    authors: Alex Hansen alxo@floment.co

    This smart contract contains the core functionality for 
    Autographs, created by Flow Moment Company

    The contract manages the data associated with all the Autograph NFTs
    
    When Autographs are minted, they are initialized with a document string and
    author address.

    The contract also defines a Collection resource. This is an object that 
    every Autograph NFT owner will store in their account
    to manage their NFT collection.

    The main Autograph account will also have its own Autograph collections
    it can use to hold its own Autographs that have not yet been sent to a user.

    Note: All state changing functions will panic if an invalid argument is
    provided or one of its pre-conditions or post conditions aren't met.
    Functions that don't modify state will simply return 0 or nil 
    and those cases need to be handled by the caller.
*/

import NonFungibleToken from 0x01cf0e2f2f715450

pub contract Autograph: NonFungibleToken {

    // -----------------------------------------------------------------------
    // Autograph contract Events
    // -----------------------------------------------------------------------

    // Emitted when the Autograph contract is created
    pub event ContractInitialized()

    // Emitted when an Autograph is minted
    pub event AutographMinted(autographID: UInt64, document: String, author: Address)

    // Events for Collection-related actions
    //
    // Emitted when an Autograph is withdrawn from a Collection
    pub event Withdraw(id: UInt64, from: Address?)
    // Emitted when an Autograph is deposited into a Collection
    pub event Deposit(id: UInt64, to: Address?)

    // Emitted when an Autograph is destroyed
    pub event AutographDestroyed(id: UInt64)

    // -----------------------------------------------------------------------
    // Autograph contract-level fields.
    // These contain actual values that are stored in the smart contract.
    // -----------------------------------------------------------------------

    // The total number of Autograph NFTs that have been created
    // Because NFTs can be destroyed, it doesn't necessarily mean that this
    // reflects the total number of NFTs in existence, just the number that
    // have been minted to date. Also used as global Autograph IDs for minting.
    pub var totalSupply: UInt64

    // -----------------------------------------------------------------------
    // Autograph contract-level Composite Type definitions
    // -----------------------------------------------------------------------
    // These are just *definitions* for Types that this contract
    // and other accounts can use. These definitions do not contain
    // actual stored values, but an instance (or object) of one of these Types
    // can be created by this contract that contains stored values.
    // -----------------------------------------------------------------------

    // The resource that represents the Autograph NFTs
    //
    pub resource NFT: NonFungibleToken.INFT {

        // Global unique Autograph ID
        pub let id: UInt64
        
        // String of file content
        pub let document: String

        // Address of NFT minter
        pub let author: Address

        init(document: String, author: Address) {
            // Increment the global Autograph IDs
            Autograph.totalSupply = Autograph.totalSupply + UInt64(1)

            self.id = Autograph.totalSupply

            // Set the document string
            self.document = document

            // Set author address
            self.author = author

            emit AutographMinted(autographID: self.id, document: self.document, author: self.author)
        }

        // If the Autograph is destroyed, emit an event to indicate 
        // to outside observers that it has been destroyed
        destroy() {
            emit AutographDestroyed(id: self.id)
        }
    }

    // This is the interface that users can cast their Autograph Collection as
    // to allow others to deposit Autographs into their Collection. It also allows for reading
    // the IDs of Autographs in the Collection.
    pub resource interface AutographCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowAutograph(id: UInt64): &Autograph.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow Autograph reference: The ID of the returned reference is incorrect"
            }
        }
    }

    // Collection is a resource that every user who owns NFTs 
    // will store in their account to manage their NFTS
    //
    pub resource Collection: AutographCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic { 
        // Dictionary of Autograph conforming tokens
        // NFT is a resource type with a UInt64 ID field
        pub let ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        // withdraw removes an Autograph from the Collection and moves it to the caller
        //
        // Parameters: withdrawID: The ID of the NFT 
        // that is to be removed from the Collection
        //
        // returns: @NonFungibleToken.NFT the token that was withdrawn
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {

            // Remove the nft from the Collection
            let token <- self.ownedNFTs.remove(key: withdrawID) 
                ?? panic("Cannot withdraw: Autograph does not exist in the collection")

            emit Withdraw(id: token.id, from: self.owner?.address)
            
            // Return the withdrawn token
            return <-token
        }

        // batchWithdraw withdraws multiple tokens and returns them as a Collection
        //
        // Parameters: ids: An array of IDs to withdraw
        //
        // Returns: @NonFungibleToken.Collection: A collection that contains
        //                                        the withdrawn Autographs
        //
        pub fun batchWithdraw(ids: [UInt64]): @NonFungibleToken.Collection {
            // Create a new empty Collection
            var batchCollection <- create Collection()
            
            // Iterate through the ids and withdraw them from the Collection
            for id in ids {
                batchCollection.deposit(token: <-self.withdraw(withdrawID: id))
            }
            
            // Return the withdrawn tokens
            return <-batchCollection
        }

        // deposit takes an Autograph and adds it to the Collections dictionary
        //
        // Paramters: token: the NFT to be deposited in the collection
        //
        pub fun deposit(token: @NonFungibleToken.NFT) {
            
            // Cast the deposited token as an Autograph NFT to make sure
            // it is the correct type
            let token <- token as! @Autograph.NFT

            // Get the token's ID
            let id = token.id

            // Add the new token to the dictionary
            let oldToken <- self.ownedNFTs[id] <- token

            // Only emit a deposit event if the Collection 
            // is in an account's storage
            if self.owner?.address != nil {
                emit Deposit(id: id, to: self.owner?.address)
            }

            // Destroy the empty old token that was "removed"
            destroy oldToken
        }

        // batchDeposit takes a Collection object as an argument
        // and deposits each contained NFT into this Collection
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection) {

            // Get an array of the IDs to be deposited
            let keys = tokens.getIDs()

            // Iterate through the keys in the collection and deposit each one
            for key in keys {
                self.deposit(token: <-tokens.withdraw(withdrawID: key))
            }

            // Destroy the empty Collection
            destroy tokens
        }

        // getIDs returns an array of the IDs that are in the Collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        // borrowNFT Returns a borrowed reference to an Autograph in the Collection
        // so that the caller can read its ID
        //
        // Parameters: id: The ID of the NFT to get the reference for
        //
        // Returns: A reference to the NFT
        //
        // Note: This only allows the caller to read the ID of the NFT,
        // not any Autograph specific data. Please use borrowAutograph to 
        // read Autograph data.
        //
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        // borrowAutograph returns a borrowed reference to an Autograph
        // so that the caller can read data and call methods from it.
        // They can use this to read its fields.
        //
        // Parameters: id: The ID of the NFT to get the reference for
        //
        // Returns: A reference to the NFT
        pub fun borrowAutograph(id: UInt64): &Autograph.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &Autograph.NFT
            } else {
                return nil
            }
        }

        // If a transaction destroys the Collection object,
        // All the NFTs contained within are also destroyed!
        //
        destroy() {
            destroy self.ownedNFTs
        }
    }

    // The empty resource used to set the author without needing to pass AuthAccount
    // to Autograph mint funtion
    pub resource Author { }

    // -----------------------------------------------------------------------
    // Autograph contract-level function definitions
    // -----------------------------------------------------------------------

    // createEmptyCollection creates a new, empty Collection object so that
    // a user can store it in their account storage.
    // Once they have a Collection in their storage, they are able to receive
    // Autographs in transactions.
    //
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <-create Autograph.Collection()
    }

    // createAuthor creates a new, Author object so that
    // a user can mint an Autograph with their address.
    //
    pub fun createAuthor(): @Author {
        return <-create Author()
    }

    // mintAutograph mints a new Autograph and returns the newly minted Autograph
    // 
    // Parameters: document: String of Autograph file content
    //             author: Author resource reference to get author address
    //
    // Returns: The NFT that was minted
    // 
    pub fun mintAutograph(document: String, author: &Author): @NFT {
        return <-create NFT(document: document, author: author.owner!.address)
    }

    // -----------------------------------------------------------------------
    // Autograph initialization function
    // -----------------------------------------------------------------------
    //
    init() {
        // Initialize contract fields
        self.totalSupply = 0

        // Put a new Collection in storage
        self.account.save<@Collection>(<- create Collection(), to: /storage/AutographCollection)

        // Create a public capability for the Collection
        self.account.link<&{AutographCollectionPublic}>(/public/AutographCollection, target: /storage/AutographCollection)

        emit ContractInitialized()
    }
}
 