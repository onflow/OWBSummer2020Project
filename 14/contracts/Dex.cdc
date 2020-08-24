import FlowToken from 0x01cf0e2f2f715450
import BaloonToken from 0x179b6b1cb6755e31

// Dex contract is the port of the solidity version created by Austin Griffith
// https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90
pub contract Dex {

  pub resource interface PoolPublic {
    pub fun XToY(from: @FlowToken.Vault, to: &AnyResource{BaloonToken.Receiver})
    pub fun YToX(from: @BaloonToken.Vault, to: &AnyResource{FlowToken.Receiver})
    pub fun price(
        input_amount:UFix64,
        input_reserve:UFix64,
        output_reserve:UFix64
    ): UFix64
    pub fun xLiquidity(): UFix64
    pub fun yLiquidity(): UFix64
    pub fun xPrice(): UFix64
    pub fun yPrice(): UFix64
  }

  pub resource Pool: PoolPublic {
    pub let xVault: @FlowToken.Vault
    pub let yVault: @BaloonToken.Vault

    pub var fee: UFix64

    // Construct which allows liquidity provider to add exchange pairs.
    init(
        x: @FlowToken.Vault,
        y: @BaloonToken.Vault
    ){
        self.xVault <- x
        self.yVault <- y
        self.fee = 0.0025
    }

    pub fun XToY(
        from: @FlowToken.Vault,
        to:&AnyResource{BaloonToken.Receiver}
        ){
        let new_balance = self.price(
            input_amount:from.balance,
            input_reserve:self.xVault.balance - from.balance,
            output_reserve:self.yVault.balance
        )
        let out = self.yVault.balance - new_balance
        self.xVault.deposit(from: <- from)
        to.deposit(from: <- self.yVault.withdraw(amount:out))
    }

    pub fun YToX(
        from: @BaloonToken.Vault,
        to:&AnyResource{FlowToken.Receiver}
        ){
        let new_balance = self.price(
            input_amount:from.balance,
            input_reserve:self.yVault.balance - from.balance,
            output_reserve:self.xVault.balance
        )
        let out = self.xVault.balance - new_balance
        self.yVault.deposit(from: <- from)
        to.deposit(from: <- self.xVault.withdraw(amount:out))
    }

    //  x * y = k invariant
    pub fun price(
        input_amount:UFix64,
        input_reserve:UFix64,
        output_reserve:UFix64
    ): UFix64 {
        let input_amount_minus_fee = input_amount * (UFix64(1) - self.fee)
        let numerator = input_reserve * output_reserve
        let denominator = input_reserve + input_amount_minus_fee
        return numerator / denominator
    }

    // Public getters
    pub fun xLiquidity(): UFix64 {
        return self.xVault.balance
    }
    pub fun yLiquidity(): UFix64 {
        return self.yVault.balance
    }
    pub fun xPrice(): UFix64 {
        return self.yLiquidity() / self.xLiquidity()
    }
    pub fun yPrice(): UFix64 {
        return self.xLiquidity() / self.yLiquidity()
    }

    destroy() {
        destroy self.xVault
        destroy self.yVault
    }
  }

  // createCollection returns a new collection resource to the caller
  pub fun createDex(
    x: @FlowToken.Vault,
    y: @BaloonToken.Vault
  ): @Pool {
    return <- create Pool(x: <- x, y: <- y)
  }
}
 