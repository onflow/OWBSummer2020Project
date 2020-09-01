import PictureApp from 0x01cf0e2f2f715450
// This transaction creates a new picture Collection 
// and stores it in the PictureApp smart contract
// We currently stringify the metadata and instert it into the 
// transaction string, but want to use transaction arguments soon

transaction {
    prepare(acct: AuthAccount) {
        // borrow a reference to the Admin resource in storage
        let admin = acct.borrow<&PictureApp.Admin>(from: /storage/PictureAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")

        // Create a set with the specified name
        admin.createPictureCollection(name: "set")
    }
}