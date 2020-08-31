import * as fcl from "@onflow/fcl";
import * as sdk from "@onflow/sdk";

export const setupAdminAccount = async () => {
  const { authorization } = fcl.currentUser();
  const tx = await fcl.send([
    fcl.transaction`
    import FanCoin from 0xe03daebed8ca0615
    import Toke from 0xf3fcd2c1a78f5eee
    // This transaction sets up an admin account s
    // Signed by the user that creates an admin account 
    transaction {
        prepare(acct: AuthAccount) {
        // Create an empty FanCoin Admin resource
        let FanAdmin <- FanCoin.createEmptyFanAdmin()

        // Create an empty Toke Admin
        let TokeAdmin <- Toke.createAdmin()
        // Save the resources in storage
        acct.save<@FanCoin.FanAdmin>(<-FanAdmin, to: /storage/FanAdmin)
        acct.save<@Toke.Admin>(<-TokeAdmin,to: /storage/TokeAdmin)

        // Save admin capabilities to the private domain
        acct.link<&Toke.Admin>(/private/Admin, target: /storage/TokeAdmin)
        acct.link<&{Toke.AdminPublic}>(/public/TokePublic, target: /storage/TokeAdmin)
        acct.link<&{FanCoin.AdminPublic}>(/public/CoinPublic, target: /storage/FanAdmin)
        acct.link<&{Toke.AdminPublic}>(/public/TokePublic, target: /storage/TokeAdmin)

        acct.link<&FanCoin.FanAdmin>(/private/Admin, target: /storage/FanAdmin)
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

