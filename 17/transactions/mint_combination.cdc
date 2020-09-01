import NonFungibleToken from 0xNFTStandardAddress
import SurvivalNFT from 0xNFTAddress

transaction (combinationId: UInt32 , ingredientIds: [UInt64] ,adminAddress: Address) {
    
    let ingredients: @SurvivalNFT.Collection
    let myReceiver: &{SurvivalNFT.SurvivalCollectionPublic}
    prepare (signer: AuthAccount) {
        // check if admin account
        //let ingredientIds = [UInt64(3), UInt64(1)]
        self.ingredients <- SurvivalNFT.createEmptyCollection() as! @SurvivalNFT.Collection
       // let myCollection = signer.borrow<&SurvivalNFT.Collection>(from: /storage/NFTCollection)!
        let myCollection = signer.borrow<&NonFungibleToken.Collection>(from: /storage/NFTCollection)!

        //deposit ingredients into the collection to be sent to the minter
        for id in ingredientIds {
            let ingredient <- myCollection.withdraw(withdrawID: id)
            self.ingredients.deposit(token: <-ingredient)
        }
        self.myReceiver = //signer.getCapability(/public/NFTCollection)!
            signer.borrow<&{SurvivalNFT.SurvivalCollectionPublic}>(from: /storage/NFTCollection)!
    }

  
    execute {

        let artisan = getAccount(adminAddress).getCapability(/public/NFTCombinationMinter)!
            .borrow<&{SurvivalNFT.NFTCombinationMinter}>()!

       
        artisan.mintNFTFromCombination(recipient: self.myReceiver, ingredients: <-self.ingredients, combinationId: combinationId)
        log("Total Supply:")
        log(SurvivalNFT.totalSupply)
    }

}
 