import FungibleToken from 0x01

pub fun main():Bool {

    // Cadence code can get an account's public account object
    // by using the getAccount() built-in function.
    let accountToCheck = getAccount(0x02)
    // log("------------------------------")
    // log(accountToCheck)
    // log("------------------------------")
    let capability = accountToCheck.getCapability(/public/MainReceiver)
    // log(capability)
    // log("------------------------------")
    let checkResult = capability!.check<&FungibleToken.Vault{FungibleToken.Receiver}>()
    // log(checkResult)
    // log("------------------------------")
    return checkResult
    

    // Get the public capability from the public path of the owner's account
    // let helloCapability = helloAccount.getCapability(/public/Hello)

    // borrow a reference for the capability
    // let helloReference = helloCapability!.borrow<&HelloWorld.HelloAsset>()

    // The log built-in function logs its argument to stdout.
    //
    // Here we are using optional chaining to call the "hello"
    // method on the HelloAsset resource that is referenced
    // in the published area of the account.
    // log(helloReference?.hello())
}

// pub fun main():Bool{
//     // let helloAccount = getAccount(0x02)
//     log("TEST")
//     log("TEST")
//     log("TEST")
//     log("TEST")
//     return true
//     // return getAccount(0x02).getCapability(/public/MainReceiver)!.check<&FungibleToken.Vault{FungibleToken.Receiver}>()
// }

