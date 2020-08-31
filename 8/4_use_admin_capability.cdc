// 4. An external admin can utilize the created capability to call the createPassport function. 

import FlowPassport from 0x01

transaction {
    prepare(flowPassportAdmin: AuthAccount, newAdmin: AuthAccount, newCitizen: AuthAccount) {

        // borrow a reference to the admin Resource
        let adminCap = flowPassportAdmin.getCapability(/private/FlowPassportAdminCap)!

        let adminRef = adminCap.borrow<&{FlowPassport.AdministratorCap}>()!

        let newPassport <- adminRef.createPassport(
        name: "Dapper Kitty", 
        dob: "25/12/1990", 
        gender: "Female", 
        citizenship: "Canadian", 
        visa: {"Canada" : true, "Singapore" : true, "Malaysia" : false}, 
        travelLog: ["Passport created on 25/8/2020"])

        // store that passport in the citizen's account storage
        newCitizen.save(<-newPassport, to: /storage/Passport)

    }
}
