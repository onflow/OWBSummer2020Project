//import NonFungibleToken from 0x01cf0e2f2f715450
import NonFungibleToken from 0xNFTStandardAddress
import SurvivalNFT from 0xNFTAddress

transaction (formId: UInt32, targetAddress: Address) {

    let admin: &SurvivalNFT.NFTAdmin
    prepare (signer: AuthAccount) {
        // check if admin account
        self.admin = signer.borrow<&SurvivalNFT.NFTAdmin>(from:/storage/NFTAdmin) ?? 
            panic("Can't borrow admin, trying to mint from nonadmin account.")
    }

    execute {
        let target = getAccount(targetAddress).getCapability(/public/NFTCollection)!
            .borrow<&{SurvivalNFT.SurvivalCollectionPublic}>()!
            //.borrow<&{NonFungibleToken.CollectionPublic}>()!



        self.admin.mintNFT(formId: formId, recipient: target)
        log("Total Supply:")
        log(SurvivalNFT.totalSupply)
    }

}
 