
let marketplaceCatIds = [];  // All kitties (kitty ids) for sale in the marketplace

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    DisplayMarketplaceKitties(instanceOfMarketplace, instanceOfKittyContract)

})


function DisplayMarketplaceKitties(instMarketplace, instKittyContract){
    try {
        instMarketplace.methods.getAllTokenOnSale().call({}, function(err, idsTokensOnSale){
            if (err) throw "Error from getAllTokenOnSale().call(): " + err
            putCatsOnPage(idsTokensOnSale, instKittyContract)
            marketplaceCatIds = idsTokensOnSale  
        })
    }
    catch(error){
        console.log("In DisplayMarketplaceKitties(): " + error)
    }
}


function buy(){
    try {
        // Validate 1 cat is selected
        let catIds = getSelectedCatIds(marketplaceCatIds)
        if (!isNumberOfKitties(1, catIds.length, "buyError")) return

        // Buy the selected kittie
        // *** TODO: ADD BUY CODE HERE *****
        console.log("TODO - *** Buy the selected kitty ***")

        // Notify user that kittie has been bought
        // (Catch buy event)

    }
    catch(error){
        console.log("Error from buy(): " + error)
    }
}