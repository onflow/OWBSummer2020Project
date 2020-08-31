import FanCoin from 0xe03daebed8ca0615
import Toke from 0xf3fcd2c1a78f5eee

// This transaction sets up an admin account

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
    acct.link<&FanCoin.FanAdmin>(/private/admin, target: /storage/FanAdmin)

    log("Admin account created")
  }
}
 