# Orbital Auction Smart Contract

Orbital is a game where you bid for rocks (NFT). Rocks are distributed into Orbs which Players can make bids on and compete for ownership of.

## Presentation

[![Presentation Video on YouTube](https://img.youtube.com/vi/V7a-qwlKKys/0.jpg)](https://www.youtube.com/watch?v=V7a-qwlKKys)

[Google Slide Deck](https://docs.google.com/presentation/d/1-nXWwUu8lvQ9sxyn1ichKejXjUx8xVSiLnA0J2rFk0k/)

## Technical Demonstration

Our project tackles distribution of game items. We distribute rocks (an example in game NFT) based on a simple game mechanism. Players bid with a fungible token and receive rewards in the form of the fungible token and Rock NFTs.

We've put Cadence and the Flow blockchain to the test by performing all calculations on-chain. The Orbital Auction smart contract uses the FungibleToken and NonFungibleToken standards from the Flow team, so the DemoToken and Rocks can be replaced by any custom tokens that conform to the standard.

[![Technical Demonstration Video on YouTube](https://img.youtube.com/vi/WwAQOymEvkA/0.jpg)](https://www.youtube.com/watch?v=WwAQOymEvkA)

## Deployment

1. Ensure Go is [installed on your machine](https://golang.org/dl/) `recommended version 1.14^`
2. [Install the Flow CLI](https://docs.onflow.org/docs/cli) and VS Code Extension
3. Run `git clone https://github.com/0xAlchemist/orbital-auction` in a terminal window
4. Change to the project directory `cd orbital-auction`
5. Run `mv flow.sample.json flow.json` to rename `flow.sample.json` to `flow.json` 
6. Run `flow emulator start -v` in terminal window 1
7. Run `make` in terminal window 2
 
- Blockchain output will appear in window 1 (`emulator window`)
- Demo script instructions will appear in window 2 (`make window`)

## Technical Limitations and Future Additions

- Does not wait for active bidders before starting the first Epoch
- Does not handle a case where there are two competing "highest bids"
- There is no commission percentage for auction host or token sellers
- There is no method to safely return Rocks (NFTs) to the auction host's collection

We didn’t get a chance to implement any front end or many of the features we wished to make this into a playable game. With more time and resources we would have accomplished a lot more in terms of technical implementation. In the future we would flesh out the idea in more detail and perhaps make a generalised protocol based upon this idea.
