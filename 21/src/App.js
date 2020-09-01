import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Welcome from './Welcome'
import Dashboard from './Dashboard'
import Marketplace from './Marketplace'


fcl.config()
  .put("challenge.handshake", "http://localhost:8701/flow/authenticate")

const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []

function App() {
  const [authenticatedUser, setUser] = useState(null);

  const [ownedAssets, setownedAssets] = useState([]);
  const [assetId, setassetId] = useState(''); // '' is the initial state value

  const [price, setPrice] = useState(null);
  const [globalSale, setGlobalSale] = useState([]);

  const handleUser = (user) => {
    if (user.cid) {
      setUser(user);
      const found = users.find(member => member.address === user.addr)
      if (found == null) {
        users.push({ id: user.cid, address: user.addr, name: user.identity.name })
        localStorage.setItem('users', JSON.stringify(users))
      } else {
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    return fcl.currentUser().subscribe(handleUser);
  }, []);


  const resetData = async () => {
    setassetId('')
    setPrice([])
    setUser([])
  }

  const userLoggedIn = authenticatedUser && !!authenticatedUser.cid

  return (
    <Router>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/dashboard">
          <Dashboard authenticatedUser={authenticatedUser}/>
        </Route>
        <Route path="/marketplace">
          <Marketplace authenticatedUser={authenticatedUser}/>
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>

  </Router >
  );
}

export default App;
