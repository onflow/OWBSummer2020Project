
access(all) contract HealthCrossingCore {
    // AvatarAttributeUpdated is emitted when an avatar's attribute is updated
    pub event AvatarAttributeUpdated(avatarId: UInt64, type: String)

    // AvatarAttributeUpdated is emitted when an avatar's attribute fails to update
    pub event AvatarFailAttributeUpdated(avatarId: UInt64)

    // Interactible enforces the base requirements of a resource that interacts with an Avatar
    access(all) resource interface Interactible {
        pub let id: UInt64
        pub var name: String
    }

    // BodyNFT are physical characteristics that form the Avatar's unique identity
    access(all) resource BodyNFT: Interactible {
        pub let id: UInt64
        pub var name: String
        pub let bodyType: String

        init(id: UInt64, name: String, bodyType: String) {
            self.id = id
            self.name = name
            self.bodyType = bodyType
        }
    }

    access(all) resource BodyNFTMinter {
        pub var idCount: UInt64
        pub var totalSupply: UInt64

        init() {
            self.idCount = 0
            self.totalSupply = 0
        }
    
        pub fun mint(name: String, bodyType: String): @BodyNFT {
            self.idCount = self.idCount + UInt64(1)
            return <- create BodyNFT(id: self.idCount, name: name, bodyType: bodyType)
        }
    }

    // BodyNFTCollection is a collection for BodyNFTs
    access(all) resource BodyNFTCollection {
        // physique is the makeup of the Avatar's physique
        pub let physique: @{String: BodyNFT}

        init() {
            let bodyNftMinter <- HealthCrossingCore.account.load<@HealthCrossingCore.BodyNFTMinter>(from: /storage/HealthCrossingBodyNFTMinter)!
            
            self.physique <- {
                "eyes": <- bodyNftMinter.mint(name: "eye2", bodyType: "eyes"),
                "nose": <- bodyNftMinter.mint(name: "nose1", bodyType: "nose"),
                "lip": <- bodyNftMinter.mint(name: "lip1", bodyType: "lip"),
                "ears": <- bodyNftMinter.mint(name: "ears1", bodyType: "ears"),
                "bodyShape": <- bodyNftMinter.mint(name: "thicc", bodyType: "bodyShape")
            }

            HealthCrossingCore.account.save(<-bodyNftMinter, to: /storage/HealthCrossingBodyNFTMinter)
        }

        destroy() {
            destroy self.physique
        }
    }

    // WearableNFT are items that an Avatar can don and trade with other Avatars
    access(all) resource WearableNFT: Interactible {
        pub let id: UInt64
        pub var name: String
        pub var outfitType: String

        init(id: UInt64, name: String, outfitType: String) {
            self.id = id
            self.name = name
            self.outfitType = outfitType
        }
    }

    access(all) resource WearableNFTMinter {
        pub var idCount: UInt64
        pub var totalSupply: UInt64

        init() {
            self.idCount = 0
            self.totalSupply = 0
        }
        
        pub fun mint(name: String, outfitType: String): @WearableNFT {
            self.idCount = self.idCount + UInt64(1)
            return <- create WearableNFT(id: self.idCount, name: name, outfitType: outfitType)
        }
    }

    // WearableNFTCollection is a collection for WearableNFTs
    access(all) resource WearableNFTCollection {
        // closet is a collection of unworn WearableNFTs
        pub let closet: @{UInt64: WearableNFT}
        // outfit is a collection of WearableNFTs currently worn by the Avatar
        pub let outfit: @{String: WearableNFT}

        init() {
            self.closet <- {} 
            self.outfit <- {} // TODO: Set default outfit
        }

        destroy() {
            destroy self.closet
            destroy self.outfit
        }
    }

    // WearableNFTMarketplace is public marketplace to sell wearables
    access(all) resource WearableNFTMarketplace {}

    access(all) resource Avatar {
        pub let id: UInt64
        pub let birthDate: String
        pub let bodyNFTCollection: @HealthCrossingCore.BodyNFTCollection
        pub let wearableNFTCollection: @HealthCrossingCore.WearableNFTCollection
        pub let healthStats: {String: HealthCrossingCore.HealthStat}
        pub var name: String
        pub var age: UInt64
        
        init(id: UInt64, name: String) {
            self.id = id
            self.birthDate = "2006-04-20" // TODO: Get data creation time
            self.bodyNFTCollection <- create HealthCrossingCore.BodyNFTCollection()
            self.wearableNFTCollection <- create HealthCrossingCore.WearableNFTCollection()

            // TODO: sync this with the ProgressBoard using a shared parent data structure
            self.healthStats = {
                "activeEnergy": HealthCrossingCore.HealthStat(type: "activeEnergy", value: UFix64(0), unit: "calories"),
                "exerciseTime": HealthCrossingCore.HealthStat(type: "exerciseTime", value: UFix64(0), unit: "minutes"),
                "pushCount": HealthCrossingCore.HealthStat(type: "pushCount", value: UFix64(0), unit: "reps"),
                "hoursAsleep": HealthCrossingCore.HealthStat(type: "hoursAsleep", value: UFix64(0), unit: "hours"),
                "stepCount": HealthCrossingCore.HealthStat(type: "stepCount", value: UFix64(0), unit: "steps"),
                "distanceWalkingRunning": HealthCrossingCore.HealthStat(type: "distanceWalkingRunning", value: UFix64(0), unit: "miles")
            }

            self.name = name
            self.age = 0
        }

        // changeBodyNFT replaces the old body part with the new one.
        // Destroy the old one because they are not meant to exist apart from an Avatar.
        pub fun changeBodyNFT(bodyType: String, bodyPart: @HealthCrossingCore.BodyNFT) {
            let oldBodyPart <- self.bodyNFTCollection.physique[bodyType] <- bodyPart
            destroy oldBodyPart
        }

        // storeWearableNFT stores a wearableNFT into the Avatar's closet
        pub fun storeWearableNFT(wearable: @HealthCrossingCore.WearableNFT) {
            self.wearableNFTCollection.closet[wearable.id] <-! wearable
        }

        // wearWearableNFT puts the wearableNFT onto the Avatar itself
        pub fun wearWearableNFT(wearable: @HealthCrossingCore.WearableNFT) {
            self.wearableNFTCollection.outfit[wearable.outfitType] <-! wearable
        }

        // updateAttribute updates a single health stat
        pub fun updateAttribute(type: String, value: UFix64) {
            let prevStat = self.healthStats[type]!
            self.healthStats[type] = HealthStat(type: prevStat.type, value: value, unit: prevStat.unit)
            emit AvatarAttributeUpdated(avatarId: self.id, type: prevStat.type)
        }

        destroy() {
            destroy self.bodyNFTCollection
            destroy self.wearableNFTCollection
        }
    }

    // HealthStat is a single data point as part of an Avatar's health stats.
    pub struct HealthStat {
        // type is the name of the health. i.e. "activeEnergy"
        pub var type: String
        pub var value: UFix64
        // unit is the unit of measurement. i.e. "minutes/miles"
        pub var unit: String
        
        init(type: String, value: UFix64, unit: String) {
            self.type = type
            self.value = value
            self.unit = unit
        }
    }

    access(all) resource AvatarMinter {
        pub var idCount: UInt64
        pub var totalSupply: UInt64

        init() {
            self.idCount = 0
            self.totalSupply = 0
        }

        pub fun mintAvatar(name: String): @Avatar {
            self.idCount = self.idCount + UInt64(1)
            self.totalSupply = self.totalSupply + UInt64(1)
            return <- create HealthCrossingCore.Avatar(id: self.idCount, name: name)
        }
    }

    /*
    * HEALTH CROSSING CORE PUBLIC METHODS
    */

    pub fun mintAvatar(name: String): @Avatar {
        let avatarMinter <- self.account.load<@HealthCrossingCore.AvatarMinter>(from: /storage/HealthCrossingAvatarMinter)!
        let avatar <- avatarMinter.mintAvatar(name: name)
        self.account.save(<-avatarMinter, to: /storage/HealthCrossingAvatarMinter)
        return <- avatar
    }
    
    pub fun updateAttributes(avatar: @HealthCrossingCore.Avatar, attributes: {String: UFix64}): @HealthCrossingCore.Avatar {
        for attributeType in attributes.keys {
            avatar.updateAttribute(type: attributeType, value: attributes[attributeType]!)

            let tier = HealthCrossingCore.progressEngine.computeTier(avatarStats: avatar.healthStats, statType: attributeType)
            let rewards = HealthCrossingCore.progressEngine.unlockRewards(attributeType: attributeType, tier: Int(tier))

            log(tier)

            let bodyNftMinter <- self.account.load<@HealthCrossingCore.BodyNFTMinter>(from: /storage/HealthCrossingBodyNFTMinter)!
            let wearableNftMinter <- self.account.load<@HealthCrossingCore.WearableNFTMinter>(from: /storage/HealthCrossingWearableNFTMinter)!
            
            var i = 0
            while i < rewards.length {
                let reward = rewards[i]
                log(reward)
                if reward.interactibleType == "body" {
                    // TODO: require more data architecture to determine nft's body type (i.e. eyes, lips, nose, legs, etc)
                    let tempStaticBodyType = "eyes"
                    let bodyNFT <- bodyNftMinter.mint(name: reward.name, bodyType: tempStaticBodyType)
                    avatar.changeBodyNFT(bodyType: tempStaticBodyType, bodyPart: <-bodyNFT)
                    log(tempStaticBodyType)
                } else if reward.interactibleType == "wearable" {
                    // TODO: require more data architecture to determine nft's body type (i.e. eyes, lips, nose, legs, etc)
                    let tempStaticWearableType = "pants"
                    // let wearableNFT <- wearableNftMinter.mint(name: reward.name, outfitType: tempStaticWearableType)
                    // avatar.wearWearableNFT(wearable: <-wearableNFT)
                    log(tempStaticWearableType)
                }

                i = i + 1 
            }

            // create the wearable and body NFTs based on the progression tier achieved
            self.account.save(<-bodyNftMinter, to: /storage/HealthCrossingBodyNFTMinter)
            self.account.save(<-wearableNftMinter, to: /storage/HealthCrossingWearableNFTMinter)
        }
        
        return <- avatar
    }


    // nftMapping represents an intermediate payload to communicate to NFT minters what to create
    pub struct nftMapping {
        pub let name: String
        pub let interactibleType: String
        init(name: String, interactibleType: String) {
            self.name = name
            self.interactibleType = interactibleType
        }
    }
    
    
    // ProgressEngine aggregates and computes Avatar health stats against the ProgressBoard.
    // It then determines what new wearable and body NFTs to mint for the Avatar.
    pub struct ProgressEngine {
        // progressBoard constructs the progression hierarchy for Avatar health tracking.
        // It serves as a reference map to determine the current level for an Avatar's particular health stat.
        pub var progressBoard: {String: [HealthCrossingCore.HealthStat]}

        pub var progressionReward: {
            String: {
                Int: [nftMapping]
            }
        }

        pub fun unlockRewards(attributeType: String, tier: Int): [nftMapping] {
            let rewardKind = self.progressionReward[attributeType]!
            let rewards = rewardKind[tier]!
            return rewards
        }
        
        init() {
            // TODO: sync keys with avatar health stats map
            self.progressBoard = {
                "hoursAsleep": [
                    HealthStat(type: "hoursAsleep", value: UFix64(8), unit: "hours"),
                    HealthStat(type: "hoursAsleep", value: UFix64(6), unit: "hours"),
                    HealthStat(type: "hoursAsleep", value: UFix64(4), unit: "hours"),
                    HealthStat(type: "hoursAsleep", value: UFix64(0), unit: "hours")
                ],
                "distanceWalkingRunning": [
                    HealthStat(type: "distanceWalkingRunning", value: UFix64(30), unit: "miles"),
                    HealthStat(type: "distanceWalkingRunning", value: UFix64(10), unit: "miles"),
                    HealthStat(type: "distanceWalkingRunning", value: UFix64(5), unit: "miles"),
                    HealthStat(type: "distanceWalkingRunning", value: UFix64(2), unit: "miles"),
                    HealthStat(type: "distanceWalkingRunning", value: UFix64(0), unit: "miles")
                ],
                "stepCount": [
                    HealthStat(type: "stepCount", value: UFix64(20000), unit: "steps"),
                    HealthStat(type: "stepCount", value: UFix64(10000), unit: "steps"),
                    HealthStat(type: "stepCount", value: UFix64(7500), unit: "steps"),
                    HealthStat(type: "stepCount", value: UFix64(3000), unit: "steps"),
                    HealthStat(type: "stepCount", value: UFix64(0), unit: "steps")
                ],
                "activeEnergy": [
                    HealthStat(type: "activeEnergy", value: UFix64(5000), unit: "cal"),
                    HealthStat(type: "activeEnergy", value: UFix64(2500), unit: "cal"),
                    HealthStat(type: "activeEnergy", value: UFix64(1500), unit: "cal"),
                    HealthStat(type: "activeEnergy", value: UFix64(1000), unit: "cal"),
                    HealthStat(type: "activeEnergy", value: UFix64(0), unit: "cal")
                ],
                "exerciseTime": [
                    HealthStat(type: "exerciseTime", value: UFix64(90), unit: "minutes"),
                    HealthStat(type: "exerciseTime", value: UFix64(60), unit: "minutes"),
                    HealthStat(type: "exerciseTime", value: UFix64(30), unit: "minutes"),
                    HealthStat(type: "exerciseTime", value: UFix64(15), unit: "minutes"),
                    HealthStat(type: "exerciseTime", value: UFix64(0), unit: "minutes")
                ],
                "pushCount": [
                    HealthStat(type: "pushCount", value: UFix64(200), unit: "reps"),
                    HealthStat(type: "pushCount", value: UFix64(100), unit: "reps"),
                    HealthStat(type: "pushCount", value: UFix64(50), unit: "reps"),
                    HealthStat(type: "pushCount", value: UFix64(20), unit: "reps"),
                    HealthStat(type: "pushCount", value: UFix64(0), unit: "reps")
                ]
            }

            self.progressionReward = {
                "hoursAsleep": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                },
                "distanceWalkingRunning": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                },
                "stepCount": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                },
                "activeEnergy": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                },
                "exerciseTime": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                },
                "pushCount": {
                    1: [nftMapping(name: "eye4", interactibleType: "body")],
                    2: [nftMapping(name: "eye9", interactibleType: "body")],
                    3: [nftMapping(name: "eye14", interactibleType: "body")],
                    4: [nftMapping(name: "eye1", interactibleType: "body")]
                }
            }
        }
        
        pub fun computeTier(avatarStats: {String: HealthCrossingCore.HealthStat}, statType: String): UInt64 {
            let progressionTrack = self.progressBoard[statType]!
            let avatarCurrStat = avatarStats[statType]!

            // Loop through the progression track, and get the earliest satisfied progression condition
            var i = 0
            while i < progressionTrack.length {
                let currProgressMilestone = progressionTrack[i]
                if avatarCurrStat.value >= currProgressMilestone.value {
                    return UInt64(progressionTrack.length - i)
                }
                i = i + 1
            }

            return UInt64(0)
        }
    }

    // Internal state
    pub var progressEngine: ProgressEngine

    init() {
        self.account.save(<-create AvatarMinter(), to: /storage/HealthCrossingAvatarMinter)
        self.account.link<&AvatarMinter>(/public/HealthCrossingAvatarMinter, target: /storage/HealthCrossingAvatarMinter)
        self.account.save(<-create WearableNFTMinter(), to: /storage/HealthCrossingWearableNFTMinter)
        self.account.save(<-create BodyNFTMinter(), to: /storage/HealthCrossingBodyNFTMinter)
        
        self.progressEngine = ProgressEngine()
    }
}
 