// Collar.cdc

pub contract Collar {

    // Declare NFT resource type
    pub resource Collar {
        // The unique ID that differintiates each Collar
        pub let id: UInt64
        
        // String mapping to hold metadata
        pub var metadata: {String: String}
        
        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }
    
    // Create a single new Collar and save it to account storage
    init() {
        self.account.save<@Collar>(<- create Collar(initID: 1), to: /storage/Collar)
    }
}