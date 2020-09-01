package main

import (
	"fmt"

	"github.com/versus-flow/go-flow-tooling/tooling"
)

const rocks = "Rocks"
const auction = "Auction"

// Smart Contract Accounts
const amountNFTs = 10

// Start from root dir with makefile
func main() {

	flow := tooling.NewFlowConfigLocalhost()

	println(fmt.Sprintf("Mint %d NFTs to use as auction prizes", amountNFTs))

	fmt.Scanln()

	for i := 0; i < amountNFTs; i++ {
		flow.SendTransactionWithArguments("setup/mint_nft", rocks, flow.FindAddress(auction))
	}

	println("NFTs have been minted and deposited in the auction owners NFT collection")
}
