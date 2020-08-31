package main

import (
	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"

func main() {

	flow := tooling.NewFlowConfigLocalhost()

	// CHECK ACTIVE BIDDERS
	flow.RunScript("check_bidders", flow.FindAddress(auction), cadence.UInt64(1))
}
