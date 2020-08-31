// zChest.cdc

// https://play.onflow.org/798912ca-aefa-4f20-91db-c05e452ecc33

// Create a Zeemz Chest NFT and store it in the creator's account

pub contract ZeemzChest {

    // Declare NFT resource type
    pub resource zChest {
        // The unique ID that differintiates each zChest
        pub let id: UInt64
        
        // String mapping to hold metadata
        pub var metadata: {String: String}
        
        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }
    
    // Create a single new zChest and save it to account storage
    init() {
        self.account.save<@zChest>(<- create zChest(initID: 1), to: /storage/zChest)
    }
}