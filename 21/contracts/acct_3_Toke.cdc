import NonFungibleToken from 0x179b6b1cb6755e31

pub contract Toke : NonFungibleToken {

    /* This contract is similar in its structure and processing as the NBA TopShot contract
        There is an almost identical match :
        NBA TopShot Moment = Toke Memento NFT
        NBA TopShot Play = Toke Memento
        NBA TopShot Set = Toke Set

        The main difference is that the main contract does not host any information. 
        It is only used by applications to create NBATopShot-like admin accounts for their own assets. 

        For clarity, NBA TopShot smart contract comments have been removed. They can however be applied the same way replacing value following the above assignment.
     */
    pub event MementoCreated(id: UInt32, metadata: {String:String})
    pub event ContractInitialized()

    // Events for Deck-Related actions
    pub event DeckCreated(deckID: UInt32)

    // Emitted when a new special loot event is started
    //pub event SpecialLootEventStarted(lootID:UInt32)

    // Emitted when a new special loot event is finished
    //pub event SpecialLootEventFinished(deckID: UInt32, mementoID: UInt32, nummementos: UInt32)

    // Emitted when a memento is minted
    pub event MementoMinted(NFTID: UInt64, mementoID: UInt32, deckID: UInt32)
    // Emitted when a memento can not be minted anymore
    pub event MementoRetiredFromDeck(deckID: UInt32, mementoID: UInt32, nummementos: UInt32)

    // Events for Collection-related actions
    //
    // Emitted when a memento is withdrawn from a Collection
    pub event Withdraw(id: UInt64, from: Address?)
    // Emitted when a memento is deposited into a Collection
    pub event Deposit(id: UInt64, to: Address?)

    pub event MementoAddedToDeck(deckID: UInt32, mementoID: UInt32)

    pub event DeckLocked(deckID: UInt32)

    // Emitted when a memento is destroyed
    pub event MementoDestroyed(id: UInt64)

    pub var totalSupply: UInt64

    // Thanks @Bastian for the solution ;)
    /*  The admin capability is used in mementos and decks to find the parent resource
        Because there is no central account contract variable have no use. There are all concentrated in the admin resource
        The admin capability allow to reference functions and variable when creating new decks / mementos or minting mementos
    */
    pub struct Memento {
        // Capability to the admin that created the memento
        pub let admin: Capability<&Admin>
        // The unique ID for the memento
        pub let mementoID: UInt32

        // Store the Memento metadata
        //
        pub let metadata: {String: String}

        init(metadata: {String: String}, admin: Capability<&Admin>) {
            pre {
                metadata.length != 0: "New memento metadata cannot be empty"
            }
            self.admin = admin
            self.mementoID = self.admin.borrow()!.nextMementoID
            self.metadata = metadata
            emit MementoCreated(id: self.mementoID, metadata: metadata)
        }
    }


    pub struct DeckData {
        // Unique ID for the deck
        pub let deckID: UInt32
        // Name of the deck
        pub let name: String

        init(name: String, deckID: UInt32) {
            pre {
                name.length > 0: "New deck name cannot be empty"
            }
            self.deckID = deckID
            self.name = name

            emit DeckCreated(deckID: self.deckID)
        }
    }




    
    pub resource Deck {
        // Capability used to identify the admin that created the resource
        pub let admin: Capability<&Admin>
        pub let deckID: UInt32
        // Let the admin choose whether he wants his deck mementos to be visible or not (Treasure hunt !)
        pub let deckVisible: Bool
        pub var mementos: [UInt32]
        pub var retired: {UInt32: Bool}
        pub var locked: Bool
        pub var numberMintedPerMemento: {UInt32: UInt32}

        init(admin: Capability<&Admin>) {
            self.admin = admin
            self.deckID = self.admin.borrow()!.nextDeckID
            self.mementos = []
            self.deckVisible = true
            self.retired = {}
            self.locked = false
            self.numberMintedPerMemento = {}
        }

        pub fun listMementosOfDeck(): [UInt32] {
            pre {
                self.deckVisible : "Cannot list the mementos of this deck, the deck is deck a not public"
            }
            return self.mementos
        }

        pub fun unlockDeck(){
            self.locked = false

        }

        pub fun addMemento(mementoID: UInt32) {
            pre {
                self.admin.borrow()!.mementoDatas[mementoID] != nil: "Cannot add the memento to deck: memento doesn't exist."
                !self.locked: "Cannot add the memento to the deck after the deck has been locked."
                self.numberMintedPerMemento[mementoID] == nil: "The memento has already beed added to the deck."
            }

            self.mementos.append(mementoID)

            self.retired[mementoID] = false

            self.numberMintedPerMemento[mementoID] = 0

            emit MementoAddedToDeck(deckID: self.deckID, mementoID: mementoID)
        }

        pub fun addMementos(mementoIDs: [UInt32]) {
            for memento in mementoIDs {
                self.addMemento(mementoID: memento)
            }
        }

        pub fun retireMemento(mementoID: UInt32) {
            pre {
                self.retired[mementoID] != nil: "Cannot retire the memento: memento doesn't exist in this deck!"
            }

            if !self.retired[mementoID]! {
                self.retired[mementoID] = true
                emit MementoRetiredFromDeck(deckID: self.deckID, mementoID: mementoID, nummementos: self.numberMintedPerMemento[mementoID]!)
            }
        }

        pub fun retireAll() {
            for memento in self.mementos {
                self.retireMemento(mementoID: memento)
            }
        }

        pub fun lock() {
            if !self.locked {
                self.locked = true
                emit DeckLocked(deckID: self.deckID)
            }
        }

        pub fun mintMemento(mementoID: UInt32, fanPoints: UInt64): @NFT {
            pre {
                self.retired[mementoID] != nil: "Cannot mint the memento: This memento doesn't exist."
                !self.retired[mementoID]!: "Cannot mint the memento from this memento: This memento has been retired."
            }

            let numInmemento = self.numberMintedPerMemento[mementoID]!

            let newmemento: @NFT <- create NFT(serialNumber: numInmemento + UInt32(1),
                                              mementoID: mementoID,
                                              deckID: self.deckID,fanPoints: fanPoints, admin: self.admin)


            self.numberMintedPerMemento[mementoID] = numInmemento + UInt32(1)
            // Use the admin capability to increase the supply of NFTs
            self.admin.borrow()!.increaseTotalSupply()
            return <-newmemento
        }


        pub fun batchMintMemento(mementoID: UInt32, quantity: UInt64, fanPoints: UInt64): @Collection {
            let newCollection <- create Collection()

            var i: UInt64 = 0
            while i < quantity {
                newCollection.deposit(token: <-self.mintMemento(mementoID: mementoID, fanPoints: fanPoints))
                i = i + UInt64(1)
            }

            return <-newCollection
        }

        destroy(){
        }
    }


    pub struct MementoData {

        pub let deckID: UInt32

        pub let mementoID: UInt32

        pub let serialNumber: UInt32

        init(deckID: UInt32, mementoID: UInt32, serialNumber: UInt32) {
            self.deckID = deckID
            self.mementoID = mementoID
            self.serialNumber = serialNumber
        }

    }


    pub resource NFT: NonFungibleToken.INFT {

        pub let id: UInt64
        // Capability to the admin that created the resource
        pub let admin : Capability<&Admin>
        pub let data: MementoData
        // Number of fanpoints fans will get when doing actions with their tokens
        pub var fanPoints: UInt64

        init(serialNumber: UInt32, mementoID: UInt32, deckID: UInt32, fanPoints: UInt64, admin:  Capability<&Admin>) {
            
            self.admin = admin
            self.id = self.admin.borrow()!.totalSupply
            self.fanPoints = fanPoints

            // deck the metadata struct
            self.data = MementoData(deckID: deckID, mementoID: mementoID, serialNumber: serialNumber)

            emit MementoMinted(NFTID: self.id, mementoID: mementoID, deckID: self.data.deckID)
        }

        destroy() {
            emit MementoDestroyed(id: self.id)
        }
    }

    pub resource interface AdminPublic {
        pub fun listDecks(): {UInt32:String}
        pub fun listMementos(): {UInt32:String} 
    }

    // Admin is a special authorization resource that 
    // allows the owner to perform important functions to modify the 
    // various aspects of the mementos, decks, and mementos
    //
    pub resource Admin : AdminPublic {
       
        pub var mementoDatas: {UInt32: Memento}

        pub var deckDatas: {UInt32: DeckData}

        pub var decks: @{UInt32: Deck}

        pub var nextMementoID: UInt32

        pub var nextDeckID: UInt32

        pub var totalSupply: UInt64

        pub fun createMemento(metadata: {String: String}, adminCap: Capability<&Admin>) {

            var newMemento = Memento(metadata: metadata, admin: adminCap)

            self.mementoDatas[newMemento.mementoID] = newMemento
            self.nextMementoID = self.nextMementoID + UInt32(1)
        }


        pub fun createDeck(name: String, adminCap: Capability<&Admin>) {

            var newDeck <- create Deck(admin: adminCap)

            self.deckDatas[newDeck.deckID] = DeckData(name: name, deckID : newDeck.deckID)


            self.decks[newDeck.deckID] <-! newDeck

            self.nextDeckID = self.nextDeckID + UInt32(1)
        }

        pub fun listDecks(): {UInt32:String} {
            var tmpDecks:{UInt32:String} = {}
            for id in self.decks.keys {
                tmpDecks[id] = self.getDeckName(deckID:id)
            }
            return tmpDecks
        }

        pub fun listMementos(): {UInt32:String} {
            var tmpMementos:{UInt32:String} = {}
            for id in self.mementoDatas.keys {
                let dict = self.getMementoMetaData(mementoID:id)
                tmpMementos[id] = dict!.keys[0] as String? 
            }
            return tmpMementos
        }

        pub fun getMementoMetaDataByField(mementoID: UInt32, field: String): String? {

            if let memento = self.mementoDatas[mementoID] {
                return memento.metadata[field]
            } else {
                return nil
            }
        }

        // As we can't access contract level totalSupply, and variables are not settable through capabilities, we use a function.
        // THis is safer as well \o/
        pub fun increaseTotalSupply(): UInt64{
            self.totalSupply = self.totalSupply + UInt64(1)
            return self.totalSupply 
        }

        pub fun getMementoMetaData(mementoID: UInt32): {String: String}? {
            return self.mementoDatas[mementoID]?.metadata
        }

        pub fun borrowDeck(deckID: UInt32): &Deck {
            pre {
                self.decks[deckID] != nil: "Cannot borrow deck: The deck doesn't exist"
            }
            
            return &self.decks[deckID] as &Deck
        }

           
        pub fun getDeckName(deckID: UInt32): String? {

            return self.deckDatas[deckID]?.name
        }

        pub fun getDeckIDsByName(deckName: String): [UInt32]? {
            var deckIDs: [UInt32] = []

            for deckData in self.deckDatas.values {
                if deckName == deckData.name {
                    deckIDs.append(deckData.deckID)
                }
            }

            if deckIDs.length == 0 {
                return nil
            } else {
                return deckIDs
            }
        }
  
  
        pub fun getMementosInDeck(deckID: UInt32): [UInt32]? {
            return self.decks[deckID]?.mementos
        }
       
        pub fun isMementoRetired(deckID: UInt32, mementoID: UInt32): Bool? {

            if let deckToRead <- self.decks.remove(key: deckID) {

                let retired = deckToRead.retired[mementoID]

                self.decks[deckID] <-! deckToRead

                return retired
            } else {

                return nil
            }
        }

        pub fun isDeckLocked(deckID: UInt32): Bool? {
            return self.decks[deckID]?.locked
        }

        pub fun getNumMementosInEdition(deckID: UInt32, mementoID: UInt32): UInt32? {
            if let deckToRead <- self.decks.remove(key: mementoID) {

                let amount = deckToRead.numberMintedPerMemento[mementoID]

                self.decks[deckID] <-! deckToRead

                return amount
            } else {
                return nil
            }
        }

        pub fun createNewAdmin(): @Admin {
            return <-create Admin()
        }

        init(){ 
            self.mementoDatas = {}
            self.deckDatas = {}
            self.decks <- {}
            self.nextMementoID = 1
            self.nextDeckID = 1
            self.totalSupply = 0
        }
        destroy() {
            destroy self.decks
        }
        
    }   


    pub resource interface MementoCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection)
        pub fun getIDs(): [UInt64]
        pub fun listNFTs():[UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowMemento(id: UInt64): &Toke.NFT? {
            post {
                (result == nil) || (result?.id == id): 
                    "Cannot borrow memento reference: The ID of the returned reference is incorrect"
            }
        }
    }

    pub resource Collection: MementoCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic { 

        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {

            let token <- self.ownedNFTs.remove(key: withdrawID) as! @Toke.NFT?
                ?? panic("Cannot withdraw: memento does not exist in the collection")
            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        pub fun batchWithdraw(ids: [UInt64]): @NonFungibleToken.Collection {

            var batchCollection <- create Collection()
            
            for id in ids {
                batchCollection.deposit(token: <-self.withdraw(withdrawID: id))
            }
            
            return <-batchCollection
        }
        // !! There will be issues in case of overlapping ids
        pub fun listNFTs(): [UInt64] {
            return self.ownedNFTs.keys
        }


        pub fun deposit(token: @NonFungibleToken.NFT) {
            
            
            let token <- token as! @Toke.NFT

            let id = token.id

            let oldToken <- self.ownedNFTs[id] <- token


            if self.owner?.address != nil {
                emit Deposit(id: id, to: self.owner?.address)
            }

            destroy oldToken
        }

        pub fun batchDeposit(tokens: @NonFungibleToken.Collection) {

            let keys = tokens.getIDs()

            for key in keys {
                self.deposit(token: <-tokens.withdraw(withdrawID: key))
            }

            destroy tokens
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }

        pub fun borrowMemento(id: UInt64): &Toke.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &Toke.NFT
            } else {
                return nil
            }
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }


    
    // -----------------------------------------------------------------------
    // Toke contract-level function definitions
    // -----------------------------------------------------------------------

    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <-create Toke.Collection()
    }

    //Create an admin for streamer to administrate their own mementos 
    pub fun createAdmin(): @Toke.Admin {
        return <- create Toke.Admin()
    }

    // -----------------------------------------------------------------------
    // Toke initialization function
    // -----------------------------------------------------------------------
    // Those values are used to comply with the interface of an NFT
    init() {
        self.totalSupply = 0
        emit ContractInitialized()

    }

}
 