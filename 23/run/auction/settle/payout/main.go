package main

import (
	"fmt"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"

// Start from root dir with makefile
func main() {
	// Initialize our tooling
	flow := tooling.NewFlowConfigLocalhost()

	println()
	println("press ENTER to pay out the orbs")
	fmt.Scanln()

	flow.SendTransactionWithArguments("payout/payout_orbs", auction, cadence.UInt64(1))

	println()
	println("The orbs have been paid out.")
}
