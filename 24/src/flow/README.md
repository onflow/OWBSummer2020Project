# Flow side of converter

1.  `components` contains react components being used by converter.

2.  `contracts` contains all the cadence code basically.

    *   `Creature.cdc` is the contract to mint Creature NFT.

    *   `setupUser.cdc` is the transaction which adds a public capability to NFTcollection for user to receive NFT from minter.

    *   `mintNFT.cdc` is the transaction to mint NFT to user.

    *   `checkReceiver.cdc` is the script to check if logged user has a public capability to receive NFTs is setup or not.
    
    *   `displayNFTs.cdc` is the script to check the flow ID of newly minted NFT corresponding to user's provided ethereum NFT.

3. `utils` contains all the javascript functions that are used to create accounts, sign transactions, call scripts and to interact with flow blockchain.
        