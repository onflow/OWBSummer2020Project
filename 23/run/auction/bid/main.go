package main

import (
	"fmt"

	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

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

	// BID ON THE AUCTION
	for i := 0; i < 15; i++ {
		flow.SendTransactionWithArguments("bid/place_bid", bidders[0],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("60.0"))

		flow.SendTransactionWithArguments("bid/place_bid", bidders[1],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("65.0"))

		flow.SendTransactionWithArguments("bid/place_bid", bidders[2],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("55.0"))

		flow.SendTransactionWithArguments("bid/place_bid", bidders[3],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("25.0"))

		flow.SendTransactionWithArguments("bid/place_bid", bidders[4],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("35.0"))

		flow.SendTransactionWithArguments("bid/place_bid", bidders[5],
			flow.FindAddress(auction),
			cadence.UInt64(1),
			ufix("62.0"))
	}
}
