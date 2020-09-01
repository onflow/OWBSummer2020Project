import NonFungibleToken from 0xNFTStandardAddress

pub contract SurvivalNFT: NonFungibleToken {

    pub var version: UInt16
    pub var totalSupply: UInt64
    pub var formCount: UInt32
    pub var combinationCount: UInt32

    pub var forms: @[Form]
    pub var formNameToId: {String: UInt32}
    pub var formData: [FormData]
    pub var combinations: @[Combination]
    pub var combinationNameToId: {String: UInt32}
    pub var onlyFromCombination: [UInt32] 

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)
    pub event Minted(id: UInt64, formId: UInt32)
            
    pub event FormCreated(id: UInt32, name: String)
    pub event FormDataCreated(id: UInt32, fields: {String: String})
    
    pub event CombinationCreated(id: UInt32, name: String, ingredients:[UInt32], products:[UInt32], consumed:[UInt32])  

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let contractVersion: UInt16

        //TODO: Enforce nontransferable and consumable resources

        pub let formId: UInt32

        pub fun getFormId(): UInt32 {
            return self.formId
        }

        init(formId : UInt32) {
            pre {
                SurvivalNFT.forms.length > Int(formId): "Can't mint an NFT from nonexisting form"
            }
            self.contractVersion = SurvivalNFT.version
            self.id = SurvivalNFT.totalSupply
            self.formId = formId
            SurvivalNFT.totalSupply = SurvivalNFT.totalSupply + UInt64(1)

            emit Minted(id: self.id, formId: self.formId)
        }
    }
    pub resource interface SurvivalCollectionPublic /*:  add implements all standard interfaces */ {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun getFormIds(): {UInt64: UInt32}  //maps token ids on formIds
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT

        pub fun borrowSurvivalToken(id: UInt64): &SurvivalNFT.NFT?
    }
    pub resource Collection: SurvivalCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @SurvivalNFT.NFT

            let id: UInt64 = token.id
            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
        }
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }
        pub fun getFormIds(): {UInt64: UInt32} {
            let formIds: {UInt64: UInt32} = {}
            for id in self.getIDs() {
                let formId = self.borrowSurvivalToken(id: id)!.getFormId()
                formIds[id] = formId
            }
            return formIds
        }
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return &self.ownedNFTs[id] as &NonFungibleToken.NFT
        }
        pub fun borrowSurvivalToken(id: UInt64): &SurvivalNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                let ref = &self.ownedNFTs[id] as auth &NonFungibleToken.NFT
                return ref as! &SurvivalNFT.NFT
            } else {
                return nil
            }
        }
        destroy() {
            destroy self.ownedNFTs
        }
    }
    pub resource Form {
        //this is a "template" resource  holding reference to the FromData and 
        // acting as a template for the actual player owned nfts
        pub let id: UInt32
        pub let name: String 
        init(name: String, fields: {String: String}) {
            pre {
                name.length > 0: "New Form has to have a non empty name" //TODO: enforec uniqueness
            }
            self.id = SurvivalNFT.formCount + UInt32(1)
            SurvivalNFT.formCount = SurvivalNFT.formCount + UInt32(1)
            self.name = name
            //TODO crate a new FormData in a corresponding array which needs to be declared on the contract level
            
            emit FormCreated(id: self.id, name: self.name)
        }
    }
    /*
    Struct below holds metadata of the Form, 
    This needs to be redesigned to be included in the form directly
     */
    pub struct FormData {

        pub let id: UInt32
        pub let fields: {String: String}

        init(id: UInt32, fields: {String: String}) {
            pre {
                fields.length > 0: "New Form fields can't be empty"
                id == SurvivalNFT.formCount: "New Form Data can only be created for newly created Form"
            }
            self.id = id

            self.fields = fields

            emit FormDataCreated(id: self.id, fields: self.fields)
        }
    }
    /*Combination is central to the crafting, it is a rasource containing the definition of the crafting process ie:
     arrays of prducts and ingredientsm, together with whih (if any) ingredients are to be consumed in the process
     */
    pub resource Combination {

        pub let id: UInt32
        pub let name: String
        pub let ingredients: [UInt32]
        pub let products: [UInt32]
        pub let consumed: [UInt32]

        init(name: String, ingredients: [UInt32], products: [UInt32], consumed: [UInt32]) {
            pre {
                ingredients.length > 0: "New Combination ingredients can't be empty"
                products.length > 0: "New Combination products can't be empty"
                consumed.length <= ingredients.length: "Can't comsume more then available"
            }
            self.id = SurvivalNFT.combinationCount + UInt32(1)
            SurvivalNFT.combinationCount = SurvivalNFT.combinationCount + UInt32(1)

            self.name = name
            self.ingredients = ingredients
            self.products = products 
            self.consumed = consumed

            emit CombinationCreated(id: self.id, name: self.name, ingredients: self.ingredients, 
                products: self.products, consumed: self.consumed)

        }
    }

    // public function that anyone can call to create a new empty collection
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    // Interface to the Admin Resource to allow minting by users without admin signaturs
    // but only accordding to predefined recepies called combinations
    pub resource interface NFTCombinationMinter {
        pub fun mintNFTFromCombination(
            recipient: &{SurvivalNFT.SurvivalCollectionPublic}, 
            ingredients: @SurvivalNFT.Collection, 
            combinationId: UInt32
        )
    }
	pub resource NFTAdmin: NFTCombinationMinter {

		// mintNFT mints a new NFT with a new ID
		// and deposit it in the recipients collection using their collection reference
		pub fun mintNFT(formId: UInt32, recipient: &{SurvivalNFT.SurvivalCollectionPublic}) {
            pre {
                formId < SurvivalNFT.formCount: "Trying to mint from a nonexistent form"
            }
            //TODO: prevent NFTs from combinations to be minted here without 
            //TODO: decide if all or only some of combinations should be subject
			var newNFT <- create NFT(formId: formId)
			recipient.deposit(token: <-newNFT)
		}
        /* The crafting function
            It is available via the NFTCombinationMinter Interface on the admin resource which allows
            for minting product NFTs without explicit signature from the admin account
         */
        pub fun mintNFTFromCombination(recipient: &{SurvivalNFT.SurvivalCollectionPublic}, 
            ingredients: @SurvivalNFT.Collection, combinationId: UInt32) {
            //requested combination exists
            pre { 
                SurvivalNFT.combinationCount > combinationId: "Trying to mint from a nonexistent combination"
                //  check proper ingredients against combination.ingredientsingredients.getFormIds() == 
            }
            let comb = &SurvivalNFT.combinations[combinationId] as &SurvivalNFT.Combination
            //1. for each product: mintNFT productId and  deposit
            for productId in comb.products {
                 self.mintNFT(formId: productId, recipient: recipient) 
            }
           for inId in ingredients.getIDs() {
                let ingredientToken <- ingredients.withdraw(withdrawID: inId) as! @SurvivalNFT.NFT
                if comb.consumed.contains(ingredientToken.formId) { 
                    destroy ingredientToken 
                } else { 
                    //3. deposit remaining ingredients back into recipients collection
                    recipient.deposit(token: <-ingredientToken)
                }
            }
            destroy ingredients
        }
        /* An admin task to creat a new item definition aka a form */
        pub fun mintForm(name: String, fields: {String: String}) {
            pre {

                name.length > 0: "A form has to have a name"
                fields.length > 0: "Form has to have at least one field"
            }
            let newForm <-create Form(name: name, fields: fields)
            SurvivalNFT.formNameToId[name] = newForm.id
            SurvivalNFT.formData.append(FormData(id: newForm.id, fields: fields))

            SurvivalNFT.forms.append(<-newForm)
        }
        /*And admin task to create a new combination definition */
        pub fun mintCombination(name: String, ingredients:[UInt32], products:[UInt32], consumed:[UInt32]) {
            pre {
                name.length > 0: "A form has to have a name"
                ingredients.length > 0: "Form has to have at least one ingredient"
                products.length > 0: "Form has to have at least one product"
            }
            let newComb <- create Combination(name: name, ingredients: ingredients, products: products, consumed:consumed)
            SurvivalNFT.combinationNameToId[name] = newComb.id
            SurvivalNFT.combinations.append(<-newComb)

        }
	}  

    pub fun getFormData(_ formId: UInt32): {String: String} {
        pre {
            formId < SurvivalNFT.formCount: "Trying to access nonexisting form "
        }
        return self.formData[formId].fields
    }
	init() {
        // Initialize the total supply
        self.totalSupply      = 0
        self.formCount        = 0
        self.combinationCount = 0
        self.version          = 0 //remember to increment in code or find a way to remember the totalSupply etc
                                  // between contract ver deployments, perhaps in a resource

        self.forms        <- []
        self.formData     =  []
        self.formNameToId =  {}
        self.combinations <-  []
        self.combinationNameToId = {}
        self.onlyFromCombination = []

        // Create an Admin resource and save it to storage
        let oldAdmin <- self.account.load<@NFTAdmin>(from:/storage/NFTAdmin)
        destroy oldAdmin
        let admin <- create NFTAdmin()
    
        self.account.save(<-admin, to: /storage/NFTAdmin)
        // Expose the combination minter
        self.account.link<&{SurvivalNFT.NFTCombinationMinter}>(/public/NFTCombinationMinter , target:/storage/NFTAdmin)

        emit ContractInitialized()
	}
}
 