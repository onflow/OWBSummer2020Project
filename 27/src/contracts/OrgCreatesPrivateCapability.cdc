// OrgCreatesPrivateCapability.cdc
// This txn must be executed by the Org to create a private capability for transactions to come in and create a certificate using the Org's minter on demand.

import Vedas from 0x01cf0e2f2f715450

transaction {

    // the Org already has a CertificateMinter in its MinterVault
    // We need to expose a private capability so that the org can 

    var minterVaultRef: &Vedas.MinterVault

    prepare(account: AuthAccount) {
        
        // the candidate has already created an account permissionlessly and handed over their account address to org
        // use org account to create a certificate
        // use the minter vault resource that only the org account has access to
        // get minterVaults's capability and get a reference to use it
        self.minterVaultRef = account.getCapability(/private/MinterVault)!.borrow<&Vedas.MinterVault>()?? panic("Could not borrow MinterVault reference")
        
        // from this minterVaultRef, I need to get the certMinterRef
        let certMinter <- self.minterVaultRef.getCertificateMinter()

        // save is back in the orgs account in a diff storage path
        account.save<@Vedas.CertificateMinter>( <- certMinter , to: /storage/certMinter)

        // create a private link
        account.link<&AnyResource{Vedas.CertificateMinter}>(/private/certMinter, target:/storage/certMinter )

    }

    
}