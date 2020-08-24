import React, {useState, useEffect, useContext} from "react"
import * as fcl from "@onflow/fcl"

import Card from '../components/Card'
import Header from '../components/Header'
import Code from '../components/Code'
import GlobalContext from '../Global'

const UserInfo = () => {
  const [user, setUser] = useState(null)
  const context = useContext(GlobalContext);
  useEffect(() =>
    fcl
      .currentUser()
      .subscribe(user => {
        setUser({...user})
        context.setUser({...user})
      })
  , [])

  return (
    <Card>
      <Header>User information</Header>
      
      {user && <Code>{JSON.stringify(user, null, 2)}</Code>}
    </Card>
  )
}

export default UserInfo
