import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
// import * as sdk from "@onflow/sdk";
// import * as types from "@onflow/types";
import { setupAdminAccount, setupCustomerAccount } from './flow-transactions'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
const admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : []
function Welcome() {
    const [authenticatedUser, setUser] = useState(null);


    useEffect(() => {
        return fcl.currentUser().subscribe(handleUser);
    }, []);

    const handleUser = (user) => {
        if (user.cid) {
            setUser(user);
            localStorage.setItem('authenticatedUser', JSON.stringify(user))
            const found = users.find(member => member.address === user.addr)
            if (found == null) {
                users.push({ id: user.cid, address: user.addr, name: user.identity.name })
                localStorage.setItem('users', JSON.stringify(users))
            } else {
            }
        } else {
            setUser(null);
            localStorage.removeItem('authenticatedUser')
        }
    };

    const addAdmin = (newAdmin) => {
        const found = admins.find(member => member.address === newAdmin.addr)
        console.log(JSON.stringify(found))
        if(found == null){
            admins.push({id:newAdmin.cid,address:newAdmin.addr,name: newAdmin.identity.name})
            localStorage.setItem('admins', JSON.stringify(admins))
        }
    }
    
    const callSetupCustomerAccount = async () => {
        await setupCustomerAccount();
    };

    const authenticate = () => {
        fcl.authenticate()
    }

    const unauthenticate = () => {
        fcl.unauthenticate()
    }

    const callSetupAdminAccount = async () => {
        addAdmin(authenticatedUser)
        await setupAdminAccount();
    };


    return (
        <body>
            <div className="container">
                <div className='row'>
                    <div className='col'>
                        <h1 className='text-center'>Welcome to Toke</h1>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        {authenticatedUser ? (<>
                            <div className="card bg-light mx-auto " style={{ maxWidth: "30rem" }}>
                                <div className="card-header">
                                    <h5>User card</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">Your id is <strong>{authenticatedUser.cid}</strong></p>
                                    <p className="card-text">Your address is <strong>{authenticatedUser.addr}</strong></p>
                                    <button className="mx-1" onClick={() => unauthenticate()}>Logout</button>
                                    <button className="mx-1"><Link to="/dashboard">Admin dashboard</Link></button>
                                    <button className="mx-1"><Link to="/marketplace">Marketplace</Link></button>

                                </div>
                            </div>
                            <div className='row mt-2'>
                                <button className="ml-auto mr-2" onClick={() => callSetupAdminAccount()}>Setup admin account</button>
                                <button className="mr-auto ml-2" onClick={() => callSetupCustomerAccount()}>Setup customer account</button>
                            </div >
                        </>) : (<>
                            <div className='text-center'>
                                <button onClick={() => authenticate()} style={{ maxWidth: "18rem" }}>Login</button>
                                <p> We currently have {users.length} users</p>
                            </div>

                        </>)}
                    </div>
                </div>
            </div >

        </body>
    );
}
export default Welcome;
