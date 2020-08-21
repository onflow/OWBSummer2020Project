package main

import (
	"github.com/0xAlchemist/go-flow-tooling/tooling"
)

const flowToken = "FlowToken"
const baloonToken = "BaloonToken"
const dex = "Dex"

func main() {
	flow := tooling.NewFlowConfigLocalhost()
	flow.DeployContract(flowToken)
	flow.DeployContract(baloonToken)
	flow.DeployContract(dex)

	flow.SendTransaction("CreateFlowVault", dex)
	flow.SendTransaction("CreateBaloonVault", dex)
	flow.SendTransaction("MintFlowToken", dex)
	flow.SendTransaction("MintBaloonToken", dex)
	flow.SendTransaction("SetupDex", dex)
	// flow.SendTransaction("BuyBaloon", dex)
	flow.RunScript("CheckBalance")
}