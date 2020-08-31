//1. The FlowPassport Admin issues the new passport to the respective citizen using the 1_create_and_issue_passport.cdc transaction.


import FlowPassport from 0x01

transaction {
    prepare(admin: AuthAccount, citizen: AuthAccount) {

        // borrow a reference to the admin Resource
        let adminRef = admin.borrow<&FlowPassport.Administrator>(from: /storage/FlowPassportAdmin)!
        
        // create a new passport by calling the createPassport
        // function of the admin Reference
        let passport <- adminRef.createPassport(
        name: "Sean Sing", 
        dob: "9/8/1991", 
        gender: "Male", 
        citizenship: "Malaysian", 
        visa: {"Canada" : false, "Singapore" : true, "Malaysia" : true}, 
        travelLog: ["Passport created on 25/8/2020"])

        // store that passport in the citizen's account storage
        citizen.save(<-passport, to: /storage/Passport)
    }
}
