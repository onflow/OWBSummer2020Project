import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const addMementoToDeck = async (deck, memento) => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`
    import Toke from 0xf3fcd2c1a78f5eee
    transaction() {

    // Here no function requires a capability, hence none is required 
    // Signed by the admin.
    prepare(acct: AuthAccount) {
        let destinationDeck = UInt32(${deck})
        let mementoToAdd = UInt32(${memento})
        // borrow a reference to the Admin resource in storage
        let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")
        
        // Borrow a reference to the deck to be added to
        let deckRef = admin.borrowDeck(deckID: destinationDeck)

        // Add the specified memento ID
        deckRef.addMemento(mementoID:mementoToAdd)

        log("Memento ${memento} added to  deck ${deck}")
    }
}
    `,
    sdk.payer(authorization),
    sdk.proposer(authorization),
    sdk.authorizations([authorization]),
    sdk.limit(100),
  ]);

  console.log({ tx });
}



