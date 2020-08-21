import HealthCrossingCore from 0x01
import HealthCrossingCoin from 0x02

// This transaction sets up an account to use Health Crossing with a vault and avatar.
transaction {
    prepare(acct: AuthAccount) {
      let avatar <- acct.load<@HealthCrossingCore.Avatar>(from: /storage/HealthCrossingAvatar)!
      let avatar2 <- HealthCrossingCore.updateAttributes(avatar: <-avatar, attributes: {"hoursAsleep": UFix64(6)})
      acct.save(<-avatar2, to:/storage/HealthCrossingAvatar)
    }
}