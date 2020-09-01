import Toke from 0xf3fcd2c1a78f5eee
transaction() {

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        let deckID = UInt32(2)
        // Borrow a reference to the deck to be added to
        let deckRef = admin.borrowDeck(deckID: deckID)

        log("Name of deck ".concat(deckID.toString()))
        log(admin.getDeckName(deckID:deckID))
        log("Mementos for deck ".concat(deckID.toString()))
        log(deckRef.listMementosOfDeck())
    }
}
 