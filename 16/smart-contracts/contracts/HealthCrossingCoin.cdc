access(all) contract HealthCrossingCoin {

  // The total number of tokens in existence.
  // It is up to the implementer to ensure that total supply
  // stays accurate and up to date
  pub var totalSupply: UFix64

  // Event that is emitted when the contract is created
  pub event TokensInitialized(initialSupply: UFix64)

  // Event that is emitted when tokens are withdrawn from a Vault
  pub event TokensWithdrawn(amount: UFix64, from: Address?)

  // Event that is emitted when tokens are deposited to a Vault
  pub event TokensDeposited(amount: UFix64, to: Address?)

  // Provider enforces the requirements for withdrawing
  // tokens from the implementing type.
  // We don't enforce requirements on `balance` here,
  // because it leaves open the possibility of creating custom providers
  // that don't necessarily need their own balance.
  pub resource interface Provider {

      // withdraw subtracts tokens from the owner's Vault
      // and returns a Vault resource with the removed tokens.
      // The function's access level is public, but this isn't a problem
      // because only the owner can storing the resource in their account
      // can initially call this function.
      // The owner may grant other accounts access by creating a private
      // capability that would allow specific other users to access
      // the provider resource through a reference.
      // The owner may also grant all accounts access by creating a public
      // capability that would allow all other users to access the provider
      // resource through a reference.
      pub fun withdraw(amount: UFix64): @Vault {
          post {
              // `result` refers to the return value
              result.balance == amount:
                  "Withdrawal amount must be the same as the balance of the withdrawn Vault"
          }
      }
    }

    // Receiver enforces the requirements for depositing
    // tokens into the implementing type.
    // We don't include a condition that checks the balance because
    // we want to give users the ability to make custom receivers that
    // can do custom things with the tokens, like split them up and
    // send them to different places.
    pub resource interface Receiver {
        // deposit that can be called to deposit tokens
        // into the implementing resource type
        pub fun deposit(from: @Vault) {
            pre {
                from.balance > UFix64(0):
                    "Deposit balance must be positive"
            }
        }
    }

    // Balance that contains the `balance` field of the Vault
    // and enforces that when new Vault's are created, the balance
    // is initialized correctly.
    pub resource interface Balance {
        // The total balance of the account's tokens
        pub var balance: UFix64

        init(balance: UFix64) {
            post {
                self.balance == balance:
                    "Balance must be initialized to the initial balance"
            }
        }
    }

    pub resource Vault: Provider, Receiver, Balance {
        // holds the balance of a users tokens
        pub var balance: UFix64

        // initialize the balance at resource creation time
        init(balance: UFix64) {
            self.balance = balance
        }

        // withdraw takes an integer amount as an argument
        // and withdraws that amount from the Vault.
        // It creates a new temporary Vault that is used to hold
        // the money that is being transferred. It returns the newly
        // created Vault to the context that called so it can be deposited
        // elsewhere.
        pub fun withdraw(amount: UFix64): @Vault {
            self.balance = self.balance - amount
            emit TokensWithdrawn(amount: amount, from: self.owner?.address)
            return <-create Vault(balance: amount)
        }

        // deposit takes a Vault object as an argument and adds
        // its balance to the balance of the owners Vault.
        // It is allowed to destroy the sent Vault because the Vault
        // was a temporary holder of the tokens. The Vault's balance has
        // been consumed and therefore can be destroyed.
        pub fun deposit(from: @Vault) {
            let vault <- from as! @HealthCrossingCoin.Vault
            self.balance = self.balance + vault.balance
            emit TokensDeposited(amount: vault.balance, to: self.owner?.address)
            vault.balance = 0.0
            destroy vault
        }

        destroy() {
            HealthCrossingCoin.totalSupply = HealthCrossingCoin.totalSupply - self.balance
        }
    }

  pub fun createEmptyVault(): @Vault {
    return <-create Vault(balance: UFix64(0))
  }

  pub resource CoinMinter {
    pub fun mintTokens(amount: UFix64): @Vault {
      HealthCrossingCoin.totalSupply = HealthCrossingCoin.totalSupply + amount
      return <- create Vault(balance: amount)
    }
  }

  init() {
    self.totalSupply = UFix64(0)
    emit TokensInitialized(initialSupply: self.totalSupply)
    self.account.save(<-create CoinMinter(), to: /storage/HealthCrossingCoinMinter)
  }
}
 