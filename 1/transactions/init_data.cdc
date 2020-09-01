import TopShot from 0x179b6b1cb6755e31

// This transaction is for initializing all sets, plays, and moments for development purposes

transaction() {
    prepare(acct: AuthAccount) {
        // borrow a reference to the Admin resource in storage
        let admin = acct.borrow<&TopShot.Admin>(from: /storage/TopShotAdmin)
            ?? panic("Could not borrow a reference to the Admin resource")

        // Increment the series number
        admin.startNewSeries()

        // Create a set with the specified name
        admin.createSet(name: "Base Set")

        admin.createPlay(metadata: {
            "AwayTeamName": "Jazz",
            "AwayTeamScore": "114",
            "Birthdate": "1989-04-17",
            "Birthplace": "Mostar,, BIH",
            "CurrentTeam": "Jazz",
            "CurrentTeamID": "",
            "DateOfMoment": "2020-02-09",
            "DraftRound": "2",
            "DraftSelection": "31",
            "DraftTeam": "Miami Heat",
            "DraftYear": "2011",
            "FirstName": "Bojan",
            "FullName": "Bojan Bogdanović",
            "Height": "80",
            "HomeTeamName": "Rockets",
            "HomeTeamScore": "113",
            "JerseyNumber": "44",
            "LastName": "Bogdanović",
            "NbaSeason": "2019-20",
            "PlayCategory": "3 Pointer",
            "PlayType": "3 Pointer",
            "PlayerPosition": "SF",
            "PrimaryPosition": "SF",
            "TeamAtMoment": "Utah Jazz",
            "TeamAtMomentNBAID": "",
            "TotalYearsExperience": "8",
            "Weight": "226",
            "Hash": "6aaed757-2d22-44c7-8f64-e7a46ca0c13e",
            "Rarity": "Common",
            "Video": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_Animated_1080_1920_Black.mp4",
            "Game": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_Game_2880_2880_Black.jpg",
            "Category": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_Category_2880_2880_Black.jpg",
            "Hero": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_Hero_2880_2880_Black.jpg",
            "ReverseHero": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_ReverseHero_2880_2880_Black.jpg",
            "Logos": "https://assets.nbatopshot.com/editions/1_base_set_common/6aaed757-2d22-44c7-8f64-e7a46ca0c13e/play_6aaed757-2d22-44c7-8f64-e7a46ca0c13e_1_base_set_common_capture_Logos_2880_2880_Black.jpg"
        })

        // Borrow a reference to the set to be added to
        let setRef = admin.borrowSet(setID: 1)

        // Add the specified play ID
        setRef.addPlay(playID: 1)

        let collection <- setRef.batchMintMoment(playID: 1, quantity: 20)

        // Get the account object for the recipient of the minted tokens
        let recipient = getAccount(0xe03daebed8ca0615)

        // get the Collection reference for the receiver
        let receiverRef = recipient.getCapability(/public/MomentCollection)!.borrow<&{TopShot.MomentCollectionPublic}>()
            ?? panic("Cannot borrow a reference to the recipient's collection")

        // deposit the NFT in the receivers collection
        receiverRef.batchDeposit(tokens: <-collection)
    }
}
