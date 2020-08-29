// CharityNFTuse.cdc
//
// This file will log the charitable donation's use of the token from account 1, enabling complete transparency
// to the public of how the organization is spending money and how their donation is spent.
// 
// Project done by Ellie Kobak and Henry Forcier
//
// Code adapted from Flow Playground 

pub contract CharityNFT {

    // Define NFT that will represent one donation from a user
    
    pub resource NFT {
        // The unique ID that differentiates each NFT
        pub let id: UInt64

        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
        }
    }

    // Donations
    // 
    // The account will only recieve donations through here.

    pub resource interface NFTDonation {

        // enables public to deposit the charity NFT into this account
        pub fun deposit(token: @NFT)

        // Want public to have access to IDs to track the transactions involving specific tokens
        pub fun getIDs(): [UInt64]

        // allows ID verification to public
        pub fun idExists(id: UInt64): Bool
    }


    pub resource interface Deposits {

        // once the charity has the money from the NFTs, this allows them to move the tokens and be used by the charity
        // Allows the charity to withdraw the tokens from the account to use the donations for the charity's intended purpose.
        //pub fun withdraw(withdrawID: UInt64) : @NFT {
            post {
                result.id == withdrawID: "The ID of the the token wish to be withdrawn must have same ID as the requested ID"
            }
        }
    }

    pub resource interface Balance {

        // enables balance to be visible
        pub var balance: UFix64
    }

    pub resource interface PublicCollection {
        // publish for the public access
        
        pub fun deposit(token: @NFT)

        pub fun getIDs(): [UInt64]

        pub fun idExists(id: UInt64): Bool
    }

    // The definition of the Collection resource that
    // holds the NFTs that a user owns

    pub resource Collection: NFTDonation, Deposits, PublicCollection {

        // Keeps track of all the donations made in a dictionary
        pub var ownedNFTs: @{UInt64: NFT}

        // Initialize the NFTs field to an empty collection
        init () {
            self.ownedNFTs <- {}
        }

        // withdraw 
        //
        // Function that removes an NFT from the collection 
        // and moves it to the calling context
        pub fun withdraw(withdrawID: UInt64): @NFT {
            // If the NFT isn't found, the transaction panics and reverts
            let token <- self.ownedNFTs.remove(key: withdrawID)!

            return <-token
        }

        // deposit 
        //
        // Function that takes a NFT as an argument and 
        // adds it to the collections dictionary
        pub fun deposit(token: @NFT) {
            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[token.id] <- token
            destroy oldToken
        }

        // idExists checks to see if a NFT 
        // with the given ID exists in the collection
        pub fun idExists(id: UInt64): Bool {
            return self.ownedNFTs[id] != nil
        }

        // getIDs returns an array of the IDs that are in the collection
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    // creates a new empty Collection resource and returns it 
    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }


    // Vault
    // 
    // Each donation will be stored in its own vault, 
    // which enables the user to track how the charity 
    // uses the money they donate or see how the charity spends other donations

    pub resource Vault: NFTDonation, Deposits, Balance {
        
        // keeps track of the total balance of the account's tokens
        // want the balance to be public so the money the 
        // charity spends is verifiable through the blockchain, 
        // tax returns and other documentations of earning charities use

        pub var balance: UFix64

        // initialize the balance at resource creation time
        init(balance: UFix64) {
            self.balance = balance
        }

        // withdraw
        //
        // Function that takes an integer amount as an argument
        // and withdraws that amount from the Vault.
        //
        // It creates a new temporary Vault that is used to hold
        // the money that is being transferred. It returns the newly
        // created Vault to the context that called so it can be deposited
        // elsewhere.
        //
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            return <-create Vault(balance: amount)
        }
        
        // deposit
        //
        // Function that takes a Vault object as an argument and adds
        // its balance to the balance of the owners Vault.
        //
        // It is allowed to destroy the sent Vault because the Vault
        // was a temporary holder of the tokens. The Vault's balance has
        // been consumed and therefore can be destroyed.
        pub fun deposit(from: @Vault) {
            self.balance = self.balance + from.balance
            destroy from
        }
    }

    // NFTMinter
    //
    // Resource that would be owned by an admin or by a smart contract 
    // that allows them to mint new NFTs when needed
    pub resource NFTMinter {

        // In case the charity creates new Tokens
        // the ID that is used to mint NFTs
        // it is onlt incremented so that NFT ids remain
        // keeps track of the total number of NFTs in existence
        pub var idCount: UInt64

        init() {
            self.idCount = 1
        }

        // mintNFT 
        //
        // Function that mints a new NFT with a new ID
        // and deposits it in the recipients collection 
        // using their collection reference
        pub fun mintNFT(recipient: &AnyResource{NFTDonation}) {

            // create a new NFT
            var newNFT <- create NFT(initID: self.idCount)
            
            // deposit it in the recipient's account using their reference
            recipient.deposit(token: <-newNFT)

            // change the id so that each ID is unique
            self.idCount = self.idCount + UInt64(1)
        }
    }

	init() {
		// store an empty NFT Collection in account storage
        self.account.save(<-self.createEmptyCollection(), to: /storage/NFTCollection)

        // publish a reference to the Collection in storage
        self.account.link<&{NFTDonation}>(/public/NFTDonation, target: /storage/NFTCollection)

        // store a minter resource in account storage
        self.account.save(<-create NFTMinter(), to: /storage/NFTMinter)
	}
}

