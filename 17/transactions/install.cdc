//import NonFungibleToken from 0x01cf0e2f2f715450
//import NonFungibleToken from 0x045a1763c93006ca

//import SurvivalNFT from 0x179b6b1cb6755e31
import NonFungibleToken from 0xNFTStandardAddress

import SurvivalNFT from 0xNFTAddress

transaction {
    prepare (signer:AuthAccount) {
        //signer.save<@NonFungibleToken.Collection>(<-SurvivalNFT.createEmptyCollection(), to: /storage/NFTCollection)
        let newCollection <- SurvivalNFT.createEmptyCollection() as! @SurvivalNFT.Collection
        signer.save<@SurvivalNFT.Collection>(<-newCollection, to: /storage/NFTCollection)
        //signer.link<&{NonFungibleToken.CollectionPublic}>(/public/NFTCollection, target: /storage/NFTCollection)
        signer.link<&{SurvivalNFT.SurvivalCollectionPublic}>(/public/NFTCollection, target: /storage/NFTCollection)
    }
}
 