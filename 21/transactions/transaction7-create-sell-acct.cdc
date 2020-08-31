import Toke from 0xf3fcd2c1a78f5eee
import Marketplace from 0x045a1763c93006ca
    
    // This transaction creates a new Sale Collection object,
    // lists an NFT for sale, puts it in account storage,
    // and creates a public capability to the sale so that others can buy the token.
    transaction {
    
        prepare(acct: AuthAccount) {
    
    
            // Create a new Sale object, 
            // initializing it with the reference to the owner's vault
            let sale <- Marketplace.createSaleCollection()
    
           // Store the sale object in the account storage 
            acct.save(<-sale, to: /storage/NFTSale)
            // Create a public capability to the sale so that others can call its methods
            acct.link<&Marketplace.SaleCollection{Marketplace.SalePublic}>(/public/NFTSale, target: /storage/NFTSale)
    
            log("Sale Created for account 1.")
        }
    }
 