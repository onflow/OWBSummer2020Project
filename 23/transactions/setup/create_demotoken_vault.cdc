// setup/create_demotoken_vault.cdc
// *************************
// This transaction saves an empty DemoToken Vault to the signer's
// account storage and creates a public capability
// for the Balance and Receiver interface
//
// DemoToken is used as currency for the OrbitalAuction demo
// TODO: Rename to FlowToken?

import FungibleToken from 0xee82856bf20e2aa6
import NonFungibleToken from 0x01cf0e2f2f715450
import DemoToken from 0x179b6b1cb6755e31
import Rocks from 0xf3fcd2c1a78f5eee

// Contract Deployment:
// Acct 1 - 0x01cf0e2f2f715450 - NonFungibleToken.cdc
// Acct 2 - 0x179b6b1cb6755e31 - DemoToken.cdc
// Acct 3 - 0xf3fcd2c1a78f5eee - Rocks.cdc
// Acct 4 - 0xe03daebed8ca0615 - Auction.cdc

transaction{
    
    prepare(signer: AuthAccount) {
        
        // create a new empty DemoToken Vault resource
        let vaultA <- DemoToken.createEmptyVault()

        // store the vault in the account storage
        signer.save<@FungibleToken.Vault>(<-vaultA, to: /storage/DemoTokenVault)

        // create a public Receiver capability to the Vault
        // so that others can deposit tokens to this Vault
        signer.link<&{FungibleToken.Receiver}>(
            /public/DemoTokenReceiver,
            target: /storage/DemoTokenVault
        )

        // create a public Balance capability to the Vault
        // so that others can check the balance of this Vault
        signer.link<&{FungibleToken.Balance}>(
            /public/DemoTokenBalance,
            target: /storage/DemoTokenVault
        )

        log("Created a Vault and published the references")
        
    }
}
 