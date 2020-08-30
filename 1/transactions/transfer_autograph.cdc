import NonFungibleToken from 0x01cf0e2f2f715450
import Autograph from 0xf3fcd2c1a78f5eee

// This transaction is how an Autograph user would transfer a autograph
// from their account to another account
// The recipient must have an Autograph Collection object stored
// and a public AutographCollectionPublic capability stored at
// `/public/AutographCollection`

// Parameters:
//
// recipient: The Flow address of the account to receive the autograph.
// withdrawID: The id of the autograph to be transferred

transaction(recipient: Address, withdrawID: UInt64) {

    // local variable for storing the transferred token
    let transferToken: @NonFungibleToken.NFT
    
    prepare(acct: AuthAccount) {

        // borrow a reference to the owner's collection
        let collectionRef = acct.borrow<&Autograph.Collection>(from: /storage/AutographCollection)
            ?? panic("Could not borrow a reference to the stored Autograph collection")
        
        // withdraw the NFT
        self.transferToken <- collectionRef.withdraw(withdrawID: withdrawID)
    }

    execute {
        // get the recipient's public account object
        let recipient = getAccount(recipient)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/AutographCollection)!.borrow<&{Autograph.AutographCollectionPublic}>()!

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-self.transferToken)
    }
}
