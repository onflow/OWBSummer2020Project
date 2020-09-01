// zStar.cdc

pub contract ZeemzStar {

    // Declare NFT resource type
    pub resource zStar {
        // The unique ID that differintiates each zStar
        pub let id: UInt64
        
        // String mapping to hold metadata
        pub var metadata: {String: String}
        
        // Initialize both fields in the init function
        init(initID: UInt64) {
            self.id = initID
            self.metadata = {}
        }
    }
    
    // Create a single new zStar and save it to account storage
    init() {
        self.account.save<@zStar>(<- create zStar(initID: 1), to: /storage/zStar)
    }
}
