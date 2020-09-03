// Transaction to mint NFT to user
import NonFungibleToken,Creature from 0x01

transaction{
      
    let minterRef : &Creature.NFTMinter
    let receiverRef : &{Creature.CollectionPublic,NonFungibleToken.CollectionPublic}
      
    prepare(acct: AuthAccount) {
        self.minterRef = acct.borrow<&Creature.NFTMinter>(from: /storage/NFTMinter)!
        self.receiverRef = getAccount(0x02).getCapability(/public/NFTReceiver)!
                                                               .borrow<&{Creature.CollectionPublic,NonFungibleToken.CollectionPublic}>()!
    }
      
    execute{
        
        log(TOKEN_ID)
        log(self.receiverRef)
        self.minterRef.mintNFT(recipient: self.receiverRef, ethTokenId: TOKEN_ID)

    }
}
