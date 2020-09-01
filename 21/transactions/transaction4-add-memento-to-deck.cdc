import Toke from 0xf3fcd2c1a78f5eee
transaction() {

    // Here no function requires a capability, hence none is required 

    // Signed by the admin.
    prepare(acct: AuthAccount) {
        let destinationDeck = UInt32(1)
        let mementoToAdd = UInt32(1)
        // borrow a reference to the Admin resource in storage
        let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        
        // Borrow a reference to the deck to be added to
        let deckRef = admin.borrowDeck(deckID: destinationDeck)

        // Add the specified play ID
        deckRef.addMemento(mementoID:mementoToAdd)

        log("Memento added to a deck")
    }
}
 