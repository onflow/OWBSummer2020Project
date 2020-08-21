// Script1.cdc

import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

pub fun main() {
    // Get the accounts' public account objects
    let acct1 = getAccount(0x01)
    let acct2 = getAccount(0x02)
    let acct3 = getAccount(0x03)
    let acct4 = getAccount(0x04)

    // Get references to the account's receivers
    // by getting their public capability
    // and borrowing a reference from the capability
    let acct1FlowReceiverRef = acct1.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")
    let acct2FlowReceiverRef = acct2.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct2 receiver")
    let acct3FlowReceiverRef = acct3.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct3 receiver")
    let acct4FlowReceiverRef = acct4.getCapability(/public/FlowReceiver)!
                            .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct4 receiver")

    let acct1BaloonReceiverRef = acct1.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")
    let acct2BaloonReceiverRef = acct2.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct2 receiver")
    let acct3BaloonReceiverRef = acct3.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct3 receiver")
    let acct4BaloonReceiverRef = acct4.getCapability(/public/BaloonReceiver)!
                            .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                            ?? panic("Could not borrow a reference to the acct4 receiver")


    let dexRef =  acct1.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")


    // Use optional chaining to read and log balance fields
    log("***Flow")
    log("Account 1 Balance")
	log(acct1FlowReceiverRef.balance)
    log("Account 2 Balance")
    log(acct2FlowReceiverRef.balance)
    log("Account 3 Balance")
	log(acct3FlowReceiverRef.balance)
    log("Account 4 Balance")
    log(acct4FlowReceiverRef.balance)
    log("***Baloon")
    // Use optional chaining to read and log balance fields
    log("Account 1 Balance")
	log(acct1BaloonReceiverRef.balance)
    log("Account 2 Balance")
    log(acct2BaloonReceiverRef.balance)
    log("Account 3 Balance")
	log(acct3BaloonReceiverRef.balance)
    log("Account 4 Balance")
    log(acct4BaloonReceiverRef.balance)

    log("dexRef")
    log("dexRef")
    log(dexRef.xLiquidity())
    log(dexRef.yLiquidity())
    log(dexRef.xPrice())
    log(dexRef.yPrice())
}
 