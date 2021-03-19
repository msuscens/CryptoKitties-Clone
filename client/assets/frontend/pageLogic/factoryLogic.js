// const web3 = new Web3(Web3.givenProvider);

// let instance;
// let user;
// let contractAddress = "0xAB714687a2f21f589140e8325Dc1E212adae2F3d"

// When page loads
// $( document ).ready(function() {
//   getDefaultKittie()
// });

$(document).ready(async function(){

    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    getDefaultKittie()

        // instance.events.Birth({}, function(error, event){ console.log(event) })
        instance.events.Birth().on('data', function(event){
            console.log(event)
            const owner = event.returnValues.owner
            const kittenId = event.returnValues.kittenId
            const mumId = event.returnValues.mumId
            const dadId = event.returnValues.dadId
            const genes = event.returnValues.genes
            $("#kittyCreation").css("display", "block")
            $("#kittyCreation").text("Kitty Created!  Owner:" + owner +
                                    " Kitty ID:" + kittenId +
                                    " Mum's ID:" + mumId +
                                    " Dad's ID:" + dadId +
                                    " Genes:" + genes )
        })
        .on('error', function(error, receipt) {
            console.log("Birth Event Error")
            console.log(error)
            console.log(receipt)
        })
})


function getDefaultKittie() {
  try {
    renderCat(defaultDNA)
    updateSliders(defaultDNA)
  }
  catch (err)
  {
    console.log(`Error In getDefaultKittie(): ${err}`)
  }
}


function getRandomKittie() {
  try {
    const newDNA = {
      "headColor" : getRandomIntegerBetween(10, 98),
      "mouthColor" : getRandomIntegerBetween(10, 98),
      "eyesColor" : getRandomIntegerBetween(10, 98),
      "earsColor" : getRandomIntegerBetween(10, 98),
      //Cattributes
      "eyesShape" : getRandomIntegerBetween(0, 9),
      "decorationPattern" : getRandomIntegerBetween(0, 9),
      "decorationMidColor" : getRandomIntegerBetween(10, 98),
      "decorationSidesColor" : getRandomIntegerBetween(10, 98),
      "animation" :  getRandomIntegerBetween(0, 9),
      "lastNum" :  getRandomIntegerBetween(0, 9)
    }
    renderCat(newDNA)
    updateSliders(newDNA)
  }
  catch (err)
  {
    console.log(`Error In getRandomKittie(): ${err}`)
  }
}


function createKittie(){
  try {
    const dna = getDna()
    console.log(dna)
    instance.methods.createKittyGen0(dna).send({}, function(err, txHash){
        if (err) console.log(err)
        else console.log(txHash)
    })
  }
  catch(err){
    console.log(`Error In createKittie: ${err}`)
  }
}