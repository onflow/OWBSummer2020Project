import TopShot from 0x179b6b1cb6755e31
import Autograph from 0xf3fcd2c1a78f5eee

// This transaction is how a TopShot + Autograph user would mint
// an autograph to a moment in their account

// Parameters:
//
// momentID: The id of the moment to attach autograph
// document: String of Autograph document

transaction(momentID: UInt64, document: String) {
    prepare(acct: AuthAccount) {
        // borrow a reference to the owner's collection
        let collectionRefTopShot = acct.borrow<&TopShot.Collection>(from: /storage/MomentCollection)
            ?? panic("Could not borrow a reference to the stored TopShot collection")
        
        // Borrow a reference to the specified moment
        let moment = collectionRefTopShot.borrowMoment(id: momentID)
            ?? panic("Could not borrow a reference to the specified moment")

        // Save author resource
        acct.save(<-Autograph.createAuthor(), to: /storage/AutographAuthor)
        let authorRef = acct.borrow<&Autograph.Author>(from: /storage/AutographAuthor)!

        // Mint a new NFT
        let autograph <- Autograph.mintAutograph(document: document, author: authorRef)

        // destroy the author resource
        destroy <-acct.load<@Autograph.Author>(from: /storage/AutographAuthor)
        
        // Deposit the autograph to the moment
        moment.depositAutograph(autograph: <-autograph)
    }
}
 