// Transaction1.cdc

import Toke from 0xf3fcd2c1a78f5eee
import Marketplace from 0x045a1763c93006ca

// This transaction creates a new Sale Collection object,
// lists an NFT for sale, puts it in account storage,
// and creates a public capability to the sale so that others can buy the token.
transaction {
  let sale: &Marketplace.SaleCollection

    prepare(acct: AuthAccount) {

        // borrow a reference to the admin resource
        self.sale = acct.borrow<&Marketplace.SaleCollection>(from: /storage/NFTSale)
            ?? panic("No admin resource in storage")
        // borrow a reference to the NFTCollection in storage
        let collectionRef = acct.borrow<&Toke.Collection>(from: /storage/TokeCollection)!
    
        // Withdraw the NFT from the collection that you want to sell
        // and move it into the transaction's context
        let token <- collectionRef.withdraw(withdrawID: 2) as! @Toke.NFT

        // List the token for sale by moving it into the sale object
        self.sale.listForSale(token: <-token, price: UFix64(250))

        // Create a public capability to the sale so that others can call its methods
        acct.link<&Marketplace.SaleCollection{Marketplace.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)

        log("Sale Created for account 1. Selling NFT 1 for 10 tokens")
    }
}
 
 