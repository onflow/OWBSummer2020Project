import SurvivalNFT from 0xNFTAddress

// This transaction returns an array of all the nft ids in the collection

pub fun main(): {String:String} {
    let id: UInt32 = UInt32(id_placeholder)
    let formData = SurvivalNFT.getFormData(id)
    //queires the form resource for the name
    //move it to the getFormData function 
    //maybe even merge form and formData
    //this wont work, gotta borrow the resource, so a dict needed instead of an array :formData["name"] = SurvivalNFT.forms[id].name  
    log(formData)
    return formData
}
    