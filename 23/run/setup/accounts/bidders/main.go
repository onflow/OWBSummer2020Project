package main

import (
	"fmt"

	"github.com/versus-flow/go-flow-tooling/tooling"
)

// Smart Contract Accounts
const amountBidders = 6

// Start from root dir with makefile
func main() {
	// Initialize our tooling
	flow := tooling.NewFlowConfigLocalhost()

	println("Create and set up the 6 bidder accounts:")
	println()
	println("- create empty FungibleToken Vault")
	println("- create empty NonFungibleToken Collection")

	fmt.Scanln()

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
}
