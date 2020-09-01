import PictureApp from 0x01cf0e2f2f715450
// This transaction creates a new picture struct 
// and stores it in the PictureApp smart contract
// We currently stringify the metadata and instert it into the 
// transaction string, but want to use transaction arguments soon


//TODO add pic to collection

transaction() {
    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        let admin = acct.borrow<&PictureApp.Admin>(from: /storage/PictureAdmin)
            ?? panic("No admin resource in storage")

        let collection = acct.borrow<&PictureApp.Collection>(from: /storage/MomentCollection)
            ?? panic("No admin collection in storage")
            
        let nft  = acct.borrow<&PictureApp.NFT>(from: /storage/PictureAdmin)
            ?? panic("No admin resource in storage")
        let metadataa = {
        "1": "John",
        "2": "John",
        "3": "John"
        }
       let createdPicture = admin.createPicture(metadata: metadataa)
        
       collection.deposit(nft)
    }
}
 
 