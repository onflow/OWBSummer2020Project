package main

import (
	"fmt"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"
const amountBidders = 6

func main() {

	flow := tooling.NewFlowConfigLocalhost()

	var bidders = make([]string, 0)

	for i := 1; i <= amountBidders; i++ {
		accountName := fmt.Sprintf("Bidder%d", i)
		bidders = append(bidders, accountName)
	}

	// CHECK BIDDER ACCOUNTS
	for _, bidder := range bidders {
		flow.RunScript("check_account", flow.FindAddress(bidder), cadence.NewString(bidder))
	}
}
