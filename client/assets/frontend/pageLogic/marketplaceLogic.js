
let marketplaceCatIds = [];  // All kitties (kitty ids) for sale in the marketplace

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    // await DisplayMarketplaceKitties()
    DisplayMarketplaceKitties()

    // Register for event reporting
    // *** TODO - Do it here ***
    reportOnTransactionEvent(displayTransaction)

})


async function DisplayMarketplaceKitties(){
    try {
        const catIds = await getAllCatIdsOnSale()
        const catsOnSale = await getDetailsOfAllCatsForSale(catIds)

        putAllCatsOnPage(catsOnSale)

        marketplaceCatIds = catIds
        // TODO : *** Also store full details ie. catsOnSale ??  
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
        // ie. Make sure that sc event is handled correctly...

    }
    catch(error){
        console.log("Error from buy(): " + error)
    }
}