pub contract FungibleToken {

    // Total supply of all tokens in existence.
    pub var totalSupply: UFix64

    // Provider/ NFTDonation
    // 
    // Interface that enforces the requirements for withdrawing
    // tokens from the implementing type.
    //
    // We don't enforce requirements on self.balance here because
    // it leaves open the possibility of creating custom providers
    // that don't necessarily need their own balance.
    //
    pub resource interface NFTDonation {

        // withdraw
        //
        // Function that subtracts tokens from the owner's Vault
        // and returns a Vault resource (@Vault) with the removed tokens.
        //
        // The function's access level is public, but this isn't a problem
        // because even the public functions are not fully public at first.
        // anyone in the network can call them, but only if the owner grants
        // them access by publishing a resource that exposes the withdraw
        // function.
        //
        pub fun withdraw(amount: UFix64): @Vault {
            post {
                // `result` refers to the return value of the function
                result.balance == UFix64(amount):
                    "Withdrawal amount must be the same as the balance of the withdrawn Vault"
            }
        }
    }

    // Deposits 
    //
    // Interface that enforces the requirements for depositing
    // tokens into the implementing type.
    //
    // We don't include a condition that checks the balance because
    // we want to give users the ability to make custom Deposits that
    // can do custom things with the tokens, like split them up and
    // send them to different places.
    //
    pub resource interface Deposits {
        // deposit
        //
        // Function that can be called to deposit tokens 
        // into the implementing resource type
        //
        pub fun deposit(from: @Vault) {
            pre {
                from.balance > UFix64(0):
                    "Deposit balance must be positive"
            }
        }
    }

    // Balance
    //
    // Interface that specifies a public `balance` field for the vault
    //
    pub resource interface Balance {
        pub var balance: UFix64
    }

    // Vault
    //
    // Each user stores an instance of only the Vault in their storage
    // The functions in the Vault and governed by the pre and post conditions
    // in the interfaces when they are called. 
    // The checks happen at runtime whenever a function is called.
    //
    // Resources can only be created in the context of the contract that they
    // are defined in, so there is no way for a malicious user to create Vaults
    // out of thin air. A special Minter resource needs to be defined to mint
    // new tokens.
    // 
    pub resource Vault: Provider, Deposits, Balance {
        
        // keeps track of the total balance of the account's tokens
        pub var balance: UFix64

        // initialize the balance at resource creation time
        init(balance: UFix64) {
            self.balance = balance
        }

        // withdraw
        //
        // Function that takes an integer amount as an argument
        // and withdraws that amount from the Vault.
        //
        // It creates a new temporary Vault that is used to hold
        // the money that is being transferred. It returns the newly
        // created Vault to the context that called so it can be deposited
        // elsewhere.
        //
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            return <-create Vault(balance: amount)
        }
        
        // deposit
        //
        // Function that takes a Vault object as an argument and adds
        // its balance to the balance of the owners Vault.
        //
        // It is allowed to destroy the sent Vault because the Vault
        // was a temporary holder of the tokens. The Vault's balance has
        // been consumed and therefore can be destroyed.
        pub fun deposit(from: @Vault) {
            self.balance = self.balance + from.balance
            destroy from
        }
    }

    // createEmptyVault
    //
    // Function that creates a new Vault with a balance of zero
    // and returns it to the calling context. A user must call this function
    // and store the returned Vault in their storage in order to allow their
    // account to be able to receive deposits of this token type.
    //
    pub fun createEmptyVault(): @Vault {
        return <-create Vault(balance: 0.0)
    }

    // VaultMinter
    //
    // Resource object that an admin can control to mint new tokens
    pub resource VaultMinter {

        // Function that mints new tokens and deposits into an account's vault
        // using their `Deposits` reference.
        // We say `&AnyResource{Deposits}` to say that the recipient can be any resource
        // as long as it implements the Deposits interface
        pub fun mintTokens(amount: UFix64, recipient: &AnyResource{Deposits}) {
            FungibleToken.totalSupply = FungibleToken.totalSupply + amount
            recipient.deposit(from: <-create Vault(balance: amount))
        }
    }

    // The init function for the contract. All fields in the contract must
    // be initialized at deployment. This is just an example of what
    // an implementation could do in the init function. The numbers are arbitrary.
    init() {
        self.totalSupply = 30.0

        // create the Vault with the initial balance and put it in storage
        // account.save saves an object to the specified `to` path
        // The path is a literal path that consists of a domain and identifier
        // The domain must be `storage`, `private`, or `public`
        // the identifier can be any name
        let vault <- create Vault(balance: self.totalSupply)
        self.account.save(<-vault, to: /storage/MainVault)

        // Create a new MintAndBurn resource and store it in account storage
        self.account.save(<-create VaultMinter(), to: /storage/MainMinter)

        // Create a private capability link for the Minter
        // Capabilities can be used to create temporary references to an object
        // so that callers can use the reference to access fields and functions
        // of the objet.
        // 
        // The capability is stored in the /private/ domain, which is only
        // accesible by the owner of the account
        self.account.link<&VaultMinter>(/private/Minter, target: /storage/MainMinter)
    }
}
 
