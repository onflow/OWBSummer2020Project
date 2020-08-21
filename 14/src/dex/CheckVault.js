import React, {useState, useContext, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import GlobalContext from '../Global'

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'

const getScript = (address) => ( `\
import FlowToken from 0x01cf0e2f2f715450

pub fun main() :Bool {
  // Get the accounts' public account objects
  let acct1 = getAccount(0x${address})

  let flowCap = acct1.getCapability(/public/FlowReceiver)!

  return flowCap.check<&FlowToken.Vault{FlowToken.Receiver}>()
}
`)

export default function ScriptOne() {
  const [data, setData] = useState(null)
  const context = useContext(GlobalContext);
  const {setVault, update, vault} = context
  const address = context.user && context.user.addr
  const scriptOne = getScript(address)

  const runScript = async () => {

    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    const data = await fcl.decode(response)
    setData(data)
    if(data && !vault) setVault(true)    
  }
  useEffect(async () => {
    runScript()
  }
  , [])

  return (
    <></>
  )
}
