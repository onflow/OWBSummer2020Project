import FanCoin from 0xe03daebed8ca0615
import Toke from 0xf3fcd2c1a78f5eee
import NonFungibleToken from 0x179b6b1cb6755e31

pub contract Marketplace {

  // Event that is emitted when a new NFT is put up for sale
  pub event ForSale(id: UInt64, price: UFix64)

  // Event that is emitted when the price of an NFT changes
  pub event PriceChanged(id: UInt64, newPrice: UFix64)

  // Event that is emitted when a token is purchased
  pub event TokenPurchased(id: UInt64, price: UFix64)

  // Event that is emitted when a seller withdraws their NFT from the sale
  pub event SaleWithdrawn(id: UInt64)

  // Interface that users will publish for their Sale collection
  // that only exposes the methods that are supposed to be public
  //
  pub resource interface SalePublic {
    pub fun purchase(tokenID: UInt64, recipient: &AnyResource{NonFungibleToken.Receiver}, buyTokens: UFix64,fanCoin:&FanCoin.LeaderBoardManager, adminPublic: &{FanCoin.AdminPublic}, leaderBoard:&FanCoin.LeaderBoardManager)
    pub fun idPrice(tokenID: UInt64): UFix64?
    pub fun getIDs(): [UInt64]
    pub fun getIDsAndfanPoints(): [{UInt64:UInt64?}]
    pub fun getIDsAndPrices(): [{UInt64:UFix64?}]

  }

  // SaleCollection
  //
  // NFT Collection object that allows a user to put their NFT up for sale
  // where others can send fungible tokens to purchase it
  //
  pub resource SaleCollection: SalePublic {

    // Dictionary of the NFTs that the user is putting up for sale
    pub var forSale: @{UInt64: Toke.NFT}

    // Dictionary of the prices for each NFT by ID
    pub var prices: {UInt64: UFix64}

    pub var balance: UFix64

    init (balance:UFix64) {
        self.forSale <- {}
        self.balance = 0.0
        self.prices = {}
    }

    // withdraw gives the owner the opportunity to remove a sale from the collection
    pub fun withdraw(tokenID: UInt64): @Toke.NFT {
        // remove the price
        self.prices.remove(key: tokenID)
        // remove and return the token
        let token <- self.forSale.remove(key: tokenID) ?? panic("missing NFT")
        return <-token
    }

    // listForSale lists an NFT for sale in this collection
    pub fun listForSale(token: @Toke.NFT, price: UFix64) {
        let id = token.id

        // store the price in the price array
        self.prices[id] = price
        // put the NFT into the the forSale dictionary
        let oldToken <- self.forSale[id] <- token
        destroy oldToken

        emit ForSale(id: id, price: price)
    }

    // changePrice changes the price of a token that is currently for sale
    pub fun changePrice(tokenID: UInt64, newPrice: UFix64) {
        self.prices[tokenID] = newPrice

        emit PriceChanged(id: tokenID, newPrice: newPrice)
    }



    // purchase lets a user send tokens to purchase an NFT that is for sale
    pub fun purchase(tokenID: UInt64, recipient: &AnyResource{NonFungibleToken.Receiver}, buyTokens: UFix64, fanCoin:&FanCoin.LeaderBoardManager, adminPublic: &{FanCoin.AdminPublic}, leaderBoard:&FanCoin.LeaderBoardManager) {
        pre {
            self.forSale[tokenID] != nil && self.prices[tokenID] != nil:
                "No token matching this ID for sale!"
            buyTokens >= (self.prices[tokenID] ?? UFix64(0)):
                "Not enough tokens to by the NFT!"
        }

        // get the value out of the optional
        let price = self.prices[tokenID]!


        self.prices[tokenID] = nil



        // deposit the purchasing tokens into the owners vault
        self.balance = self.balance +buyTokens
        let NFT <-self.withdraw(tokenID: tokenID)
        leaderBoard.depositFanCoins(adminPublic:adminPublic as &{FanCoin.AdminPublic},NFT:&NFT as &Toke.NFT)

        // deposit the NFT into the buyers collection
        recipient.deposit(token: <- NFT )

        emit TokenPurchased(id: tokenID, price: price)
        
    }

    // idPrice returns the price of a specific token in the sale
    pub fun idPrice(tokenID: UInt64): UFix64? {
        return self.prices[tokenID]
    }

    // getIDs returns an array of token IDs that are for sale
    pub fun getIDs(): [UInt64] {
        return self.forSale.keys
    }

    pub fun getIDsAndfanPoints(): [{UInt64:UInt64?}] {
        var list:[{UInt64:UInt64?}] = []
        for key in self.forSale.keys {
            var fanPoints = self.forSale[key]?.fanPoints
            list.append({key:fanPoints})
        }
        return list
    }

    pub fun getIDsAndPrices(): [{UInt64:UFix64?}] {
        var list:[{UInt64:UFix64?}] = []
        for key in self.forSale.keys {
            var price = self.prices[key]
            list.append({key:price})
        }
        return list
    }


    destroy() {
        destroy self.forSale
    }
  }

  // createCollection returns a new collection resource to the caller
  pub fun createSaleCollection(): @SaleCollection {
    return <- create SaleCollection(balance: 0.0)
  }
}
 