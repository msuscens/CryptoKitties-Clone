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

    displayMumandDad(parents)
    onBirthEvent(displayBirth)
})


async function displayMumandDad(parents) {
    try {
        const mumCat = await getCatDetails(parents.mum.id)
        parents.mum.dna = mumCat.dna
        parents.mum.gen = mumCat.gen
        render(parents.mum, "#queen")

        const dadCat = await getCatDetails(parents.dad.id)
        parents.dad.dna = dadCat.dna
        parents.dad.gen = dadCat.gen
        render(parents.dad, "#tom")
    }
    catch (error) {
        console.log("Error from displayMumandDad(parents): " + error)
    }
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
    }
    catch (error) {
        console.log("Error from swapCats(): " + error)
    }
}


async function breed(){
    try {
        // *** Question: I assume I don't want to wait for anything that sets values in blockchain SC (otherwise it'll bock UI)! ???? 
        // *** Discuss with Kenneth ***
        breedCats(parents.mum.id, parents.dad.id)
        // await breedCats(parents.mum.id, parents.dad.id)
    }
    catch (error) {
        console.log("Error from breed(): " + error)
    }
}
