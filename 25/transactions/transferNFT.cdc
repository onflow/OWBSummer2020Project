import CricketFlow from 0x01cf0e2f2f715450

    transaction{
      let transferToken: @CricketFlow.Player
    
      prepare(acct: AuthAccount){
    
        let collectionRef = acct.borrow<&CricketFlow.Collection>(from: /storage/PlayerCollection)
          ?? panic("Could not borrow a reference to the owner's collection")
    
        self.transferToken <- collectionRef.withdraw(withdrawID: 1)
      }
    
      execute{
        let recipient = getAccount(0xf3fcd2c1a78f5eee)
        let receiverRef = recipient.getCapability(/public/PlayerReceiver)!  
                                    .borrow<&{CricketFlow.PlayerReceiver}>()
                                    ?? panic("Could not borrow receiver refrence")
    
        receiverRef.deposit(token: <- self.transferToken)
        log("Player NFT transfer from account 1 to account 2")
      }
    }