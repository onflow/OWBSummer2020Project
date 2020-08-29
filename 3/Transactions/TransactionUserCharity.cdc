// Transaction1.cdc

import CharityNFT from 0x01
//fix this import statement to work with file user.cdc

// This transaction checks if an NFT exists in the storage of account in file acct01.cdc
// by trying to borrow from it
//
// This will verufy the user trying to donate the token to the chairtable organization has a valid token and is
// able to make the donation.
transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&CharityNFT.NFT>(from: /storage/NFT1) != nil {
            log("Valid token!")
        } else {
            log("No token found!")
        }
    }
}