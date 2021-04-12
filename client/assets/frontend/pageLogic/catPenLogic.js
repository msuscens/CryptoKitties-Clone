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
    reportOnTransactionEvent(displayTransaction)
})


async function displayAllOwnedKities(){
    try {
        const catIds = await getAllYourCatIds()
        const cats = await getDetailsAllCats(catIds)
        putAllCatsOnPage(cats)

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


async function selling(){
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
        setMarketplaceApproval()

        // Create a sell order in the marketplace
        const salePriceInWei = BigInt(web3.utils.toWei(salePrice, 'ether'))

        setForSale(catIds[0], salePriceInWei)
        // *** Question: I assume I don't want to wait for anything that sets values in blockchain (otherwise it'll bock UI)! ???? 
        // *** Discuss with Kenneth ***
        // await setForSale(catIds[0], salePriceInWei)

        // *** TODO : Output user message with TxHash ?????
        // *** Probably not as wait for event to confirm

        // Update kitty (in kitty pen) with a for sale notice
        // *** TODO - Do this here or upon receiving event ??

    }
    catch(error){
        console.log("Error from selling(): " + error)
        $("#sellError").text("Failed to set sale offer in the marketplace!")
    }
}

function buying(){
    try {
        // Go to the Market page
        window.location.href = `marketplace.html`
    }
    catch(error){
        console.log("Error from buying(): " + error)
    }
}
