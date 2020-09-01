[![dummy photo](https://github.com/jacob-tucker/Leel/blob/master/packages/client/src/dapp/pages/leel_logo_together_new.png)](https://play.onflow.org/0d507a56-cf87-4232-a5dd-bcc585b64551)

Leel is a decentralized application developed on the [Flow](https://docs.onflow.org/docs/introduction) blockchain using a resource-oriented language, [Cadence](https://docs.onflow.org/docs/cadence).
# Overview

This is the slides to our presentation: https://docs.google.com/presentation/d/1s0U78JeiGW3df4ACDIBAiWk9KzshEkZrxC9a5ytu-xQ/edit

Promo video: https://drive.google.com/file/d/1Ar5uVSH_hXPOOZi6c569JuP4pdzcZtkZ/view?usp=sharing

Technical video: https://drive.google.com/file/d/14ZaaWbiG3Rv5UgaMg_5EuEziMVojpNUg/view

## Purpose

To create an equitable system where consumers can capitalize on their unique customer value to receive individualized rewards and foster opportunities for social good.

## Problem

Consumers have limited opportunity to leverage their unique customer value. Many times, a user's loyalty is often lost if there is no way to utilize it.
Customers are passive participants, not owners of their data.

## Current limitations

It is very complex and hard for retailers to be able to decide what UCV and CV values a customer would need to interact with other retailers if spending multiple types of tokens. Also, as of now, we do not have any connections between Retailers and NonProfits, because if a retailer was to donate to nonprofits and the nonprofits --> a customer, the retailers tokens could be spent somewhere without doing anything.

## Contracts, Transactions & Scripts

The contracts can be found in packages/dapplib/contracts

The transactions can be found in packages/dapplib/cadence/transactions

The scripts can be found in packages/dapplib/cadence/scripts

## The playground can be found [here](https://play.onflow.org/0d507a56-cf87-4232-a5dd-bcc585b64551).

### Notes

At the root of the project, we have three contracts for FungibleToken, NonFungibleToken, and Rewards respectively.

The FungibleToken contract is a sample implementation of a fungible token on Flow. Fungible tokens behave like everyday currencies -- they can be minted, transferred or traded for digital goods.

NFTs exist to represent assets that are unique and indivisible. The NFT contract allows users to withdraw and deposit NFTs. It also enables admins to mint new NFTs.

The Rewards contract provides a definition for the list of reward items of each retailer. It enables a retailer to create or destroy a new reward item, and to declare its cost.

### Transaction Explanations

**1. Customer Set Up**

Run transaction 1, signed by the customer account. This transaction sets up a new user for the marketplace by publishing a Vault reference, so that retailers can deposit points into the user's account. It also creates an empty NFT Collection for the
user so they can eventually receive NFTs from the retailer after certain thresh-holds. 

**2. Retailer Set Up**

Run transaction 2, signed by the retailer account. This transaction sets up the retailer for the marketplace by giving them the ability to mint fungible and nonfungible tokens, so that they can then transfer them to the customer. Note that both the fungible and nonfungible minting methods take in a recipient, so these are just definitions for the retailer to be able to deposit
tokens into a customer's account.

**3. Earning Points**

Run transaction 3, signed by the retailer. This transaction deposits fungible tokens (points) into the customer's account. It also updates the user's unique-customer-value for making a purchase at the store.

**4. Creating a Reward Item**

Run transaction 4, signed by the retailer. This transaction creates a reward item along with its price. 

There are multiple other paramaters that go into creating a reward. Because users can use tokens from other retailers
to purchase an NFT at one retailer, the retailer must specify which retailers the users can use their points from,
the minimum amount of tokens required from this retailer, and the extra cost of using tokens from another retailer.
        
- ucvNumber, which is the minimum UCV the customer must have to use tokens from another retailer
- otherRetailers, which is a list of retailers the user is allowed to spend their tokens from to help out with thr purchase
- minTokensPercent, which is a percent of the amount of tokens the user must spend from THIS retailer in the transaction
- multiplier, which multiplies the base cost of the NFT by a number to get a new cost if incorporating another r

**5. Spend Points**

Run transaction 5, signed by the customer. This transaction allows the customer to spend tokens on an item registered on the retailer's rewards list. If the customer has enough FTs in their account, then it will be deducted accordingly. In a successful transaction, the reward item will be deposited to the customer's NFT receiver.

Note that customers can use a combination of tokens from two retailers. If the user specifies they only want to spend tokens from the specific retailer,
they will not have to use as many tokens and will get a better price. If the user chooses to use a combination of tokens from multiple retailers, the price
will be adjusted, however they can use those other loyalty points from other places and allow them to benefit them here.

**6. Removing a Reward Item**

This transaction allows a retailer to remove a reward item from their list.

**7. Trade NFTs**

This transaction trades an NFT for a certain amount of fungible tokens. One user receives an NFT and one user receives a certain amount of fungible tokens. It is to be signed by the person owning and selling the NFT.

**8. Instagram Ad**

This transaction, signed by retailer, is triggered when a user posts on instagram promoting the retailer. They will earn points and receive an updated UCV value for their good deeds (less than what they would get for purchasing at the retailer, though).

**9. Setup for NonProfit**

This transaction allows NonProfits to set up an account. This brings in the community good component, as customers will be able to give them NFTs for their campaigns.

**10. Stake a NonProfit**

This transaction allows customers to donate their NFTs to NonProfits to stake their campaigns and help with their projects/desires. The NFT will be removed from the customer's account and placed into the NonProfit's NFT Collection.

## Future Additions
- Find a way to tie a customer's donations to NonProfits to a ICV (individual community value). This will then have an impact on the customer's UCV and thus their treatment at certain retailers based on how important they view the ICV to be.
- Come up with a way to figure out a customer's loyalty behavior through their purchasing preferences and behavior, for example figuring out a user loves to buy from grocery stores, so we'll give them greater rewards at grocery stores. Or, if a user always brings their family to a sporting store, but buys for him/herself at a food market, how can we encourage the customer to potentially bring his family to the food market.
- Provide a way for retailers to interact with NonProfits directly, which would introduce a way for retailers to donate their tokens to NonProfits.

## Pre-requisites

We used DappStarter to help us get started, and it allowed us to have a nice UI to perform our smart contracts upon certain actions. The creators of DappStarter (the TryCrypto team) can be found here: https://www.trycrypto.com/

In order to develop and build the Leel Dapp the following pre-requisites must be installed:

* [Visual Studio Code](https://code.visualstudio.com/download) (or any IDE for editing Javascript)
* [NodeJS](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/docs/install) (DappStarter uses [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces))
* [Flow CLI](https://docs.onflow.org/docs/cli) (https://docs.onflow.org/docs/cli) (after installation run `flow cadence install-vscode-extension` to enable code highlighting for Cadence source files)

## Installation

Using a terminal (or command prompt), change to the folder containing the project files and type: `yarn` This will fetch all required dependencies. The process will take 1-3 minutes and while it is in progress you can move on to the next step.

## Build, Deploy and Test

Using a terminal (or command prompt), change to the folder containing the project files and type: `yarn start` This will run all the dev scripts in each project package.json, and open up the application in your browser.

To view your dapp, open your browser to http://localhost:5000
