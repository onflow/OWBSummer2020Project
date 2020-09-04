// Transaction to create a NFTCollection on user side and then create a public capability to receive NFT's
import NonFungibleToken,Creature from 0x01

transaction {

    prepare(acct: AuthAccount) {

        let collection <- Creature.createEmptyCollection()

        acct.save<@NonFungibleToken.Collection>(<-collection, to: /storage/NFTCollection)

        log("User: Collection stored to storage")

        acct.link<&{Creature.CollectionPublic, NonFungibleToken.CollectionPublic}>(/public/NFTReceiver, target: /storage/NFTCollection)

        log("User: Link to collection stored to storage kept in public")
    }
}
 