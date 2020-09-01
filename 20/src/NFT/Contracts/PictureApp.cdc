/*
    //This contract has been adapted from the Picture contract.
    Description: Central Smart Contract for NFT PICTURES

    authors: Hendrik Van Eetvelde

    This smart contract contains the core functionality for 
    the NFT Picture Collection App

    The contract manages the data associated with all the Pictures and pictureCollections of pictures

    When a new Picture wants to be added to the records, an Admin creates
    a new Picture struct that is stored in the smart contract.

    Then an Admin can create new PictureCollections. PictureCollections consist of a public struct that 
    contains public information about a pictureCollections, and a private resource used
    to mint new moments based off of pictures that have been linked to the pictureCollections.

    The admin resource has the power to do all of the important actions
    in the smart contract. When admins want to call functions in a pictureCollections,
    they call their borrowPictureCollection function to get a reference 
    to a pictureCollections in the contract. Then, they can call functions on the pictureCollections using that reference.
    
    When moments are minted, they are initialized with a MomentData struct and
    are returned by the minter.

    The contract also defines a Collection resource. This is an object that 
    every Picture NFT owner will store in their account
    to manage their NFT collection.

    The main Picture NFT account will also have its own Picture NFT collections
    it can use to hold its own Pictures that have not yet been sent to a user.

    Note: All state changing functions will panic if an invalid argument is
    provided or one of its pre-conditions or post conditions aren't met.
    Functions that don't modify state will simply return 0 or nil 
    and those cases need to be handled by the caller.

*/

