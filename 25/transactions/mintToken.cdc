import CricketFlow from 0x01cf0e2f2f715450

    transaction{
    
        let receiverRef: &{CricketFlow.PlayerReceiver}
        let minterRef: &CricketFlow.Admin
    
        prepare(acct: AuthAccount){
            self.receiverRef = acct.getCapability(/public/PlayerReceiver)!
                                    .borrow<&{CricketFlow.PlayerReceiver}>()
                                    ?? panic("Could not borrow receiver refrence")
    
            self.minterRef = acct.borrow<&CricketFlow.Admin>(from: /storage/CricketFlowAdmin)
                                ??panic("Could not borrow minter refrence")
        }
    
        execute{
            self.minterRef.createPlayer(name: "M.S. Dhoni", metadata: {"Runs":"45333", "Matches":"432", "Highest Score": "183"}, recipient: self.receiverRef)
            log("NFT Minted and deposited to Account 1's Collection")
        }
    }