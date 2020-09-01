package main

import (
	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"

func main() {

	flow := tooling.NewFlowConfigLocalhost()

	// CHECK CURRENT EPOCH
	flow.RunScript("check_epoch", flow.FindAddress(auction), cadence.UInt64(1))
}
