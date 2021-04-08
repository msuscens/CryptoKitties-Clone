// Kitties that are to breed
const parents = {
    mum: {
        id: parseInt(getParamFromUrl(window.location.href, "?firstCatId=")),
        dna: undefined,
        gen: undefined
    },
    dad: {
        id: parseInt(getParamFromUrl( window.location.href, "&secondCatId=")),
        dna: undefined,
        gen: undefined
    }
}

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kitty SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    displayMumandDad(instanceOfKittyContract, parents)

    reportOnBirthEvent(instanceOfKittyContract)
})


function displayMumandDad(instance, parents) {
    instance.methods.getKitty(parents.mum.id).call({}, function(errMsg, kitty){
        if (errMsg) throw "Error from getKitty(parents.mum.id).call(): " + errMsg
        parents.mum.dna = getKittyDna(kitty.genes)
        parents.mum.gen = kitty.generation
        render(parents.mum, "#queen")
    })
    instance.methods.getKitty(parents.dad.id).call({}, function(errMsg, kitty){
        if (errMsg) throw "Error from getKitty(parents.dad.id).call(): " + errMsg
        parents.dad.dna = getKittyDna(kitty.genes)
        parents.dad.gen = kitty.generation
        render(parents.dad, "#tom")
    })
}


function swapCats(){
    try {
        // swap the parent's roles
        const tempMum = parents.mum
        parents.mum = parents.dad
        parents.dad = tempMum;

        //Update the display (to show cats with their new roles)
        render(parents.mum, "#queen")
        render(parents.dad, "#tom")

    } catch (error) {
        console.log("Error from swapCats(): " + error)
    }
}


function breed(){
    try {
        instanceOfKittyContract.methods.breed(parents.mum.id, parents.dad.id).send({}, function(err, txHash){
            if (err) console.log(err)
            else console.log(txHash)
        })
    } catch (error) {
        console.log("Error from breed(): " + error)
    }
}
