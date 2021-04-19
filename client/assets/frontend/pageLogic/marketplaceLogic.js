
let marketplaceCatIds = [];  // All kitties (kitty ids) for sale in the marketplace

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    // await DisplayMarketplaceKitties()
    DisplayMarketplaceKitties()

    // Register for KittyContract transaction event reporting
    reportOnMarketplaceEvent(processMarketplaceEvent)
    // onMarketEvent(marketPageMarketEventHandler)
    // onMarketEvent(catPenPageMarketEventHandler)

})


async function DisplayMarketplaceKitties(){
    try {
        const catIds = await getAllCatIdsOnSale()
        const catsOnSale = await getDetailsOfAllCatsForSale(catIds)

        putAllCatsOnPage(catsOnSale)

        marketplaceCatIds = catIds
        // TODO : *** Also store full details ie. catsOnSale ??

        // Add buy button (to all cats in marketplace except users own)
        for (i = 0; i < catsOnSale.length; i++) {
            const cat = catsOnSale[i]
        // *** Commented out for initial testing purposes only - uncomment for full testing with different User accounts
        //     if (isUser(cat.sellerAddress)) { 
        //         $(`#kitty${cat.id}`).find('#catStatus').html("YOUR KITTY!")
        //     }
        //     else {
                $(`#kitty${cat.id}`).find('#catStatus').html(
                    `<button id="buyButton${cat.id}" type="button" class="btn btn-success" onclick="buyKittyToken('${cat.id}', '${cat.priceInWei}')">BUY</button>`)
            // }
        }
    }
    catch(error){
        console.log("In DisplayMarketplaceKitties(): " + error)
    }
}


function buyKittyToken(id, priceInWei){
    try {
        // Buy the kitty (via the marketplace Contract)
        buyKitty(id, priceInWei)

        // Prevent user clicking buy again whilst purchase is being procesed
        $(`#buyButton${id}`).prop("disabled", true);
    }
    catch(error){
        console.log("Error from buyKittyToken(id): " + error)
    }
}

/*
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
*/