        pub fun sortBidders(_ auctionID: UInt64, bidders: {Address: UInt64}): [Address] {

            if bidders.length == 0 { return [] }

            var sortedBidders: [Address] = []
            
            // counter for the outer loop
            var i = 0

            while i < bidders.keys.length {
                
                var j = i + 1
                var compareTotal = bidders[bidders.keys[i]]!

                while j <= bidders.keys.length {

                    if compareTotal < bidders[bidders.keys[j]]! {
                        sortedBidders[i] = bidders.keys[j]
                        sortedBidders[j] = bidders.keys[i]
                    }
                } 

                i = i + 1
            }
            
            return sortedBidders
        }