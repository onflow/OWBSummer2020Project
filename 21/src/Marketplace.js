import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
// import * as sdk from "@onflow/sdk";
// import * as types from "@onflow/types";
import { followCeleb, checkCustomerNFTs, checkCustomerNFT } from './flow-transactions'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'


const Marketplace = (props) => {

    const authenticatedUser = props.authenticatedUser;

    const admins = localStorage.getItem('admins') ? JSON.parse(localStorage.getItem('admins')) : []


    const [NFTs, setNFTs] = useState([]);
    const callCheckCustomerNFTs = async () => {
        const tmpNFTs = await checkCustomerNFTs(authenticatedUser.addr)
        setNFTs(tmpNFTs)
    }


    /* ----------------------------------------------- */

    const callFollowCeleb = async (address) => {
        await followCeleb(address);
    };

    const [celebAddress, setCelebAddress] = useState()

    const handleCloseCelebAddress = () => setShowCelebAddress(false);
    const handleShowCelebAddress = () => setShowCelebAddress(true);
    const [showCelebAddress, setShowCelebAddress] = useState(false);

    /* ----------------------------------------------- */

    const [NFT, setNFT] = useState();
    const [NFTID, setNFTID] = useState(0);
    const callCheckNFT = async (nft) => {
        console.log(nft)
        const tmpNFT = await checkCustomerNFT(authenticatedUser.addr,nft)
        setNFT(tmpNFT)
    }

    const handleCloseCheckNFT = () => setShowCheckNFT(false);
    const handleShowCheckNFT = () => setShowCheckNFT(true);
    const [showCheckNFT, setShowCheckNFT] = useState(false);


    return (
        <div className="container">
            <div className='row'>
                <div className='col mx-auto'>
                    <h1 className='text-center'>Dashboard</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <div className="card bg-light mx-auto card-medium">
                        <div className="card-header">
                            <h5>User card</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">Your id is <strong>{authenticatedUser.cid}</strong></p>
                            <p className="card-text">Your address is <strong>{authenticatedUser.addr}</strong></p>
                            <button className='mx-1' ><Link to="/">Back to user page</Link></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col'>
                    <div className="card bg-light mx-auto" >
                        <div className="card-header">
                            <h5>Celebrity list</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{admins.map(admin => { return <p>{admin.name} is at address <strong>{admin.address}</strong></p> })} </p>
                            <p className="card-text"></p>
                            <button className="mx-1" onClick={handleShowCelebAddress}>Follow celebrity</button>
                        </div>
                    </div>
                </div >
                <div className='col'>
                    <div className="card bg-light mx-auto " >
                        <div className="card-header">
                            <h5>Following : NFT Collection</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{NFTs.map(NFT => { return (<p> {" id : " + JSON.stringify(NFT)}</p>) })}</p>
                            {NFT ? (<p className="card-text">{Object.keys(NFT)} is rewarding you {Object.values(NFT)} points</p>) :""}
                            <button className="mx-1" onClick={callCheckCustomerNFTs}>Get mementos list</button>
                            <button className="mx-1" onClick={handleShowCheckNFT}>Get memento details</button>

                        </div>
                    </div>
                </div>

                <div className='col'>
                    <div className="card bg-light mx-auto" >
                        <div className="card-header">
                            <h5>Customer : Fan points</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text"></p>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div >
            </div >
            <Modal show={showCelebAddress} onHide={handleCloseCelebAddress}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setCelebAddress(event.target.value)}
                            placeholder="Celebrity address to follow"
                            aria-label="Celebrity address to follow"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCelebAddress}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callFollowCeleb(celebAddress); handleCloseCelebAddress() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showCheckNFT} onHide={handleCloseCheckNFT}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setNFTID(event.target.value)}
                            placeholder="Memento ID to inspect"
                            aria-label="MementoID to inspect"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseCheckNFT}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callCheckNFT(NFTID); handleCloseCheckNFT() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}
export default Marketplace;
