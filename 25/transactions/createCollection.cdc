  import CricketFlow from 0x01cf0e2f2f715450

transaction{
    prepare(acct: AuthAccount){
        let collection <- CricketFlow.createEmptyCollection()
        acct.save<@CricketFlow.Collection>(<-collection, to: /storage/PlayerCollection)
        log("Collection created for account 2")

        acct.link<&{CricketFlow.PlayerReceiver}>(/public/PlayerReceiver, target: /storage/PlayerCollection)
        log("Capability Created")
    }
}