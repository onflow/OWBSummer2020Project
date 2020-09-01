import Autograph from 0xf3fcd2c1a78f5eee

// This transaction is what an user would use to mint a single new autograph
// and deposit it in a user's collection

transaction(document: String, recipientAddr: Address) {
    prepare(acct: AuthAccount) {

        // Save author resource
        acct.save(<-Autograph.createAuthor(), to: /storage/AutographAuthor)
        let authorRef = acct.borrow<&Autograph.Author>(from: /storage/AutographAuthor)!

        // Mint a new NFT
        let autograph <- Autograph.mintAutograph(document: document, author: authorRef)

        // destroy the author resource
        destroy <-acct.load<@Autograph.Author>(from: /storage/AutographAuthor)

        // get the public account object for the recipient
        let recipient = getAccount(recipientAddr)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/AutographCollection)!.borrow<&{Autograph.AutographCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's autograph collection")

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-autograph)
    }
}
 