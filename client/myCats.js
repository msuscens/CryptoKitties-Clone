const web3 = new Web3(Web3.givenProvider);

let instance;
let user;
let contractAddress = "0x4C0bB08B46C3a15332b51b95782BbaACEd7Ff469"

$(document).ready( function(){
    // Prompt user to allow our website to use their metamask account to interact with the blockchain
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

        // Get the ids of all the cats that you own
        instance.methods.getAllYourKittyIds().call({}, function(err, myKittieIds){
            try {
                if (err) throw "Error from getAllYourKittyIds().call(): " + err

                // Display all the cats
                for (let i=0; i<myKittieIds.length; i++) {
                    // Get the cat's details
                    instance.methods.getKitty(myKittieIds[i]).call({}, function(err, kitty){
                        if (err) throw "Error from getKitty(myKitties[i]).call(): " + err

                        //Put the cat on the page
                        htmlKitty = getHtmlForKitty(myKittieIds[i]) 
                        $('#rowOfCats').append(htmlKitty)

                        if (kitty.genes.length != 16) throw
                            `Internal error: genes string ('${kitty.genes}') should be 16 characters (not ${kitty.genes.length})`
                        const kittyDna = {
                            "headColor" : kitty.genes.substring(0, 2),
                            "mouthColor" : kitty.genes.substring(2, 4),
                            "eyesColor" : kitty.genes.substring(4, 6),
                            "earsColor" : kitty.genes.substring(6, 8),
                            "eyesShape" : parseInt( kitty.genes.substring(8, 9) ),
                            "decorationPattern" : parseInt( kitty.genes.substring(9, 10) ),
                            "decorationMidColor" : kitty.genes.substring(10, 12),
                            "decorationSidesColor" : kitty.genes.substring(12, 14),
                            "animation" : parseInt( kitty.genes.substring(14, 15) ),
                            "lastNum" : parseInt( kitty.genes.substring(15, 16) )
                          }

                          renderCat(kittyDna, `#kitty${myKittieIds[i]}`)
                    })
                }
            }
            catch(err){
                console.log(err)
            }
        })

    })
})

function getHtmlForKitty( id ){
    try {
        let html = `
            <div id="kitty${id}" class="col-lg-4 catBox m-2 light-b-shadow">
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
        </div>
        `
        return(html)
    }
    catch(err){
        console.log(err)
    }

}