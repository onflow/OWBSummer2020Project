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
	println("Press ENTER to advance the auction to the end")
	fmt.Scanln()

	for i := 0; i < 15; i++ {
		flow.SendTransactionWithArguments("run/check_update_epoch", auction, cadence.UInt64(1))
	}

	println()
	println("The auction has completed. The orbs can now be paid out.")
}
