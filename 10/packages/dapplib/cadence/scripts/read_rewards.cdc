// read_rewards.cdc

import RewardsContract from 0x03

// This script prints the NFTs that account 0x01 has for sale.
pub fun main(retailerAddrParam: Address): [String] {
    // 0x03 represents the retailer we would like to read the rewards from
    let retailer = getAccount(retailerAddrParam)

    // Borrows a reference to the retailer's rewards list
    let retailerRewards = retailer.getCapability(/public/RewardsList)!
                                .borrow<&RewardsContract.Rewards>()
                                ?? panic("Could not borrow rewards resource")

    // Logs the rewards out, each one is the name of the reward (aka the item you receive) and the
    // cost of that reward in Fungible Tokens
    log(retailerRewards.getRewards())

    // Converts dictionary into array
    var rewardsList: [String] = []
    let rewardsListNames = retailerRewards.getRewards().keys
    let rewardsListCosts = retailerRewards.getRewards().values

    var i = 0
    while i < rewardsListNames.length {
        rewardsList.append(rewardsListNames[i].concat(" : ".concat(rewardsListCosts[i].toString())))
        i = i + 1
    }

    return rewardsList
}
