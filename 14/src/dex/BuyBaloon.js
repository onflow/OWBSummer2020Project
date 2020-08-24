import React, {useState, useContext} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'
import GlobalContext from '../Global'

const getSimpleTransaction = (amount) => (`\
// Transaction1.cdc
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

transaction {
  prepare(acct: AuthAccount) {
    let flowVault = acct.borrow<&{FlowToken.Receiver, FlowToken.Provider, FlowToken.Balance}>(from: /storage/FlowVault)
            ?? panic("Could not borrow a reference to the owner's vault")
    let baloonVault = acct.borrow<&{BaloonToken.Receiver, BaloonToken.Provider, BaloonToken.Balance}>(from: /storage/BaloonVault)
            ?? panic("Could not borrow a reference to the owner's vault")

    let dexAccount = getAccount(0xf3fcd2c1a78f5eee)
    let dexRef =  dexAccount.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")

    dexRef.XToY(
      from: <- flowVault.withdraw(amount: UFix64(${amount})),
      to:baloonVault
    )
  }
}
`)

const BuyBaloon = () => {
  const [status, setStatus] = useState("Not started")
  const [transaction, setTransaction] = useState(null)
  const [amount, setAmount] = useState(1)
  const context = useContext(GlobalContext);
  const address = context.user && context.user.addr
  const {setUpdate, update} = context
  const simpleTransaction = getSimpleTransaction(amount)
  const runTransaction = async (event) => {
    event.preventDefault()
    
    setStatus("Resolving...")

    const blockResponse = await fcl.send([
      fcl.getLatestBlock(),
    ])

    const block = await fcl.decode(blockResponse)
    try {
      const { transactionId } = await fcl.send([
        fcl.transaction(simpleTransaction),
        fcl.proposer(fcl.currentUser().authorization),
        fcl.authorizations([
          fcl.currentUser().authorization,
        ]),
        fcl.payer(fcl.currentUser().authorization),
        fcl.ref(block.id),
        fcl.limit(100),
      ])

      setStatus("Transaction sent, waiting for confirmation")

      const unsub = fcl
        .tx({ transactionId })
        .subscribe(transaction => {
          setTransaction(transaction)
          
          if (fcl.tx.isSealed(transaction)) {
            setStatus("Transaction is Sealed")
            setUpdate(new Date())
            unsub()
          }
        })
    } catch (error) {
      console.error(error);
      setStatus("Transaction failed")
    }
  }
  let message
  if (transaction){
    message = transaction.errorMessage == "" ? (<Code>Done!</Code>) : (<Code>{transaction.errorMessage}</Code>)
  }

  const updateAmount = (event) => {
    event.preventDefault();
    const value = event.target.value
    setAmount(value)
    context.setAddingFlow(value)
  }
  console.log('BuyBaloon', context.flowAmountGained)

  return (
    <Card>
      Pay <input
        placeholder="Enter Amount"
        onChange={updateAmount}
        style={{margin:"0.5em", width:"7em"}}
      /> Flow token to buy {context.flowAmountGained} 🏀token

      <button onClick={runTransaction} style={{margin:"0.5em"}}>
        Swap
      </button>
      <div>{message}</div>
    </Card>
  )
}

export default BuyBaloon