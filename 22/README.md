# Versus – Better for Art

## Product

Our project, Versus, is an art platform where established and approved artists release an artwork in the form of a weekly drop. Each week there will be an artwork released on the site, and buyers will have the ability to place bids on exclusive (1/1) artworks or edition artworks (1/10-25). Whichever auction  generates more revenue for the artist (either exclusive or editions) wins the auction, and the respective number of NFTs are then minted (either 1 or 10-25).

#### Recorded Presentation

- [Product video](https://www.youtube.com/watch?v=zv5lMRjC73s&feature=youtu.be)
- [Technical video](https://www.youtube.com/watch?v=vr2Zo0hrkH0&feature=youtu.be)

#### Slides Presentation

[Presentation slides](https://docs.google.com/presentation/d/e/2PACX-1vRN7BAYQBe4C96qmStubGS_YFW0__vGxCC4Ftce8mupRW572S8396GQtlYNadWjGy52kxleEfnNgk8J/pub?start=false&loop=false&delayms=3000)

**Noteable Technical Features**
 - Curated drops; owner of marketplace add drops not artists
 - Extending the time of all auctions on late bid to avoid a late bidder from hijacking the auction
 - Bid on tied auction is allowed after the auction has ended. There has to be a winner
 - Money bid in an auction is escrowed to ensure that the artist will get the money on a settlement
 - All values are customizable from outside the contract. Length of auction, cut percentage and so on

**Current Limitations**

- A way to actually pay for the art and earn money.
- Web frontend is not responsive and only looks good in firefox in certain resolutions
- Only localy deployed and tested
- The web frontend is currently using the height to the block to measure time. On devnet that might have to change to using unix_timestamp

**Future Additions**

- The contract has some points around security and composability that we should address but they depend on features in cadence being developed.
- Using metadata in the NFT to store information about the art, and the art itself
- Create a NFTEditioner that will take a NFT and edition it with a given number of editions


## Technical

All the code for versus is located in our [github organization](https://github.com/versus-flow)

The relevant technical parts and their state at the end of OWB can be found at the following links

 - [ Contracts ](https://github.com/versus-flow/auction-flow-contract/tree/OWB)
 - [ Website ](https://github.com/versus-flow/versus-action-website/tree/OWB)

Part of the contracts was made in cooperation with team #23.

As part of the OWB program team 22 and team 23 also cooperated on making [a tool](https://github.com/versus-flow/go-flow-tooling) to make it easier to apply contracts, run transactions and scripts. 

### Demo

Follow the readme instructions in 
[ Contracts ](https://github.com/versus-flow/auction-flow-contract/tree/OWB) for a pure terminal based demo. 

Follow the instructions in the 
[ Website ](https://github.com/versus-flow/versus-action-website/tree/OWB) repo for a mixed demo. 

Firefox and a large monitor is recommended for a good UI experience on the web.

#### What happens in the demo

1. Install all contracts
2. Create a versus marketplace with 15% marketplace cut
3. Add a drop to the marketplace with 10 editions
4. Make a bid on the unique auction
5. Here you can optionally go the web, login as another user and make bids if you want 
6. Settle the auction
7. Print out results


