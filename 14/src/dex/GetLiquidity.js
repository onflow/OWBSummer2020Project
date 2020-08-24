import React, {useEffect, useState, useContext} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import GlobalContext from '../Global'

const scriptOne = `\
import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31
import Dex from 0xf3fcd2c1a78f5eee

pub fun main() :[UFix64] {
    // Get the accounts' public account objects
    let acct1 = getAccount(0xf3fcd2c1a78f5eee)
    let dexRef =  acct1.getCapability(/public/DexPool)!
                            .borrow<&Dex.Pool{Dex.PoolPublic}>()
                            ?? panic("Could not borrow a reference to the acct1 receiver")
    return [dexRef.xLiquidity(), dexRef.yLiquidity(), dexRef.xPrice(), dexRef.yPrice()]
}
`

export default function ScriptOne() {
  const [data, setData] = useState(null)
  const context = useContext(GlobalContext);
  const {update} = context
  const runScript = async () => {
    const response = await fcl.send([
      fcl.script(scriptOne),
    ])
    
    let data = await fcl.decode(response)
    setData(data)
    context && context.setFlowReserve(data[0])
    context && context.setBaloonReserve(data[1])
  }
  useEffect(() => {
    runScript()
  }, [update])
  return (
    <Card>
      {data && (
        <>
        <h2>
          Pool
        </h2>
        <ul>
          <li>Flow token = {data[0].toFixed(5)} </li>
          <li>🏀token = {data[1].toFixed(5)} </li>
        </ul>
        <h2>
        Swap
        </h2>
        <ul>
        <li>1 Flow = {data[2].toFixed(5)} 🏀 </li>
        <li>1 🏀 = {data[3].toFixed(5)} Flow </li>
        </ul>
        </>

      )}
    </Card>
  )
}
