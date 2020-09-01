package main

import (
	"fmt"
	"math/rand"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

// Smart Contract Accounts
const nonFungibleToken = "NonFungibleToken"
const demoToken = "DemoToken"
const rocks = "Rocks"
const auction = "Auction"

// Bidder Accounts
const amountBidders = 6

// The amount of NFTs to mint
const amountNFTs = 8

func ufix(input string) cadence.UFix64 {
	amount, err := cadence.NewUFix64(input)
	if err != nil {
		panic(err)
	}
	return amount
}

func randomBid() cadence.UFix64 {
	// use rand.Intn to stick to round numbers
	bid := fmt.Sprintf("%d.0", rand.Intn(500)+10)
	return ufix(bid)
}

func promptAdvance(text string) {
	println()
	println(text)
	println("**********************")
	println("Press ENTER to advance")
	fmt.Scanln()
}

// Start from root dir with makefile
func main() {
	// Initialize our tooling
	flow := tooling.NewFlowConfigLocalhost()

	println()
	println("Orbital Auction | Proof of Concept Demo")
	println()
	println("Blockchain output will appear in the emulator terminal window.")
	println("This demonstration is best run with split terminal panes.")

	promptAdvance("Deploy smart contracts to the emulator")

	// Deploy Smart Contracts to Emulator Accounts
	flow.DeployContract(nonFungibleToken)
	flow.DeployContract(demoToken)
	flow.DeployContract(rocks)
	flow.DeployContract(auction)

	println()
	println("Smart Contracts Deployed...")
	println()
	println("Set up the auction host account:")
	println()
	println("* create the auction host account")
	println("* create empty DemoToken Vault")
	println("* create empty Rock Collection")
	println("* create empty OrbitalAuction Collection")

	promptAdvance("Proceed with setting up the auction host account.")

	// Setup DemoToken account with an NFT Collection and an Auction Collection
	flow.SendTransaction("setup/create_demotoken_vault", auction)
	flow.SendTransaction("setup/create_nft_collection", auction)
	flow.SendTransaction("setup/create_auction_collection", auction)

	println()
	println("Create and set up the 6 bidder accounts:")
	println()
	println("* create the bidder account")
	println("* create empty DemoToken Vault")
	println("* create empty Rock Collection")

	promptAdvance("Proceed with setting up the bidder accounts.")

	var bidders = make([]string, 0)
	for i := 1; i <= amountBidders; i++ {
		accountName := fmt.Sprintf("Bidder%d", i)

		flow.CreateAccount(accountName)
		bidders = append(bidders, accountName)
	}

	for _, bidder := range bidders {
		// Setup Auction Account with empty DemoToken Vault and Rock Collection
		flow.SendTransaction("setup/create_demotoken_vault", bidder)
		flow.SendTransaction("setup/create_nft_collection", bidder)
	}

	println()
	println(fmt.Sprintf("Mint %d Rocks to use as auction prizes", amountNFTs))

	promptAdvance("Proceed with minting Rocks.")

	// Mint DemoTokens for each account
	for i := 0; i < amountNFTs; i++ {
		flow.SendTransactionWithArguments("setup/mint_nft", rocks, flow.FindAddress(auction))
	}

	println()
	println("Rocks have been minted and deposited in the auction host's Rock collection")
	println()
	println("Create a new DemoToken minter with an allowed amount of 1,000,000 tokens for the DemoToken Admin")

	promptAdvance("Proceed to create DemoToken minter.")

	flow.SendTransactionWithArguments("setup/new_demotoken_minter", demoToken, ufix("1000000.0"))

	promptAdvance("Mint 100,000 tokens for each bidder")

	for _, bidder := range bidders {
		flow.SendTransactionWithArguments("setup/mint_demotokens", demoToken,
			flow.FindAddress(bidder), // Receiver address
			ufix("100000.0"))         // Amount of minted tokens

		println("DemoTokens have been minted and deposited for", bidder)
	}

	// CREATE NEW ORBITAL AUCTION
	println()
	println("Create a new Orbital Auction")
	println()
	println("Epochs - 8")
	println("Epoch Length - 12 blocks")
	println()
	print("* Epochs are a unit of time measured in blocks.\n\n* At the end of each Epoch, the highest bidder gets assigned as an owner to the Epoch's 'Orb'.\n\n* The 'Orbs' are resources that contain DemoTokens and Prizes (Rock NFTs) that are paid out to the owners the end of an auction.\n")

	promptAdvance("Proceed to create a new auction.")

	flow.SendTransactionWithArguments("create_auction/create_auction", auction,
		cadence.UInt64(8),  // Epoch Count
		cadence.UInt64(12)) // Epoch Length in Blocks

	println()
	println("A new auction has been created")
	println()

	flow.RunScript("check_auctions", flow.FindAddress(auction))

	println()
	println("In this demo, each bidder bids a random amount 15 times. Each bid takes place during a single block on the blockchain.")
	promptAdvance("Time to place some bids!")

	// BID ON THE AUCTION
	for i := 0; i < 15; i++ {
		flow.SendTransactionWithArguments("bid/place_bid", bidders[0],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())

		flow.SendTransactionWithArguments("bid/place_bid", bidders[1],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())

		flow.SendTransactionWithArguments("bid/place_bid", bidders[2],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())

		flow.SendTransactionWithArguments("bid/place_bid", bidders[3],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())

		flow.SendTransactionWithArguments("bid/place_bid", bidders[4],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())

		flow.SendTransactionWithArguments("bid/place_bid", bidders[5],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			randomBid())
	}

	promptAdvance("The Epoch data has been updating throughout the auction. Let's take a look at the current Epoch data:")

	// CHECK CURRENT EPOCH
	flow.RunScript("check_epoch", flow.FindAddress(auction), cadence.UInt64(1))

	println()
	println("We're in the final Epoch, 6 blocks away from the end of the auction.")
	println()
	println("You can also see the percentage of the highest bid that will be paid to each Orb at the end of the Epoch.")
	println("* (ie. Orb #1 gets %6.66 of the payout)")

	promptAdvance("Let's take a look at the active bids for the current Epoch:")

	// CHECK ACTIVE BIDDERS
	flow.RunScript("check_bidders", flow.FindAddress(auction), cadence.UInt64(1))

	promptAdvance("Here are the bidders' account balances after placing their bids:")

	// CHECK BIDDER ACCOUNTS
	for _, bidder := range bidders {
		flow.RunScript("check_account", flow.FindAddress(bidder), cadence.NewString(bidder))
	}

	promptAdvance("The highest bidders have been assigned to their Orbs:")

	// CHECK ORBS
	flow.RunScript("check_orbs", flow.FindAddress(auction), cadence.UInt64(1))

	promptAdvance("Let's take a closer look at the Orb balances...")

	// CHECK ORB BALANCES
	flow.RunScript("check_orb_balances", flow.FindAddress(auction), cadence.UInt64(1))

	println()
	print("Notice that certain Orbs get paid more than others!\n\nBeing the highest bidder during the right Epoch is very important.")

	promptAdvance("Now we'll fast-forward to the end of the auction:")

	for i := 0; i < 15; i++ {
		flow.SendTransactionWithArguments("run/check_update_epoch", auction, cadence.UInt64(1))
	}

	promptAdvance("The auction has completed. Now we can pay out the Orb prizes and tokens to the Orb owners:")

	flow.SendTransactionWithArguments("payout/payout_orbs", auction, cadence.UInt64(1))

	promptAdvance("There are no more active bidders. All unused bids have been returned:")

	// CHECK ACTIVE BIDDERS
	flow.RunScript("check_bidders", flow.FindAddress(auction), cadence.UInt64(1))

	promptAdvance("Each bidder that won an Orb has received their tokens and prizes:")

	// CHECK BIDDER ACCOUNTS
	for _, bidder := range bidders {
		flow.RunScript("check_account", flow.FindAddress(bidder), cadence.NewString(bidder))
	}

	println()
	println("That's it!")
	println("**********")
	println()
	println("Thanks for checking out our demo :) we hope you enjoyed it!")
}
