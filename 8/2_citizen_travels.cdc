//2. For the first travel, a citizen departs and tries to enter a country without a Visa 
//This transaction is expected to fail to demonstrate what happens to a citizen who does not have a valid Visa in his passport.

import FlowPassport from 0x01

transaction {
    prepare(citizen: AuthAccount) {
        
        //Citizen loads his passport resource to be moved to the function's argument
        let passport <- citizen.load<@FlowPassport.Passport>(from: /storage/Passport)!

        //calls the passport's update_travelLog function to create an entry 
        //the update_travelLog takes the country input and checks it against the passport's visa dictionary
        passport.update_travelLog(country: "Canada", description: "Entered Canada on 25/8/2020")

        //passport resource is stored back into the his account
        citizen.save(<-passport, to: /storage/Passport)

        log("Access granted! Enjoy your stay")
    }
}