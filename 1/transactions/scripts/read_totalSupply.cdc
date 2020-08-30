import Autograph from 0xf3fcd2c1a78f5eee

// This script reads the current number of autographs that have been minted
// from the Autograph contract and returns that number to the caller

pub fun main(): UInt64 {
    log(Autograph.totalSupply)
    return Autograph.totalSupply
}
