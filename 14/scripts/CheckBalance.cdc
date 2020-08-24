// Script1.cdc

import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

pub fun main() :[UFix64] {
    // Get the accounts' public account objects
    let acct1 = getAccount(0xf3fcd2c1a78f5eee)

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let acct1FlowReceiverRef = acct1.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")

    let acct1BaloonReceiverRef = acct1.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")


    let dexRef =  acct1.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")


    // Use optional chaining to read and log balance fields
    log("***Flow Dex Balance")
	log(acct1FlowReceiverRef.balance)

    log("***Baloon Dex Balance")
    // Use optional chaining to read and log balance fields
    log("Account 1 Balance")
	log(acct1BaloonReceiverRef.balance)

    log("dexRef")
    log("Flow token liquidity")
    log(dexRef.xLiquidity())
    log("Baloon token liquidity")
    log(dexRef.yLiquidity())
    log("Flow token price")
    log(dexRef.xPrice())
    log("Baloon token price")
    log(dexRef.yPrice())
    return [acct1FlowReceiverRef.balance, acct1BaloonReceiverRef.balance]
}
 