# Versus

## Product


#### Recorded Presentation

- [product video](https://www.youtube.com/watch?v=zv5lMRjC73s&feature=youtu.be)
- [technial video](https://www.youtube.com/watch?v=vr2Zo0hrkH0&feature=youtu.be)

#### Slides Presentation

[Presentation slides](https://drive.google.com/file/d/1-Xq7C1EddjBRRxrKGXhEjH4TWSs6B6PQ/view?usp=sharing)

**Current Limitations**

- A way to actually pay for the art and earn money.
- web frontend is not responsive and only looks good in firefox in certain resolutions
- devnet deploy
- the web frontend is currently using the heigh to the block to messure time. On devnet that might have to change to using unix_timestamp


**Future Additions**

- The contract has some points around security and composability that we should address but they depend on features in cadence beeing developed.
 -- Using metadata in the NFT to store information about the art, and the art itself
 -- Create a NFTEditioner that will take a NFT and edition it with a given number of editions

## Technical

All the code for versus is located in our [github organization](https://github.com/versus-flow)

The relevant technical parts and their state at the end of OWB can be found at the following links

 - [ contracts ](https://github.com/versus-flow/auction-flow-contract/tree/OWB)
 - [ website ](https://github.com/versus-flow/versus-action-website/tree/OWB)

Part of the contracts was made in cooperation with team #23.

As part of the OWB program team 22 and team 23 also cooperated on making [a tool](https://github.com/versus-flow/go-flow-tooling) to make it easier to apply contracts, run transactions and scripts. 

### Demo

Follow the readme instructions in 
[ contracts ](https://github.com/versus-flow/auction-flow-contract/tree/OWB) for a pure terminal based demo. 

Follow the instructions in the 
[ website ](https://github.com/versus-flow/versus-action-website/tree/OWB) repo for a mixed demo. 

Firefox and a large monitor is recommended for a good UI experience on the web.

#### What happends in the demo

1. Install all contracts
2. Create a versus marketplace with 15% marketplace cut
3. Add a drop to the marketplace with 10 editions
4. Make a bid on the unique auction
5. Here you can optionally go the web, login as another user and make bids aso
6. Settle the auction
7. Print out results


