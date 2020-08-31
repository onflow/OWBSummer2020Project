import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const createMemento = async (key,value) => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`
    import Toke from 0xf3fcd2c1a78f5eee
    transaction() {
        // As the createDeck() function expects a capability, we have to use it here over the borrow() directly.
    
        // Signed by the admin
        prepare(acct: AuthAccount) {
            let key = "${key}"
            let value = "${value}"
            // borrow a reference to the admin resource
            let admin = acct.borrow<&Toke.Admin>(from: /storage/TokeAdmin)
                ?? panic("No admin resource in storage")
            admin.createMemento(metadata: {key:value},adminCap: acct.getCapability<&Toke.Admin>(/private/Admin)!)
            log("Memento created with key : ${key} and value : ${value} ")
        }
    }
     `,
    sdk.payer(authorization),
    sdk.proposer(authorization),
    sdk.authorizations([authorization]),
    sdk.limit(100),
  ]);

  console.log({ tx });

/*   fcl.tx(tx).subscribe((txStatus) => {
    if (fcl.tx.isExecuted(txStatus)) {
      console.log("Transaction was executed");
    }
  }); */
}