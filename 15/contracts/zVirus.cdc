// zVirus.cdc

pub contract ZeemzVirus {

    // Declare NFT resource type
    pub resource zVirus {
        // The unique ID that differintiates each zVirus
        pub let id: UInt64
        
        // String mapping to hold metadata
        pub var metadata: {String: String}
        
        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }
    
    // Create a single new zVirus and save it to account storage
    init() {
        self.account.save<@zVirus>(<- create zVirus(initID: 1), to: /storage/zVirus)
    }
}
