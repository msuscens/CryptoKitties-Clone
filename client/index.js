const web3 = new Web3(Web3.givenProvider);
// console.log(web3.version)

let instance;
let user;
let contractAddress = "0x40DD68392b435831EF98F5CA9d7196B80db4aA3B"

$(document).ready( function(){
    // Prompt user to allow our website to use their metamask account to interact with the blockchain
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

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
})

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