import HealthCrossingCore from 0x01
import HealthCrossingCoin from 0x02

// This transaction sets up an account to use Health Crossing with a vault and avatar.

transaction {
    prepare(acct: AuthAccount) {
      let vault <- HealthCrossingCoin.createEmptyVault()
      acct.save(<-vault, to: /storage/HealthCrossingCoinVault)
      acct.link<&{HealthCrossingCoin.Receiver}>(/public/HealthCrossingCoinVault, target: /storage/HealthCrossingCoinVault)

      let avatar <- HealthCrossingCore.mintAvatar(name: "Avatar1")
      acct.save(<-avatar, to:/storage/HealthCrossingAvatar)
    }
}