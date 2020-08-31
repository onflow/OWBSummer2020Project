import ZeemzChest from 0x01

// Use this transaction to verify Zeemz Chest NFT exists in the storage account
// Check performed by attempting to "borrow" NFT from account

transaction {
    prepare(acct: AuthAccount) {
        if acct.borrow<&ZeemzChest.zChest>(from: /storage/zChest) != nil {
          log("You found a Zeemz Chest!")
        } else {
          log("You didn't find a Zeemz Chest!")
      }
    }
}  
