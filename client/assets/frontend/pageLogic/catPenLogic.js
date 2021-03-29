let myCatIds = [];

// When page loads
$(document).ready(async function(){
    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    DisplayAllOwnedKities()
})


function DisplayAllOwnedKities(){
    try {
        instance.methods.getAllYourKittyIds().call({}, function(err, myKittieIds){
            if (err) throw "Error from getAllYourKittyIds().call(): " + err

            myCatIds = myKittieIds  

            for (let i=0; i<myKittieIds.length; i++) {
                // Get the cat's details
                const cat = {
                    id: myKittieIds[i],
                    dna: undefined,
                    gen: undefined
                }
                instance.methods.getKitty(cat.id).call({}, function(errMsg, kitty){
                    if (errMsg) throw "Error from getKitty(cat.id).call(): " + errMsg

                    //Put the cat on the page (displayed according to its dna)
                    let htmlKitty = getHtmlForKitty(cat.id) 
                    $('#rowOfCats').append(htmlKitty)
                    cat.dna = getKittyDna(kitty.genes)
                    cat.gen = kitty.generation
                    render(cat, `#kitty${cat.id}`)
                })
            }
        })
    }
    catch(error){
        console.log("In DisplayAllOwnedKities(): " + error)
    }
}


function getHtmlForKitty(id){
    try {
        let html = `
            <div id="kitty${id}" class="col-lg-4 catBox m-2 light-b-shadow">
            <div class="catCheckBox custom-control custom-checkbox checkbox-xl">
                <input type="checkbox" class="custom-control-input" id="CheckBoxCat-${id}">
                <label class="custom-control-label" for="CheckBoxCat-${id}"></label>
            </div>
        
            <div id="cat" class="cat">
                <div class="cat__ear">
                    <div id="leftEar" class="cat__ear--left">
                        <div class="cat__ear--left-inside"></div>
                    </div>
                    <div id="rightEar" class="cat__ear--right">
                        <div class="cat__ear--right-inside"></div>
                    </div>
                </div>

                <div id="head" class="cat__head">
                    <div id="midDot" class="cat__head-dots">
                        <div id="leftDot" class="cat__head-dots_first"></div>
                        <div id="rightDot" class="cat__head-dots_second"></div>
                    </div>
                    <div id="eyes" class="cat__eye">
                        <div class="cat__eye--left">
                            <span class="pupil-left"></span>
                        </div>
                        <div class="cat__eye--right">
                            <span class="pupil-right"></span>
                        </div>
                    </div>
                    <div id="nose" class="cat__nose"></div>

                    <div class="cat__mouth-contour"></div>
                    <div class="cat__mouth-left"></div>
                    <div class="cat__mouth-right"></div>

                    <div id="leftWhiskers" class="cat__whiskers-left"></div>
                    <div id="rightWhiskers" class="cat__whiskers-right"></div>
                </div>

                <div class="cat__body">

                    <div class="cat__chest"></div>
                    <div class="cat__chest_inner"></div>

                    <div id="leftRearPaw" class="cat__paw-left_rear"></div>
                    <div id="leftFrontPaw" class="cat__paw-left_front"></div>

                    <div id="rightFrontPaw" class="cat__paw-right_front"></div>
                    <div id="rightRearPaw" class="cat__paw-right_rear"></div>

                    <div id="tail" class="cat__tail"></div>
                </div>
            </div>
            <br>
            <div class="genDiv">
                <p><b>GEN: <span id="catGenNum">0</span></b></p>
            </div>
            <div class="dnaDiv" id="catDNA">
                <b>
                    DNA:
                    <!-- Colors -->
                    <span id="dnabody"></span>
                    <span id="dnamouth"></span>
                    <span id="dnaeyes"></span>
                    <span id="dnaears"></span>
                    
                    <!-- Cattributes -->
                    <span id="dnashape"></span>
                    <span id="dnadecoration"></span>
                    <span id="dnadecorationMid"></span>
                    <span id="dnadecorationSides"></span>
                    <span id="dnaanimation"></span>
                    <span id="dnaspecial"></span>
                </b>
            </div>
        </div>`
        return(html)
    }
    catch (error) {
        console.log("In getHtmlForKitty(id): " + error)
    }
}


function breeding(){
    try {
        let catIds = getSelectedCatIds(myCatIds)

        // Check two cats (and only 2) are selected
        if (catIds.length < 2) {
            $("#selectError").text("Use check boxes to select two kitties!")
            $("#selectError").css({'color': 'red', 'font-weight': 'bold'})
            return false
        }
        if (catIds.length > 2) {
            $("#selectError").text("Too many kitties! Please select only two!")
            $("#selectError").css({'color': 'red', 'font-weight': 'bold'})
            return
        } 
        // remove any prior error mesage
        $("#selectError").text("")
        $("#selectError").css({'color': 'black', 'font-weight': 'normal'})
        
        // Go to the Breed page
        window.location.href =
            `breed.html?firstCatId=${catIds[0]}&secondCatId=${catIds[1]}`
    }
    catch(error){
        console.log("Error from breeding(): " + error)
    }
}


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