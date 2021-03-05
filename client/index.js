const web3 = new Web3(Web3.givenProvider);
let instance;
let user;
let contractAddress = "0x40DD68392b435831EF98F5CA9d7196B80db4aA3B"

$(document).ready( function(){
    // Prompt user to allow our website to use their metamask account to interact with the blockchain
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

        console.log(instance)
    })

})

function createKittie(){
    const dna = getDna();
    instance.methods.createKittyGen0(dna).send({}, function(err, txHash){
        if (err) console.log(err)
        else console.log(txHash)
        
    })
}