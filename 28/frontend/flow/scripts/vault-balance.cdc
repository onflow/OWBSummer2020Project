
import FungibleToken from 0x01

pub fun main():UFix64 {
    let capability = getAccount(0x02).getCapability(/public/MainReceiver)!
    let balanceReference = capability
        .borrow<&FungibleToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow a reference to the acct1 receiver")
    return balanceReference.balance
}
