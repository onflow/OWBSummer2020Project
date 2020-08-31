      import FanCoin from 0xe03daebed8ca0615
      import Toke from 0xf3fcd2c1a78f5eee
      
      pub fun main(): {UInt64:UInt64} {
              let acct = getAccount(0xfd43f9148d4b725d)
              let receiverRef = acct.getCapability(/public/TokeCollection)!.borrow<&{Toke.MementoCollectionPublic}>()
                  ?? panic("Cannot borrow a reference to the recipient's moment collection")
                     
              let nft = receiverRef.borrowMemento(id: UInt64(0))
      
              return {UInt64(0):nft!.fanPoints}
      }