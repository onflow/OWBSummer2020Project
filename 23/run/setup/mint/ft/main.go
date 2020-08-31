package main

import (
	"fmt"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

// Smart Contract Accounts
const demoToken = "DemoToken"
const auction = "Auction"
const amountBidders = 6

func ufix(input string) cadence.UFix64 {
	amount, err := cadence.NewUFix64(input)
	if err != nil {
		panic(err)
	}
	return amount
}

// Start from root dir with makefile
func main() {

	flow := tooling.NewFlowConfigLocalhost()

	var bidders = make([]string, 0)
	for i := 1; i <= amountBidders; i++ {
		accountName := fmt.Sprintf("Bidder%d", i)
		bidders = append(bidders, accountName)
	}

	println("Create a new FungibleToken minter with allowed amount of 1,000,000 tokens")
	fmt.Scanln()

	flow.SendTransactionWithArguments("setup/new_demotoken_minter", demoToken, ufix("1000000.0"))

	println("Mint 100,000 tokens for auction owner")
	fmt.Scanln()

	flow.SendTransactionWithArguments("setup/mint_demotokens", demoToken,
		flow.FindAddress(auction), // Receiver address
		ufix("100000.0"))          // Amount of minted tokens

	println("Mint 100,000 tokens for each bidder")
	fmt.Scanln()

	for _, bidder := range bidders {
		flow.SendTransactionWithArguments("setup/mint_demotokens", demoToken,
			flow.FindAddress(bidder), // Receiver address
			ufix("100000.0"))         // Amount of minted tokens

		println("Fungible tokens have been minted and deposited for", bidder)
	}
}
