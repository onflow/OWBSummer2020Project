import Toke from 0xf3fcd2c1a78f5eee
transaction() {

    prepare(acct: AuthAccount) {

        // borrow a reference to the Admin resource in storage
        let tokeCollection = acct.borrow<&Toke.Collection>(from: /storage/TokeCollection)
            ?? panic("Could not borrow a reference to the Admin resource")
        let mementoID = UInt64(2)
        let memento = tokeCollection.borrowMemento(id: mementoID)!
        log("Collection mementos")
        log(tokeCollection.getIDs())
        log("Details memento ".concat(memento.id.toString()))
        log("ID : ".concat(memento.id.toString()).concat(" fan points : ").concat(memento.fanPoints.toString()))
    }
}
 