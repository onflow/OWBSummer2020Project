import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";
import * as types from "@onflow/types";
import "./styles.css";
import { eventMapper, fixNames } from "./utils";

fcl
  .config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate");



const simpleTransaction = async () => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`
      transaction {
        prepare(acct: AuthAccount) {
          log("Transaction Submitted")
        }
      }
    `,
    sdk.payer(authorization),
    sdk.proposer(authorization),
    sdk.authorizations([authorization]),
    sdk.limit(100),
  ]);

  console.log({ tx });

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Transaction was executed");
    }
  });
};

const deployNFTContract = async () => {
  const code = `

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
   
  
  `;
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    sdk.transaction`
          transaction(code: String) {
            prepare(acct: AuthAccount) {
              acct.setCode(code.decodeHex())
            }
          }
        `,
    fcl.args([
      fcl.arg(Buffer.from(code, "utf8").toString("hex"), types.String),
    ]),
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
    fcl.limit(100),
  ]);

  console.log({ tx });

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Contract was deployed");
    }
  });
};

const mintToken = async () => {
  const { authorization } = fcl.currentUser();

  const tx = await fcl.send([
    fcl.transaction`

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
  `,
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
  ]);

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("NFT Minted and deposited to Account 1's Collection");
    }
  });
};





const createCollection = async () => {
  const { authorization } = fcl.currentUser();

  const tx = await fcl.send([
    fcl.transaction`

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
  `,
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
  ]);

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Collection Created");
    }
  });
};






const transferNFT = async () => {
  const { authorization } = fcl.currentUser();

  const tx = await fcl.send([
    fcl.transaction`

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
  `,
    fcl.proposer(authorization),
    fcl.payer(authorization),
    fcl.authorizations([authorization]),
  ]);

  fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("NFT Transfer");
    }
  });
};




const script1 = async () => {
  const response = await fcl.send([
    sdk.script`
    import CricketFlow from 0x01cf0e2f2f715450

    pub fun main()
    {
      let playerOwner = getAccount(0x01cf0e2f2f715450)
      let capability = playerOwner.getCapability(/public/PlayerReceiver)!
      let receiverRef = capability.borrow<&{CricketFlow.PlayerReceiver}>()
                        ?? panic("Could not borrow the receiver refrence")
      log("Account 1 PlayerNFT")
      log(receiverRef.getIDs())
    }
    `
  ]);

  return fcl.decode(response);
};


const script2 = async () => {
  const response = await fcl.send([
    sdk.script`
    import CricketFlow from 0x01cf0e2f2f715450

    pub fun main()
    {
      let playerOwner1 = getAccount(0x01cf0e2f2f715450)
      let playerOwner2 = getAccount(0xf3fcd2c1a78f5eee)

      let capability1 = playerOwner.getCapability(/public/PlayerReceiver)!
      let capabiltiy2 = playerOwner.getCapability(/public/PlayerReceiver)!

      let receiverRef1 = capability1.borrow<&{CricketFlow.PlayerReceiver}>()
                        ?? panic("Could not borrow the receiver refrence")
      let receiverRef2 = capability2.borrow<&{CricketFlow.PlayerReceiver}>()
                        ?? panic("Could not borrow the receiver refrence")

      log("Account 1 PlayerNFT")
      log(receiverRef1.getIDs())

      log("Accoutn 2 PlayerNFT")
      log(receiverRef2.getIDs())
    }
    `
  ]);

  return fcl.decode(response);
};








function App() {
  const [user, setUser] = useState(null);

  const userData = (user) => {
    if (user.cid) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    return fcl.currentUser().subscribe(userData);
  }, []);

  const [scriptResult, setScriptResult] = useState(null);
  const callScript = async () => {
    const result = await script1;
    setScriptResult(result);
  };


  const userLoggedIn = user && !!user.cid;

  return (
    <div>
      <button onClick={callScript}>Execute Script</button>
      {scriptResult && (
        <div>
          <p className="script-result">Computation Result: {scriptResult}</p>
        </div>
      )}

      {!userLoggedIn ? (
        <button
          onClick={() => {
            fcl.authenticate();
          }}
        >
          Login
        </button>
      ) : (
        <>
          <h1 className="welcome">Welcome, {user.identity.name}</h1>
          <p>Your Address</p>
          <p className="address">{user.addr}</p>
          <button onClick={simpleTransaction}>Submit Tx</button>
          <button onClick={deployNFTContract}>Deploy NFT</button>
          <button onClick={mintToken}>Mint Token</button>
          <button onClick={createCollection}>Create Collection</button>
          <button onClick={transferNFT}>Transfer NFT</button>
          <button
            onClick={() => {
              fcl.unauthenticate();
            }}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default App;