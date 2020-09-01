import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const createDeck = async (name) => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`//Setup deck
    import Toke from 0xf3fcd2c1a78f5eee
    
    // As the createDeck() function expects a capability, we have to use it here over the borrow() directly.
    
    // Signed by the admin
    transaction() {
        prepare(acct: AuthAccount) {
            // Choose the name of the deck
            let deckName = "${name}" 
            // borrow a reference to the Admin resource in storage
            let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
                ?? panic("Could not borrow a reference to the Admin resource")
            // Create a deck with the specified name
            admin.createDeck(name: deckName,adminCap: acct.getCapability<&Toke.Admin>(/private/Admin)!)
            log("Deck created with name : ${name}")
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