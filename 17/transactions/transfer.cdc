import NonFungibleToken from 0x01cf0e2f2f715450
import SurvivalNFT from 0x179b6b1cb6755e31

transaction {

    let token: @NonFungibleToken.NFT
    prepare (signer: AuthAccount) {
        // check if admin account
        self.token <- signer.borrow<&SurvivalNFT.Collection>(from:/storage/NFTCollection)!
            .withdraw(withdrawID: UInt64(17))
    }

    execute {
        let target = getAccount(0x179b6b1cb6755e31).getCapability(/public/NFTCollection)!
        //let target = getAccount(0x01cf0e2f2f715450).getCapability(/public/NFTCollection)!
            .borrow<&{NonFungibleToken.CollectionPublic}>()!

        target.deposit(token: <-self.token)

    }

}
 