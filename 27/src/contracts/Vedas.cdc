// Vedas.cdc
// main contract

pub contract Vedas {

    // id has to be maintained in a central location because that is the co-ordination point
    // here the minter cannot be the central point of co-ordination to assign ids because there will be multiple minters
    access(self)  var maxCertID: UInt64
    access(self) var maxMinterID: UInt64
    access(self)  var names : {String: Address} 

    init(){
        self.maxCertID = UInt64(0)
        self.maxMinterID = UInt64(0)
        self.names = {}
        
        // store a MinterMinter resource in account storage
        self.account.save(<-create MinterMinter(), to: /storage/MinterMinter)

        // create a private link to that , so that I can use it in txns
        self.account.link<&Vedas.MinterMinter>(/private/MinterMinter, target: /storage/MinterMinter )
    
    }

    pub fun getAddress(name: String): Address? {
        return self.names[name];
    }

    pub fun setAddress(name: String, address: Address): Bool {
        if (self.names[name] == nil){
            self.names[name] = address
            return true
        }
        return false
        
        
    }

    // supplying batches of 1000 to the minters.
    access(contract)  fun getCertID(): UInt64 {
        var temp = self.maxCertID
        self.maxCertID = self.maxCertID + UInt64(1)
        return temp
    }

    access(contract) fun getMinterID(): UInt64 {
        var temp = self.maxMinterID
        self.maxMinterID = self.maxMinterID + UInt64(1)
        return temp
    }

// crystal box to the guy. put the certs in there.
// if crystal breaks, cert will be sent back. Resource owning a resource.
// admin has right to break the box.
// user can also break the box.


    // define the certificate resource type
    // all type declarations must be public
    pub resource Certificate {

        // the certificate has to have a unique id across the platform.
        pub let certID: UInt64

        // certificate has title
        pub let title: String

        // certificate has metadata
        pub var metadata: String

        // certificate has Issuer id's account ID
        pub let issuerID: UInt64

        // certificate status
        pub var status: String


        //Initialise all fields during the creation of the resource.
        init(certID: UInt64, title: String, metadata: String, issuerID: UInt64, status: String){
            self.certID = certID
            self.title = title
            self.metadata = metadata
            self.issuerID = issuerID
            self.status = status
        }

        
    }


    // define the Certificate receiver interface
    // this helps create receiver links, so only intended receivers aka "subscribers" can receive the certificates sent by the minter authority
    pub resource interface CertificateReceiver {

        pub fun deposit(certificate: @Certificate)

        pub fun borrowCert(certID: UInt64): &Certificate 

    }
    

    // Need a certificate vault, just like in the examples
    // Our company(admin account) creates the CertificateVaults in each user account when they signup for it.
    pub resource CertificateVault: CertificateReceiver {

        // this vault should contain a collection of certificates
        // we store a mapping of certID and the certificate resource itself
        access(self) var ownedCertificates: @{UInt64: Certificate}

        init() {
            self.ownedCertificates <- {}
        }

        pub fun deposit(certificate: @Certificate) {
            let oldCert <- self.ownedCertificates[certificate.certID] <- certificate
            destroy oldCert
        }

        // need to define destroy function becasue there are nested resources.
        destroy(){
            destroy self.ownedCertificates 
        }

        pub fun borrowCert(certID: UInt64): &Certificate {
            return &self.ownedCertificates[certID] as &Certificate
        }

    }

    // public function for anyone to get started with being a certificate receiver
    // they do this by having a empty certificate vault
    // technically anyone should be able to do this
    pub fun createEmptyCertificateVault(): @CertificateVault {
        return <- create CertificateVault()
    }

    // MinterReceiver interface
    // This existes so that only the MinterReceiver can receive the Minters
    // Also exposes only the interface functions publicly
    pub resource interface MinterReceiver{

        pub fun deposit(certificateMinter: @CertificateMinter)

    }


    // all type declarations must be public
    // Minter vault is the vault that holds the minter
    pub resource MinterVault: MinterReceiver {

        access(self) var certificateMinter : @CertificateMinter?
        
        init(){
            self.certificateMinter <- nil
        }

        destroy(){
            destroy self.certificateMinter
        }
        
        pub fun deposit(certificateMinter: @CertificateMinter){
            
            var oldCertificateMinter <- self.certificateMinter <- certificateMinter
            destroy oldCertificateMinter

        }

        
        pub fun getCertificateMinter(  ): @CertificateMinter? {
            
            let temp <- self.certificateMinter <- nil
            return <- temp
        }
        
    }

    // public function for anyone to get started with being a minter receiver
    // they do this by having a empty minter vault
    // technically anyone should be able to do this
    pub fun createEmptyMinterVault(): @MinterVault {
            return  <- create MinterVault()
    }


    // Orgs should be able to get a minter and mint certs.
    // Our company(admin account) creates  the minters to official accounts (Certificate Authorities) when they create their accounts
    pub resource CertificateMinter {

        pub let minterID: UInt64

        init(){
            self.minterID = Vedas.getMinterID()
        }
       
      
        // fun used in txns by the Org to issueCert to user.
        pub fun createCertificate( title: String, metadata: String, issuerID: UInt64, status: String ): @Certificate {
            let cert <-create Certificate(certID: Vedas.getCertID(), title: title, metadata: metadata, issuerID: issuerID, status: status)
            return <-cert
        }

        // fun used in txns by the Org to change status to inactive.
        pub fun revokeCert(recipient: &AnyResource{CertificateReceiver}, title: String, metadata: String, issuerID: UInt64, status: String ) {

        }


    }

    // type declarations must be public, so how do I make sure noone lese just creates this ?
    // remember Resources can only be created in functions and types that are declared in the same contract in which the resource is declared.
    pub resource MinterMinter {
        init(){

        }

        pub fun createCertificateMinter(): @CertificateMinter {
            return <- create CertificateMinter()
        }

    }
}
