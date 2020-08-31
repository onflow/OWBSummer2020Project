import React, { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";
// import * as sdk from "@onflow/sdk";
// import * as types from "@onflow/types";
import { createDeck, createMemento, checkAdminDecks, checkAdminMementos, addMementoToDeck, mintNFT } from './flow-transactions'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap'


const Dashboard = (props) => {





    const callCheckAdminDecks = async () => {
        const tmpDecks = await checkAdminDecks(authenticatedUser.addr)
        const deckArray = []
        for (const [key, value] of Object.entries(tmpDecks)) {
            deckArray.push({ [key.toString()]: value })
        }
        setDecks(deckArray)
    }

    const callCheckAdminMementos = async () => {
        const tmpMementos = await checkAdminMementos(authenticatedUser.addr)
        const mementosArray = []
        for (const [key, value] of Object.entries(tmpMementos)) {
            mementosArray.push({ [key.toString()]: value })
        }
        setMementos(mementosArray)
    }

    const [decks, setDecks] = useState([]);
    const [mementos, setMementos] = useState([]);

    /* ----------------------------------------------- */
    const [mintRecipientAddress, setMintRecipientAddress] = useState('')
    const [mintDeckID, setMintDeckID] = useState('')
    const [mintMementoID, setMintMementoID] = useState('')
    const [mintFanPoints, setMintFanPoints] = useState('')

    const [showMintNFT, setShowMintNFT] = useState(false);
    const handleCloseMintNFT = () => setShowMintNFT(false);
    const handleShowMintNFT = () => setShowMintNFT(true);

    const callMintNFT = async (recipientAddress, mementoID, deckID, fanPoints) => {
        await mintNFT(recipientAddress, mementoID, deckID, fanPoints);
    }
    /* ----------------------------------------------- */
    const [showDeckName, setShowDeckName] = useState(false);
    const [deckName, setDeckName] = useState('')

    const handleCloseDeckName = () => setShowDeckName(false);
    const handleShowDeckName = () => setShowDeckName(true);

    const callCreateDeck = async (name) => {
        await createDeck(name);
    };
    /* ----------------------------------------------- */
    const [showAddMemento, setShowAddMemento] = useState(false);
    const [addMementoID, setAddMementoID] = useState()
    const [addMementoDeck, setAddMementoDeck] = useState()

    const handleCloseAddMemento = () => setShowAddMemento(false);
    const handleShowAddMemento = () => setShowAddMemento(true);

    const callAddMementoToDeck = async (deckID, mementoID) => {
        await addMementoToDeck(deckID, mementoID);
    };

    /* ----------------------------------------------- */
    const [showMementoData, setShowMementoData] = useState(false);
    const [mementoKey, setMementoKey] = useState('')
    const [mementoValue, setMementoValue] = useState('')

    const handleCloseMementoData = () => setShowMementoData(false);
    const handleShowMementoData = () => setShowMementoData(true);

    const callCreateMemento = async (key, value) => {
        await createMemento(key, value);
    };

    const authenticatedUser = props.authenticatedUser;

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
                            <button className="mx-1" ><Link to="/">Back to user page</Link></button>
                            <button className="mx-1" onClick={callCheckAdminDecks}>Get deck information</button>
                            <button className="mx-1" onClick={callCheckAdminMementos}>Get mementos information</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row mt-2'>
                <div className='col'>
                    <div className="card bg-light mx-auto" >
                        <div className="card-header">
                            <h5>Admin : Decks</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{decks.map(deck => { return (<p> {" id : " + Object.keys(deck) + " name : " + Object.values(deck) + '\n'}</p>) })}</p>
                            <p className="card-text"></p>
                            <button className="mx-1" onClick={handleShowDeckName}>Create a new deck</button>
                            <button className="mx-1 mt-2" onClick={handleShowAddMemento}>Add memento to deck</button>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className="card bg-light mx-auto" >
                        <div className="card-header">
                            <h5>Admin : Mementos</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{mementos.map(memento => { return (<p> {" id : " + Object.keys(memento) + " name : " + Object.values(memento) + '\n'}</p>) })}</p>
                            <p className="card-text"></p>
                            <button className="mx-1" onClick={handleShowMementoData}>Create new memento</button>
                            <button className="mx-1" onClick={handleShowMintNFT}>Send NFT to fan</button>
                        </div>
                    </div>
                </div >

            </div >
            <Modal show={showDeckName} onHide={handleCloseDeckName}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setDeckName(event.target.value)}
                            placeholder="Deck's name"
                            aria-label="Deck's name"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeckName}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callCreateDeck(deckName); handleCloseDeckName() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showMementoData} onHide={handleCloseMementoData}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setMementoKey(event.target.value)}
                            placeholder="Memento's key"
                            aria-label="Memento's key"
                            aria-describedby="basic-addon2"
                        />
                        <FormControl onChange={event => setMementoValue(event.target.value)}
                            placeholder="Memento's value"
                            aria-label="Memento's value"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMementoData}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callCreateMemento(mementoKey, mementoValue); handleCloseMementoData() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showAddMemento} onHide={handleCloseAddMemento}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setAddMementoDeck(event.target.value)}
                            placeholder="Deck ID"
                            aria-label="Deck ID"
                            aria-describedby="basic-addon2"
                        />
                        <FormControl onChange={event => setAddMementoID(event.target.value)}
                            placeholder="Memento ID"
                            aria-label="Memento ID"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddMemento}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callAddMementoToDeck(addMementoDeck, addMementoID); handleCloseAddMemento() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showMintNFT} onHide={handleCloseMintNFT}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <FormControl onChange={event => setMintRecipientAddress(event.target.value)}
                            placeholder="Recipient ID"
                            aria-label="Recipient ID"
                            aria-describedby="basic-addon2"
                        />
                        <FormControl onChange={event => setMintDeckID(event.target.value)}
                            placeholder="Deck ID"
                            aria-label="Deck ID"
                            aria-describedby="basic-addon2"
                        />
                        <FormControl onChange={event => setMintMementoID(event.target.value)}
                            placeholder="Memento ID"
                            aria-label="Memento ID"
                            aria-describedby="basic-addon2"
                        />
                        <FormControl onChange={event => setMintFanPoints(event.target.value)}
                            placeholder="Fan points"
                            aria-label="Fan points"
                            aria-describedby="basic-addon2"
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseMintNFT}>
                        Close</Button>
                    <Button variant="primary" onClick={() => { callMintNFT(mintRecipientAddress, mintDeckID, mintMementoID, mintFanPoints); handleCloseMintNFT() }}>
                        Create
               </Button>
                </Modal.Footer>
            </Modal>
        </div>

    );
}
export default Dashboard;
