// createVedasCandidateAccount.cdc
// This script should be executed by the candidate after they have a Flow account

import Vedas from 0x01cf0e2f2f715450

transaction {

    prepare(account: AuthAccount){

        // create an empty CertificateVault and store it in storage
        account.save<@Vedas.CertificateVault>( <- Vedas.createEmptyCertificateVault(), to: /storage/CertificateVault)

        log("Empty Certificate Vault created")

        // create the public capability to provide a referance to anyone trying to send Certificates
        account.link<&AnyResource{Vedas.CertificateReceiver}>(/public/CertificateReceiver, target: /storage/CertificateVault)

        log("Capability created")
    }

}
 