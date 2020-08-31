// zCollar.cdc

pub contract ZeemzCollar {

    // Declare NFT resource type
    pub resource zCollar {
        // The unique ID that differintiates each zCollar
        pub let id: UInt64
        
        // String mapping to hold metadata
        pub var metadata: {String: String}
        
        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }
    
    // Create a single new zCollar and save it to account storage
    init() {
        self.account.save<@zCollar>(<- create zCollar(initID: 1), to: /storage/zCollar)
    }
}