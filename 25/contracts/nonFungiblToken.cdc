 pub contract CricketFlow {

    pub event PlayerCreated(id: UInt64, name: String, metadata: {String: String})
    pub event ContractInitialized()
    
    pub var nextPlayerID: UInt64
    access(self) var playerDatas: @{UInt64: Player}
    
        pub resource Player {
            pub let id: UInt64
            pub var name: String
            pub let metadata: {String: String}
            
            init(name: String, metadata: {String:String}){ 
                pre {
                    metadata.length != 0: "New Play metadata cannot be empty"
                } 
                self.name = name  
                self.id = CricketFlow.nextPlayerID
                self.metadata =  metadata
                CricketFlow.nextPlayerID = CricketFlow.nextPlayerID + UInt64(1)
    
                emit PlayerCreated(id: self.id, name: name, metadata: metadata)
            }
        }
    
        pub resource interface PlayerReceiver {
            pub fun deposit(token: @Player)
            pub fun getIDs(): [UInt64]
            pub fun idExists(id: UInt64): Bool
        }
    
    
        pub resource Collection: PlayerReceiver {
    
            pub var ownedPlayers: @{UInt64: Player}
            init () {
                self.ownedPlayers <- {}
            }
    
            pub fun withdraw(withdrawID: UInt64): @Player {
                let token <- self.ownedPlayers.remove(key: withdrawID)
                    ?? panic("Cannot withdraw: card doesnot exits in the collection")
                return <-token
            }
    
            pub fun deposit(token: @Player) {
                let oldToken <- self.ownedPlayers[token.id] <- token
                destroy oldToken
            }
    
            pub fun idExists(id: UInt64): Bool {
                return self.ownedPlayers[id] != nil
            }
    
            pub fun getIDs(): [UInt64] {
                return self.ownedPlayers.keys
            }
    
            destroy() {
                destroy self.ownedPlayers
            }
        }
    
        pub fun createEmptyCollection(): @Collection {
            return <- create Collection()
        }
    
        //pub fun getAllPlayers(): [CricketFlow.Player]{
        //    return CricketFlow.playerDatas.values
        //}
    
        
    
        pub resource Admin {
    
            pub fun createPlayer(name: String, metadata: {String: String}, recipient: &AnyResource{PlayerReceiver}) {
                var newPlayer <- create Player(name: name, metadata: metadata)
                recipient.deposit(token: <-newPlayer)
            }
    
            //pub fun createPlayer(name: String, metadata: {String: String}, recipient: &AnyResource{PlayerReceiver}){
            //    var newPlayer: @Player <- create Player(name: name, metadata: metadata)
            //    recipient.deposit(token: <- newPlayer)
                //let newID = newPlayer.id
    
                //CricketFlow.playerDatas[newID] = newPlayer
                //return <- newPlayer
            
    
            pub fun createNewAdmin(): @Admin{
                return <- create Admin()
            }
        }
    
      init() {
    
            self.nextPlayerID = 1
            self.playerDatas <- {}
            self.account.save(<-self.createEmptyCollection(), to: /storage/PlayerCollection)
            self.account.link<&{PlayerReceiver}>(/public/PlayerReceiver, target: /storage/PlayerCollection)
            self.account.save(<-create Admin(), to: /storage/CricketFlowAdmin)
            emit ContractInitialized()
      }
    }