package main

import (
	"fmt"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"

// Start from root dir with makefile
func main() {

	flow := tooling.NewFlowConfigLocalhost()

	println("Create a new Orbital Auction")
	println()
	println("Epochs - 8")
	println("Epoch Length - 12 blocks")

	fmt.Scanln()

	flow.SendTransactionWithArguments("create_auction/create_auction", auction,
		cadence.UInt64(8),  // Epoch Count
		cadence.UInt64(12)) // Epoch Length in Blocks

	println("A new auction has been created")

	flow.RunScript("check_auctions", flow.FindAddress(auction))
}
