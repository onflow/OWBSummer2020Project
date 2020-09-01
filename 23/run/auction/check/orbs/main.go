package main

import (
	"github.com/onflow/cadence"
	"github.com/versus-flow/go-flow-tooling/tooling"
)

const auction = "Auction"

func main() {

	flow := tooling.NewFlowConfigLocalhost()

	// CHECK ORBS
	flow.RunScript("check_orbs", flow.FindAddress(auction), cadence.UInt64(1))
}
