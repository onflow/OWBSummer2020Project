import FanCoin from 0xe03daebed8ca0615
import Toke from 0xf3fcd2c1a78f5eee


// This transaction creates an empty, fanBoard in the user's account. Since it requires the admin capability, we need to sign it by the admin here.

//Signed by the admin
transaction {
    let leaderboard: &FanCoin.LeaderBoardManager

    prepare(acct: AuthAccount) {
    self.leaderboard = acct.borrow<&FanCoin.LeaderBoardManager>(from:/storage/FanBoard)!
    }

    execute {

      // Get the recipient's public account object
    let admin = getAccount(0xfd43f9148d4b725d)
    
    // get the Collection reference for the receiver
    let adminRef = admin.getCapability(/public/CoinPublic)!.borrow<&{FanCoin.AdminPublic}>()!

    self.leaderboard.createEmptyFanBoard(adminPublic: adminRef as &{FanCoin.AdminPublic})

    log("Streamer followed")
  }
}
 