import Toke from 0xf3fcd2c1a78f5eee
import NonFungibleToken from 0x179b6b1cb6755e31

// This transaction mints a memento from the deck and mementoID provided

//Signed by the admin
transaction() {
    let adminRef: &Toke.Admin
    
    prepare(acct: AuthAccount) {
        // borrow a reference to the admin resource
        self.adminRef = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
            ?? panic("No admin resource in storage")
    }
    execute{
        let mementoIDToMint = 1
        let deckIDToMintFrom = 1
        let NFTFanPoints = 100
        // Borrow a reference to the specified deck
        let setRef = self.adminRef.borrowDeck(deckID: deckIDToMintFrom)

        // Mint a new NFT
        let moment1 <- setRef.mintMemento(mementoID: mementoIDToMint,fanPoints:NFTFanPoints)
        // Get the recipient's public account object
        let recipient = getAccount(0xf669cb8d41ce0c74)
        log("memento details")
        log("ID : ".concat(moment1.id.toString()).concat(" fan points : ").concat(moment1.fanPoints.toString()))
        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/TokeCollection)!.borrow<&{Toke.MementoCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's moment collection")

        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <-moment1)

        log("New NFT minted")
  }
}
 