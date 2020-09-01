// createVedasOrgAccount.cdc
// This script should be executed by the Org after they have a Flow account

import Vedas from 0x01cf0e2f2f715450

transaction {

    prepare(account: AuthAccount){

        // create an empty MinterVault and store it in storage
        account.save( <- Vedas.createEmptyMinterVault(), to: /storage/MinterVault)

        log("Empty Minter Vault created")

        // create the public capability to provide a referance to anyone trying to send Minter
        account.link<&AnyResource{Vedas.MinterReceiver}>(/public/MinterReceiver, target: /storage/MinterVault)!

        log("Capability created")
        
    }

}
 