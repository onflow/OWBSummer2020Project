package main

import (
	"fmt"

	"github.com/versus-flow/go-flow-tooling/tooling"
)

// Smart Contract Accounts
const auction = "Auction"

// Start from root dir with makefile
func main() {
	// Initialize our tooling
	flow := tooling.NewFlowConfigLocalhost()

	println("Set up the auction host account:")
	println()
	println("- create empty FungibleToken Vault")
	println("- create empty NonFungibleToken Collection")
	println("- create empty OrbitalAuction Collection")

	fmt.Scanln()

	// Setup DemoToken account with an NFT Collection and an Auction Collection
	flow.SendTransaction("setup/create_demotoken_vault", auction)
	flow.SendTransaction("setup/create_nft_collection", auction)
	flow.SendTransaction("setup/create_auction_collection", auction)
}
