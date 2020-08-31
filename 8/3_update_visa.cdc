//3. The Admin updates the Visa status for the citizen's passport via 3_update_visa.cdc transaction

import FlowPassport from 0x01

transaction {

    prepare(admin: AuthAccount, citizen: AuthAccount) {

        //get's citizen's passport resource
        let passport <- citizen.load<@FlowPassport.Passport>(from: /storage/Passport)!

        //runs passport's update_visa function with a country input
        passport.update_visa(country: "Canada")

        //returns the passport to the citien's account
        citizen.save(<-passport, to: /storage/Passport)

        log("Success! Visa updated")
    }
}