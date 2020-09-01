import PictureApp from 0x01cf0e2f2f715450

// This transaction checks if an Admin exists in the storage of the given account
// by trying to borrow from it
transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&PictureApp.Admin>(from: /storage/PictureAdmin) != nil {
            log("The Admin exists!")
        } else {
            log("No Admin found!")
        }
    }
}
 