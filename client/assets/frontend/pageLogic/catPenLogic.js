let myCatIds = [];  // All the kitties (kitty ids) that a user owns

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    displayAllOwnedKities(instanceOfKittyContract)

    reportOnTransactionEvent(instanceOfMarketplace)
})


function displayAllOwnedKities(instKittyContract){
    try {
        instKittyContract.methods.getAllYourKittyIds().call({}, function(err, myKittieIds){
            if (err) throw "Error from getAllYourKittyIds().call(): " + err
            myCatIds = myKittieIds  
            putCatsOnPage(myKittieIds, instKittyContract)
        })
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
            return false;
        }
        
        // Ensure marketplace is set as an operator
        await grantMarketplaceApproval()

        // Create a sell order in the marketplace
        const salePriceInWei = BigInt(web3.utils.toWei(salePrice, 'ether'))
        console.log(salePriceInWei)

        instanceOfMarketplace.methods.setOffer(salePriceInWei, catIds[0]).send({}, function(err, txHash){
            if (err) {
                console.log(err)
                $("#sellError").text("Failed to set sale offer in the marketplace!")
                return false
            }
            else {
                console.log(txHash)
            }
        })

        // Update kitty (in kitty pen) with a for sale notice
        // *** TODO 

    }
    catch(error){
        console.log("Error from selling(): " + error)
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
