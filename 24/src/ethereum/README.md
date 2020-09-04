# Ethereum side of Converter

This directory contains all the files required by ethereum side of converter

1.  `components` contains react components being used by converter.

2.  `contracts` contains the abi, bytecode, address of the contracts deployed on rinkeby to interact with them.

3.  `hooks` are functions which come handy to interact with contracts.

4.  `rinkeby` contains the solidity code deployed on rinkeby 

    *   `contracts` contains two contracts deployed on rinkeby

        *   `NFTescrow.sol` - Solidity contract which will hold NFT's for user 

        *   `Creature.sol` - Solidity contract used to mint Creature NFT to be used for this demo
        
    *   `Files` and `openzeppelin-solidity` contains contracts needed by above contracts to be imported before deploying on rinkeby.



