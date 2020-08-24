import React, {useState, useContext, useEffect} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'
import GlobalContext from '../Global'

const getScript = (address) => ( `\
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31

pub fun main() :[UFix64] {
  // Get the accounts' public account objects
  let acct1 = getAccount(0x${address})
  let acct1FlowReceiverRef = acct1.getCapability(/public/FlowReceiver)!
                          .borrow<&FlowToken.Vault{FlowToken.Balance}>()
                          ?? panic("Could not borrow a reference to the acct1 Flow  receiver")

  let acct1BaloonReceiverRef = acct1.getCapability(/public/BaloonReceiver)!
                          .borrow<&BaloonToken.Vault{BaloonToken.Balance}>()
                          ?? panic("Could not borrow a reference to the acct1 Baloon receiver")

  return [acct1FlowReceiverRef.balance, acct1BaloonReceiverRef.balance]
}
`
)

export default function ScriptOne() {
  const [data, setData] = useState(null)
  const context = useContext(GlobalContext);
  // const address = context.user && context.user.addr
  const {user:{addr:address}} = context
  const {update} = context
  const scriptOne = getScript(address)
  const runScript = async (event) => {
    event && event.preventDefault()

    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    
    setData(await fcl.decode(response))
  }
  useEffect(() => {
    runScript()
  }, [update])


  return (
    <Card>
      <Header>Your Balance</Header>
      {data && (
        <ul>
          <li>{data[0].toFixed(5)} Flow tokens </li>
          <li>{data[1].toFixed(5)} 🏀 tokens </li>
        </ul>
      )}

    </Card>
  )
}
