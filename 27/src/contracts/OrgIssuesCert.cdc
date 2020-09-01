// issueCert.cdc 
// this txn has to be executed when the CA issues new cert using the minter


import Vedas from 0x01cf0e2f2f715450

transaction {


    let certMinterRef: &Vedas.CertificateMinter

    var certReceiverRef: &AnyResource{Vedas.CertificateReceiver}

    var certificate: @Vedas.Certificate

    prepare(account: AuthAccount){


        // get the receivers's capability, get the reference to use it
        self.certReceiverRef = getAccount(0xf3fcd2c1a78f5eee).getCapability(/public/CertificateReceiver)!.borrow<&AnyResource{Vedas.CertificateReceiver}>()?? panic("Could not borrow CertificateReceiver reference")


        // get a hold of the private link of the org and use to create cert
        self.certMinterRef = account.getCapability(/private/certMinter)!.borrow<&Vedas.CertificateMinter>()?? panic("Could not borrow certMinter reference")

        // transfer over the certificate to this txn
        self.certificate  <- self.certMinterRef.createCertificate(title: "", metadata: "", issuerID: self.certMinterRef.minterID, status: "")

    }

    execute{
        
        self.certReceiverRef.deposit(certificate: <- self.certificate )
        

    }


}