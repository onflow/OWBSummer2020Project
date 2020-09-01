//import NonFungibleToken from 0x01cf0e2f2f715450
import SurvivalNFT from 0x179b6b1cb6755e31

// This transaction returns an array of all the nft ids in the collection

pub fun main() {

    log("Total Supply: ")
    log(SurvivalNFT.totalSupply)

}