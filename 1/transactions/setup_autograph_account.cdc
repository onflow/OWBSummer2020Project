import Autograph from 0xf3fcd2c1a78f5eee

// This transaction sets up an account to use autographs
// by storing an empty autograph collection and creating
// a public capability for it

transaction {

    prepare(acct: AuthAccount) {

        // First, check to see if a autograph collection already exists
        if acct.borrow<&Autograph.Collection>(from: /storage/AutographCollection) == nil {

            // create a new Autograph Collection
            let collection <- Autograph.createEmptyCollection() as! @Autograph.Collection

            // Put the new Collection in storage
            acct.save(<-collection, to: /storage/AutographCollection)

            // create a public capability for the collection
            acct.link<&{Autograph.AutographCollectionPublic}>(/public/AutographCollection, target: /storage/AutographCollection)
        }
    }
}
