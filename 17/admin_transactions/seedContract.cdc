import SurvivalNFT from 0xNFTAddress

transaction () {

    let admin: &SurvivalNFT.NFTAdmin
    prepare (signer: AuthAccount) {
        // check if admin account
        self.admin = signer.borrow<&SurvivalNFT.NFTAdmin>(from:/storage/NFTAdmin) ?? 
            panic("Can't borrow admin, trying to mint from nonadmin account.")
    }

    execute {

        let fieldsOne: {String: String} = {
            "name": "Alpha-Omega NRG Cell",
            "version:": "MK1",
            "category": "energy",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "8889",
            "transferable": "F"
            }
        self.admin.mintForm(name: "Alpha-Omega NRG Cell", fields: fieldsOne )
        let fieldsTwo: {String: String} = {
            "name": "Alpha-Omega NRG Generator Template",
            "version:": "MK1",
            "category": "energy",
            "consumable": "F",
            "durability": "ideatic", 
            "power_level": "8889",
            "transferable": "F"
            }
        self.admin.mintForm(name: "Infinit-Sustain NRG Generator", fields: fieldsTwo )
        let fieldsThree: {String: String} = {
            "name": "Alpha-Omega NRG Generator",
            "version:": "MK1",
            "category": "energy",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "9001",
            "transferable": "F"
            }
        self.admin.mintForm(name: "Alpha-Omega NRG Generator", fields: fieldsThree )

        let fieldsFour: {String: String} = {
            "name": "Green Lasecannon Construction Kit",
            "version:": "MK1",
            "category": "weapon",
            "consumable": "T",
            "durability": "ideatic", 
            "power_level": "9001",
            "transferable": "T",
            "rarity": "epic",
            "id": "3"
        }
        self.admin.mintForm(name: "Green Lasecannon Construction Kit", fields: fieldsFour )


        self.admin.mintCombination(name: "Alpha-Omega NRG Generator", ingredients:[UInt32(0), UInt32(1)], products:[UInt32(2)],
            consumed: [UInt32(0)])
        log("Forms minted, and a Combination")
    }

}
 