import PictureApp from 0x01cf0e2f2f715450

//TODO ADD A PICTURE TO A PICTURECOLLECTION

// This transaction creates a new play struct 
// and stores it in the NiFTree smart contract
// We currently stringify the metadata and instert it into the 
// transaction string, but want to use transaction arguments soon

transaction() {
    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        let admin = acct.borrow<&PictureApp.Admin>(from: /storage/PictureAdmin)
            ?? panic("No admin resource in storage")
        let metadataa = {
        "1": "John",
        "2": "John",
        "3": "John"
        }
       let createdPicture = admin.createPicture(metadata: metadataa)

        
    }
}
