// createCertificateMinter.cdc
// This txn must be executed by the admin when the Org/CA is approved by our internal team that gives out the verified checkmarks to Orgs after validating their government documents

import Vedas from 0x01cf0e2f2f715450

transaction {

    let minterMinterRef: &Vedas.MinterMinter

    var receiverRef: &AnyResource{Vedas.MinterReceiver}

    var certificateMinter: @Vedas.CertificateMinter

    prepare(acc: AuthAccount){

        // the Org has already created an account permissionlessly and handed over their account address to us
        // use admin account to create a minter
        // use the minter minter resource that only the admin account has access to
        // get minter's capability and get a reference to use it
        self.minterMinterRef = acc.getCapability(/private/MinterMinter)!.borrow<&Vedas.MinterMinter>()?? panic("Could not borrow minterMinter reference")
        
        // get the receivers's capability, get the reference to use it
        self.receiverRef = getAccount(Address:0x179b6b1cb6755e31).getCapability(/public/MinterReceiver)!.borrow<&AnyResource{Vedas.MinterReceiver}>()?? panic("Could not borrow MinterVault reference")

        // transfer over the minter to this txn
        self.certificateMinter  <- self.minterMinterRef.createCertificateMinter()

    }

    execute{
        
        self.receiverRef.deposit(certificateMinter: <- self.certificateMinter) 

    }


}
 