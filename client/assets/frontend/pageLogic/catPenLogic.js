let myCatIds = [];  // All the kitties (kitty ids) that a user owns

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    // *** Question: I assume I don't want to wait for anything that sets values in blockchain SC (otherwise it'll bock UI)! ???? 
    // *** Discuss with Kenneth ***
    // await displayAllOwnedKities()
    displayAllOwnedKities()
    reportOnMarketplaceEvent(processMarketplaceEvent)
    // onMarketEvent(catPenPageMarketEventHandler)

})


async function displayAllOwnedKities(){
    try {
        const catIds = await getAllYourCatIds()
        const cats = await getDetailsAllCats(catIds)

        // Collect details of any cats that are on sale in the marketplace
        // (sale details will be undefined if not on sale)
        for (let i = 0; i < catIds.length; i++) {
            const catOnSale = await isCatOnSale(catIds[i])
            if (catOnSale) {
                const forSaleDetails =  await getForSaleDetails(catIds[i])
                cats[i] = {...cats[i], ...forSaleDetails}
            }
        }

        putAllCatsOnPage(cats, true)

        myCatIds = catIds
        // TODO *** Save cat details (as well as myCatIds)??
    }
    catch(error){
        console.log("In displayAllOwnedKities(): " + error)
    }
}


function breeding(){
    try {
        // Validate 2 cats are selected
        let catIds = getSelectedCatIds(myCatIds)
        if (!isNumberOfKitties(2, catIds.length, "breedError")) return

        // Go to the Breed page
        window.location.href =
            `breed.html?firstCatId=${catIds[0]}&secondCatId=${catIds[1]}`
    }
    catch(error){
        console.log("Error from breeding(): " + error)
    }
}


async function advertiseCat(){
    try {
        // Validate 1 cat is selected
        let catIds = getSelectedCatIds(myCatIds)
        if (!isNumberOfKitties(1, catIds.length, "sellError")) return

        // Validate user entered sale price
        const salePrice = $("#salePrice").val()
        const salePriceFigure = parseFloat(salePrice)
        if (!Number.isFinite(salePriceFigure) && (salePriceFigure > 0)) {
            $("#sellError").text("Invalid price! Please enter a positive number!")
            $("#sellError").css({'color': 'red', 'font-weight': 'bold'})
            return false
        }
        
        // Ensure marketplace is set as an operator
        // *** Question: I assume I don't want to wait for anything that sets values in blockchain SC (otherwise it'll bock UI)! ???? 
        // *** Discuss with Kenneth ***
        // await grantMarketplaceApproval()
        await setMarketplaceApproval()

        // Create a sell order in the marketplace
        const salePriceInWei = BigInt(web3.utils.toWei(salePrice, 'ether'))

        setForSale(catIds[0], salePriceInWei)
        // *** Question: I assume I don't want to wait for anything that sets values in blockchain (otherwise it'll bock UI)! ???? 
        // *** Discuss with Kenneth ***
        // await setForSale(catIds[0], salePriceInWei)

        // Immediately (before page refresh) Update kitty (in kitty pen) with a for sale notice (ad price)
        // *** TODO - Do this here or upon receiving event ??

    }
    catch(error){
        console.log("Error from advertiseCat(): " + error)
        $("#sellError").text("Failed to set sale offer in the marketplace!")
    }
}

/*
function buying(){
    try {
        // Go to the Market page
        window.location.href = `marketplace.html`
    }
    catch(error){
        console.log("Error from buying(): " + error)
    }
}
*/
