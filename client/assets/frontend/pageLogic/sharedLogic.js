       

function getKittyDna(genes){
    try {
        if (genes.length != 16) throw `genes string ('${genes}') should be 16 characters (not ${genes.length})`

        const kittyDna = {
            "headColor" : genes.substring(0, 2),
            "mouthColor" : genes.substring(2, 4),
            "eyesColor" : genes.substring(4, 6),
            "earsColor" : genes.substring(6, 8),
            "eyesShape" : parseInt( genes.substring(8, 9) ),
            "decorationPattern" : parseInt( genes.substring(9, 10) ),
            "decorationMidColor" : genes.substring(10, 12),
            "decorationSidesColor" : genes.substring(12, 14),
            "animation" : parseInt( genes.substring(14, 15) ),
            "lastNum" : parseInt( genes.substring(15, 16) )
        }
        return(kittyDna)
    }
    catch(error) {
        console.log("Error from getKittyDna(genes): " + error)
    }
}


function reportOnBirthEvent() {
    // instance.events.Birth({}, function(error, event){ console.log(event) })
    instance.events.Birth().on('data', function(event){
        const owner = event.returnValues.owner
        const kittenId = event.returnValues.kittenId
        const mumId = event.returnValues.mumId
        const dadId = event.returnValues.dadId
        const genes = event.returnValues.genes
        const generation = event.returnValues.generation
        $("#kittyCreation").css("display", "block")
        $("#kittyCreation").text("A new kitty is born!  Kitty ID:" + kittenId +
                                "\nGenes:" + genes +
                                "\nMum's ID:" + mumId +
                                " Dad's ID:" + dadId +
                                " Generation:" + generation +
                                "\nOwner:" + owner)
    })
    .on('error', function(error, receipt) {
        console.log("Birth Event Error")
        console.log(error)
        console.log(receipt)
    })
}


// *** TODO - MOVE INTO SHARED CODE - SHARED WITH KITTY PEN (SO REMOVE ALSO FROM KITTY PEN LOGIC JS FILE)
function toggleCheckBox(id){
    $(id).prop("checked") ? $(id).prop("checked", false) : $(id).prop("checked",true)
}


// *** TODO - MOVE INTO SHARED CODE - SHARED WITH KITTY PEN (SO REMOVE ALSO FROM KITTY PEN LOGIC JS FILE)
function getSelectedCatIds(catIds){
    try {
        let IdsSelectedCats = []
        for (i=0; i<catIds.length; i++){
            let idCheckBox = "#CheckBoxCat-" + catIds[i]
            if ($(idCheckBox).prop("checked"))
                IdsSelectedCats.push(catIds[i])
        }
        return IdsSelectedCats
    }
    catch(error) {
        console.log("Error from getSelectedCatIds(catIds): " + error)
    }
}