import NonFungibleToken from 0x179b6b1cb6755e31
pub contract PictureApp {

    // -----------------------------------------------------------------------
    // PictureApp contract Events
    // -----------------------------------------------------------------------

    // Emitted when the PictureApp contract is created
    pub event ContractInitialized()

    // Emitted when a new Picture struct is created
    pub event PictureCreated(id: UInt32, metadata: {String:String})

    // Emitted when a new series has been triggered by an admin
    pub event NewPictureCollectionStarted(newPictureCollection: UInt32)

    // Events for PictureCollection-Related actions
    //
    // Emitted when a new PictureCollection is created
    pub event PictureCollectionCreated(setID: UInt32, collectionSeries:UInt32)

    // Emitted when a new Picture is added to a PictureCollection
    pub event PictureAddedToPictureCollection(setID: UInt32, pictureID: UInt32)

    // Emitted when a PictureCollection is locked, meaning Pictures cannot be added
    pub event PictureCollectionLocked(setID: UInt32)

    // Emitted when a Moment is minted from a Set
    pub event MomentMinted(momentID: UInt64, pictureID: UInt32, setID: UInt32, serialNumber: UInt32)

    // Many PictureCollections can exist at a time, but only one can be active.
    pub var currentPictureCollection: UInt32

    // -----------------------------------------------------------------------
    // PictureApp contract-level fields.
    // These contain actual values that are stored in the smart contract.
    // -----------------------------------------------------------------------

    // Variable size dictionary of Picture structs
    access(self) var pictureDatas: {UInt32: Picture}

    // Variable size dictionary of PictureCollectionData structs
    access(self) var setDatas: {UInt32: PictureCollectionData}

    // Variable size dictionary of PictureCollection resources
    access(self) var sets: @{UInt32: PictureCollection}

    // Emitted when a moment is withdrawn from a Collection
    pub event Withdraw(id: UInt64, from: Address?)
    
    // Emitted when a moment is deposited into a Collection
    pub event Deposit(id: UInt64, to: Address?)

    // The ID that is used to create Pictures. 
    // Every time a Picture is created, pictureID is assigned 
    // to the new Picture's ID and then is incremented by 1.
    pub var nextPictureID: UInt32

    // The ID that is used to create PictureCollections. Every time a PictureCollection is created
    // setID is assigned to the new PictureCollection's ID and then is incremented by 1.
    pub var nextPictureCollectionID: UInt32


    // The total number of Photo Moment NFTs that have been created
    // Because NFTs can be destroyed, it doesn't necessarily mean that this
    // reflects the total number of NFTs in existence, just the number that
    // have been minted to date. Also used as global moment IDs for minting.
    pub var totalSupply: UInt64

    // -----------------------------------------------------------------------
    // PictureApp contract-level Composite Type definitions
    // -----------------------------------------------------------------------
    // These are just *definitions* for Types that this contract
    // and other accounts can use. These definitions do not contain
    // actual stored values, but an instance (or object) of one of these Types
    // can be created by this contract that contains stored values.
    // -----------------------------------------------------------------------

    // Picture is a Struct that holds metadata associated 
    // with a specific Picture

    // Moment NFTs will all reference a single Picture as the owner of
    // its metadata. The pictures are publicly accessible, so anyone can
    // read the metadata associated with a specific Picture ID
    
    pub struct Picture {

        // The unique ID for the Picture
        pub let pictureID: UInt32

        // Stores all the metadata about the picture as a string mapping
        // This is not the long term way NFT metadata will be stored. It's a temporary
        // construct while we figure out a better way to do metadata.
    
        pub let metadata: {String: String}

        

        init(metadata: {String: String}) {
            pre {
                metadata.length != 0: "New Picture metadata cannot be empty"
            }
            self.pictureID = PictureApp.nextPictureID
            self.metadata = metadata
           

            // Increment the ID so that it isn't used again
            PictureApp.nextPictureID = PictureApp.nextPictureID + UInt32(1)

            emit PictureCreated(id: self.pictureID, metadata: metadata)
        }
    }

    // A PictureCollection is a grouping of Pictures 
    // that make up a related group of collectible pictures
    //
    // PictureCollectionData is a struct that is stored in a field of the contract.
    // Anyone can query the constant information
    // about a PictureCollection by calling various getters located 
    // at the end of the contract. Only the admin has the ability 
    // to modify any data in the private PictureCollection resource.
    //
    pub struct PictureCollectionData {

        // Unique ID for the PictureCollection
        pub let setID: UInt32

        // Name of the PictureCollection
        pub let name: String

          // Series that this Set belongs to.
        // Series is a concept that indicates a group of Sets through time.
        // Many Sets can exist at a time, but only one series.
        pub let series: UInt32

        init(name: String) {
            pre {
                name.length > 0: "New PictureCollection name cannot be empty"
            }
            self.setID = PictureApp.nextPictureCollectionID
            self.name = name
            self.series = PictureApp.currentPictureCollection

            // Increment the setID so that it isn't used again
            PictureApp.nextPictureCollectionID = PictureApp.nextPictureCollectionID + UInt32(1)

            emit PictureCollectionCreated(setID: self.setID, collectionSeries: self.series)
        }
    }

    // PictureCollection is a resource type that contains the functions to add and remove
    // Pictures from a PictureCollection and mint Moments.
    //
    // It is stored in a private field in the contract so that
    // the admin resource can call its methods.
    //
    // The admin can add Pictures to a PictureCollection so that the PictureCollection can mint Moments
    // that reference that playdata.
    // The Moments that are minted by a PictureCollection will be listed as belonging to
    // the PictureCollection that minted it, as well as the Picture it references.
    // 
    // Admin can also retire Pictures from the PictureCollection, meaning that the retired
    // Picture can no longer have Moments minted from it.
    //
    // If the admin locks the PictureCollection, no more Pictures can be added to it, but 
    // Moments can still be minted.
    //
    // If retireAll() and lock() are called back-to-back, 
    // the PictureCollection is closed off forever and nothing more can be done with it.
    pub resource PictureCollection {

        // Unique ID for the PictureCollection
        pub let setID: UInt32

        // Array of pictures that are a part of this PictureCollection.
        // When a Picture is added to the PictureCollection, its ID gets appended here.
        // The ID does not get removed from this array when a Picture is retired.
        pub var pictures: [UInt32]

        // Map of Picture IDs that Indicates if a Picture in this PictureCollection can be minted.
        // When a Picture is added to a PictureCollection, it is mapped to false (not retired).
        // When a Picture is retired, this is PictureCollection to true and cannot be changed.
        pub var retired: {UInt32: Bool}

        // Indicates if the PictureCollection is currently locked.
        // When a PictureCollection is created, it is unlocked 
        // and Pictures are allowed to be added to it.
        // When a PictureCollection is locked, Pictures cannot be added.
        // A PictureCollection can never be changed from locked to unlocked,
        // the decision to lock a PictureCollection it is final.
        // If a PictureCollection is locked, Pictures cannot be added, but
        // Moments can still be minted from Pictures
        // that exist in the PictureCollection.
        pub var locked: Bool

        // Mapping of Picture IDs that indicates the number of Moments 
        // that have been minted for specific Pictures in this PictureCollection.
        // When a Moment is minted, this value is stored in the Moment to
        // show its place in the PictureCollection, eg. 13 of 60.
        pub var numberMintedPerPlay: {UInt32: UInt32}

        init(name: String) {
            self.setID = PictureApp.nextPictureCollectionID
            self.pictures = []
            self.retired = {}
            self.locked = false
            self.numberMintedPerPlay = {}

            // Create a new PictureCollectionData for this PictureCollection and store it in contract storage
            PictureApp.setDatas[self.setID] = PictureCollectionData(name: name)
        }

        // addPicture adds a picture to the PictureCollection
        //
        // Parameters: pictureID: The ID of the Picture that is being added
        //
        // Pre-Conditions:
        // The Picture needs to be an existing Picture
        // The PictureCollection needs to be not locked
        // The Picture can't have already been added to the PictureCollection
        //
        pub fun addPicture(pictureID: UInt32) {
            pre {
                PictureApp.pictureDatas[pictureID] != nil: "Cannot add the Picture to PictureCollection: Picture doesn't exist."
                !self.locked: "Cannot add the Picture to the PictureCollection after the PictureCollection has been locked."
                self.numberMintedPerPlay[pictureID] == nil: "The Picture has already beed added to the PictureCollection."
            }

            // Add the Picture to the array of Pictures
            self.pictures.append(pictureID)

            // Open the Picture up for minting
            self.retired[pictureID] = false

            // Initialize the Moment count to zero
            self.numberMintedPerPlay[pictureID] = 0

            emit PictureAddedToPictureCollection(setID: self.setID, pictureID: pictureID)
        }

        // addPlays adds multiple Pictures to the PictureCollection
        //
        // Parameters: playIDs: The IDs of the Pictures that are being added
        //                      as an array
        //
        pub fun addPlays(playIDs: [UInt32]) {
            for picture in playIDs {
                self.addPicture(pictureID: picture)
            }
        }


        // lock() locks the PictureCollection so that no more Pictures can be added to it
        //
        // Pre-Conditions:
        // The PictureCollection should not be locked
        pub fun lock() {
            if !self.locked {
                self.locked = true
                emit PictureCollectionLocked(setID: self.setID)
            }
        }

        // mintMoment mints a new Moment and returns the newly minted Moment
        // 
        // Parameters: pictureID: The ID of the Picture that the Moment references
        //
        // Pre-Conditions:
        // The Picture must exist in the PictureCollection and be allowed to mint new Moments
        //
        // Returns: The NFT that was minted
        // 
        pub fun mintMoment(pictureID: UInt32): @NFT {
            pre {
                self.retired[pictureID] != nil: "Cannot mint the moment: This Picture doesn't exist."
                !self.retired[pictureID]!: "Cannot mint the moment from this Picture: This Picture has been retired."
            }

            // Gets the number of Moments that have been minted for this Picture
            // to use as this Moment's serial number
            let numInPlay = self.numberMintedPerPlay[pictureID]!

            // Mint the new moment
            let newMoment: @NFT <- create NFT(serialNumber: numInPlay + UInt32(1),
                                              pictureID: pictureID,
                                              setID: self.setID)

            // Increment the count of Moments minted for this Picture
            self.numberMintedPerPlay[pictureID] = numInPlay + UInt32(1)

            return <-newMoment
        }

        // batchMintMoment mints an arbitrary quantity of Moments 
        // and raeturns them as a Collection
        //
        // Parameters: pictureID: the ID of the Picture that the Moments are minted for
        //             quantity: The quantity of Moments to be minted
        //
        // Returns: Collection object that contains all the Moments that were minted
        //
        pub fun batchMintMoment(pictureID: UInt32, quantity: UInt64): @Collection {
            let newCollection <- create Collection()

            var i: UInt64 = 0
            while i < quantity {
                newCollection.deposit(token: <-self.mintMoment(pictureID: pictureID))
                i = i + UInt64(1)
            }

            return <-newCollection
        }
    }

    pub struct MomentData {

        // The ID of the PictureCollection that the Moment comes from
        pub let setID: UInt32

        // The ID of the Picture that the Moment references
        pub let pictureID: UInt32

        // The place in the edition that this Moment was minted
        // Otherwise know as the serial number
        pub let serialNumber: UInt32

        init(setID: UInt32, pictureID: UInt32, serialNumber: UInt32) {
            self.setID = setID
            self.pictureID = pictureID
            self.serialNumber = serialNumber
        }

    }

    // The resource that represents the Moment NFTs
    //
    pub resource NFT {

        // Global unique moment ID
        pub let id: UInt64
        
        // Struct of Moment metadata
        pub let data: MomentData

        init(serialNumber: UInt32, pictureID: UInt32, setID: UInt32) {
            // Increment the global Moment IDs
            PictureApp.totalSupply = PictureApp.totalSupply + UInt64(1)

            self.id = PictureApp.totalSupply

            // PictureCollection the metadata struct
            self.data = MomentData(setID: setID, pictureID: pictureID, serialNumber: serialNumber)

            emit MomentMinted(momentID: self.id, pictureID: pictureID, setID: self.data.setID, serialNumber: self.data.serialNumber)
        }
    }

    // Admin is a special authorization resource that 
    // allows the owner to perform important functions to modify the 
    // various aspects of the Pictures, PictureCollections, and Moments
    //
    pub resource Admin {

        // createPlay creates a new Picture struct 
        // and stores it in the Pictures dictionary in the Picture smart contract
        //
        // Parameters: metadata: A profile view of the Photo
        //                       example: {"John", "Christmas Tree", "2017"}
        //                               (remember the year John tripped over the Christmas lights, haha)
        //
        // Returns: the ID of the new Picture object 
        //
        pub fun createPicture(metadata: {String: String}): UInt32 {
            // Create the new Picture
            var newPicture = Picture(metadata: metadata)
            let newID = newPicture.pictureID

            // Store it in the contract storage
            PictureApp.pictureDatas[newID] = newPicture

            return newID
        }




        // createPictureCollection creates a new PictureCollection resource and stores it
        // in the sets mapping in the Picture contract
        //
        // Parameters: name: The name of the PictureCollection
        //
        pub fun createPictureCollection(name: String) {
            // Create the new PictureCollection
            var newPictureCollection <- create PictureCollection(name: name)

            // Store it in the sets mapping field
            PictureApp.sets[newPictureCollection.setID] <-! newPictureCollection
        }


        // startNewPictureCollection ends the current pictureCollection by incrementing
        // the pictureCollection number, meaning that Moments minted after this
        // will use the new pictureCollection number
        //
        // Returns: The new pictureCollection number
        //
        pub fun startNewPictureCollection(): UInt32 {
            // End the current pictureCollection and start a new one
            // by incrementing the Picture pictureCollection number
            PictureApp.currentPictureCollection = PictureApp.currentPictureCollection + UInt32(1)

            emit NewPictureCollectionStarted(newPictureCollection: PictureApp.currentPictureCollection)

            return PictureApp.currentPictureCollection
        }

        // createNewAdmin creates a new Admin resource
        //
        pub fun createNewAdmin(): @Admin {
            return <-create Admin()
        }
    }

    // This is the interface that users can cast their NFT Collection as
    // to allow others to deposit NFT's into their Collection. It also allows for reading
    // the IDs of NFT's in the Collection.
    pub resource interface PictureNFTCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowMoment(id: UInt64): &PictureApp.NFT? {
            // If the result isn't nil, the id of the returned reference
            // should be the same as the argument to the function
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow Moment reference: The ID of the returned reference is incorrect"
            }
        }
    }

    // Collection is a resource that every user who owns NFTs 
    // will store in their account to manage their NFTS
    
    pub resource Collection { 
        // Dictionary of Moment conforming tokens
        // NFT is a resource type with a UInt64 ID field
        pub var ownedNFTs: @{UInt64: PictureApp.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        // withdraw removes an Moment from the Collection and moves it to the caller
        //
        // Parameters: withdrawID: The ID of the NFT 
        // that is to be removed from the Collection
        //
        // returns: @NonFungibleToken.NFT the token that was withdrawn
        pub fun withdraw(withdrawID: UInt64): @PictureApp.NFT {

            // Remove the nft from the Collection
            let token <- self.ownedNFTs.remove(key: withdrawID) 
                ?? panic("Cannot withdraw: Moment does not exist in the collection")

            emit Withdraw(id: token.id, from: self.owner?.address)
            
            // Return the withdrawn token
            return <-token
        }

        // batchWithdraw withdraws multiple tokens and returns them as a Collection
        //
        // Parameters: ids: An array of IDs to withdraw
        //
        // Returns: @NonFungibleToken.Collection: A collection that contains
        //                                        the withdrawn moments
        //
        pub fun batchWithdraw(ids: [UInt64]): @PictureApp.Collection {
            // Create a new empty Collection
            var batchCollection <- create Collection()
            
            // Iterate through the ids and withdraw them from the Collection
            for id in ids {
                batchCollection.deposit(token: <-self.withdraw(withdrawID: id))
            }
            
            // Return the withdrawn tokens
            return <-batchCollection
        }

        // deposit takes a Moment and adds it to the Collections dictionary
        //
        // Paramters: token: the NFT to be deposited in the collection
        //
        pub fun deposit(token: @PictureApp.NFT) {
            
            // Cast the deposited token as a Picture NFT to make sure
            // it is the correct type
            let token <- token as! @PictureApp.NFT

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
        pub fun batchDeposit(tokens: @PictureApp.Collection) {

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

        // borrowNFT Returns a borrowed reference to a Moment in the Collection
        // so that the caller can read its ID
        //
        // Parameters: id: The ID of the NFT to get the reference for
        //
        // Returns: A reference to the NFT
        //
        // Note: This only allows the caller to read the ID of the NFT,
        // not any Picture specific data. Please use borrowMoment to 
        // read Moment data.
        //
        pub fun borrowNFT(id: UInt64): &PictureApp.NFT {
            return &self.ownedNFTs[id] as &PictureApp.NFT
        }



        // If a transaction destroys the Collection object,
        // All the NFTs contained within are also destroyed!
        // Much like when Damien Lillard destroys the hopes and
        // dreams of the entire city of Houston.
        //
        destroy() {
            destroy self.ownedNFTs
        }
    }

    // -----------------------------------------------------------------------
    // Picture contract-level function definitions
    // -----------------------------------------------------------------------

    // createEmptyCollection creates a new, empty Collection object so that
    // a user can store it in their account storage.
    // Once they have a Collection in their storage, they are able to receive
    // Moments in transactions.
    //
    pub fun createEmptyCollection(): @PictureApp.Collection {
        return <-create PictureApp.Collection()
    }

    // getAllPlays returns all the pictures in Picture
    //
    // Returns: An array of all the pictures that have been created
    pub fun getAllPictures(): [PictureApp.Picture] {
        return PictureApp.pictureDatas.values
    }


    // getPictureCollectionName returns the name that the specified PictureCollection
    //            is associated with.
    // 
    // Parameters: setID: The id of the PictureCollection that is being searched
    //
    // Returns: The name of the PictureCollection
    pub fun getPictureCollectionName(setID: UInt32): String? {
        // Don't force a revert if the setID is invalid
        return PictureApp.setDatas[setID]?.name
    }

    // getPictureCollectionIDsByName returns the IDs that the specified PictureCollection name
    //                 is associated with.
    // 
    // Parameters: setName: The name of the PictureCollection that is being searched
    //
    // Returns: An array of the IDs of the PictureCollection if it exists, or nil if doesn't
    pub fun getPictureCollectionIDsByName(setName: String): [UInt32]? {
        var setIDs: [UInt32] = []

        // Iterate through all the setDatas and search for the name
        for setData in PictureApp.setDatas.values {
            if setName == setData.name {
                // If the name is found, return the ID
                setIDs.append(setData.setID)
            }
        }

        // If the name isn't found, return nil
        // Don't force a revert if the setName is invalid
        if setIDs.length == 0 {
            return nil
        } else {
            return setIDs
        }
    }


    // -----------------------------------------------------------------------
    // Picture initialization function
    // -----------------------------------------------------------------------
    //
    init() {
        // Initialize contract fields
        self.currentPictureCollection = 0
        self.pictureDatas = {}
        self.setDatas = {}
        self.sets <- {}
        self.nextPictureID = 1
        self.nextPictureCollectionID = 1
        self.totalSupply = 0

        // Create a single new NFT and save it to account storage
        self.account.save<@NFT>(<-create NFT(serialNumber: 1,pictureID: 23,setID:561), to: /storage/PictureAdmin)
    
        // Put a new Collection in storage
        self.account.save<@Collection>(<- create Collection(), to: /storage/PictureCollection)

        // Create a public capability for the Collection
        self.account.link<&{PictureNFTCollectionPublic}>(/public/MomentCollection, target: /storage/MomentCollection)

        // Put the Minter in storage
        self.account.save<@Admin>(<- create Admin(), to: /storage/PictureAdmin)

        emit ContractInitialized()


    }
}
 
 