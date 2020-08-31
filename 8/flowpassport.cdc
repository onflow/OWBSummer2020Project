//FlowPassport.cdc

pub contract FlowPassport {

    // To log how many passports have been created
    pub var passportCount: Int;

    //To initialize @Passport details before issuing to citizen 

    pub resource Passport {

        //list of variables to be contained within the passport. Variables are used as citizens may update their information in future. 
        pub var name: String
        pub var dob: String
        pub var gender: String
        pub var citizenship: String
        pub var visa: { String : Bool }
        pub var travelLog: [ String ]

        init(name: String, dob: String, gender: String, citizenship: String, visa: {String : Bool}, travelLog:[String]) {
        self.name = name
        self.dob = dob
        self.gender = gender
        self.citizenship = citizenship
        self.visa = visa
        self.travelLog = travelLog
        }
        
        //Function to allow travel logs in passports to be updated. Takes 2 arguments, a country: String and description: String. 
        // Country is used to check against the passport's visa distionary, if true, transaction is successful, otherwise it reverts with an error.
        // Description describes the travel activity and date. 
        
        pub fun update_visa(country: String) {
            if self.visa[country] == false {
                self.visa[country] = true
            } else {
            self.visa[country] = false
            }
        }

        pub fun update_travelLog(country: String, description: String) {
            pre {
                self.visa[country] == true: "Access denied. Citizen does not have the required visa to enter"
            }

            self.travelLog.append(description)
        }
    }

    pub resource interface AdministratorCap {
        pub fun createPassport(name: String, dob: String, gender: String, citizenship: String, visa: {String : Bool}, travelLog:[String]): @Passport
    }

    pub resource Administrator: AdministratorCap {

        pub fun createPassport(name: String, dob: String, gender: String, citizenship: String, visa: {String : Bool}, travelLog:[String]): @Passport {
            FlowPassport.passportCount = FlowPassport.passportCount + 1
            log("Passport created and issued to citizen")
            log("Total passports issued to date : ")
            log(FlowPassport.passportCount)
            return <-create Passport(name: name, dob: dob, gender: gender, citizenship: citizenship, visa: visa, travelLog:travelLog)
        }
    }

    init() {
        self.passportCount = 0;
        //Creates an Administrator resource and stores it in FlowPassportAdmin a
        self.account.save(<-create Administrator(), to: /storage/FlowPassportAdmin)

        self.account.link<&{AdministratorCap}>(/private/FlowPassportAdminCap, target: /storage/FlowPassportAdmin)
    }
}