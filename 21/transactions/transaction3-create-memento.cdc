import Toke from 0xf3fcd2c1a78f5eee
transaction() {
    // As the createDeck() function expects a capability, we have to use it here over the borrow() directly.

    // Signed by the admin
    prepare(acct: AuthAccount) {
        let key = "first key"
        let value = "first value"
        // borrow a reference to the admin resource
        let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
            ?? panic("No admin resource in storage")
        admin.createMemento(metadata: {key:value},adminCap: acct.getCapability<&Toke.Admin>(/private/Admin)!)
        log("Memento created")
    }
}
 