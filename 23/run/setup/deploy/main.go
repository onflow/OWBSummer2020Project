package main

import (
	"github.com/versus-flow/go-flow-tooling/tooling"
)

// Smart Contract Accounts
const nonFungibleToken = "NonFungibleToken"
const demoToken = "DemoToken"
const rocks = "Rocks"
const auction = "Auction"

// Start from root dir with makefile
func main() {
	// Initialize our tooling
	flow := tooling.NewFlowConfigLocalhost()

	println("Orbital Auction | Proof of Concept Demo")
	println()
	println("Deploying smart contracts to the local Flow emulator")

	// Deploy Smart Contracts to Emulator Accounts
	flow.DeployContract(nonFungibleToken)
	flow.DeployContract(demoToken)
	flow.DeployContract(rocks)
	flow.DeployContract(auction)

	println("Smart Contracts Deployed")
}
