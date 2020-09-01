// stake_nonprofit.cdc
import FungibleToken from 0x01

// SIGNED BY: CUSTOMER

// This tx occurs when a user is giving their tokens to a non-profit to stake their campaign

transaction(nonprofitAddrParam: Address, ftToGiveParam: Int, retailerFromParam: String) { 

    let customerVault: &FungibleToken.Vault
    let retailerName: String

    prepare(acct: AuthAccount) {  
        // Borrows a reference by using a capability to the customer's fungible token vault
        self.customerVault = acct.borrow<&FungibleToken.Vault>(from: /storage/MainVault)
                                ?? panic("Could not borrow owner's vault reference")
        self.retailerName = retailerFromParam
    }

    execute {
        // Gets the NonProfit account
        let nonprofitAccount = getAccount(nonprofitAddrParam)

        // Gets a reference to the Non-profit's vault so we can deposit into it
        let nonprofitVault = nonprofitAccount.getCapability(/public/MainReceiver)!
                                    .borrow<&FungibleToken.Vault{FungibleToken.Receiver, FungibleToken.Balance, FungibleToken.Provider}>()
                                    ?? panic("Could not borrow vault from the nonprofit")

        // Withdraws the tokens from the customer's vault
        let vault <- self.customerVault.withdraw(amount: UFix64(ftToGiveParam), retailer: self.retailerName)

        // Donates it to the non-profit's vault
        nonprofitVault.deposit(from: <-vault, retailer: self.retailerName)

        log("Donated tokens to the Non-Profit!")

    }

}