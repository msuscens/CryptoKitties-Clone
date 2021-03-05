const web3 = new Web3(Web3.givenProvider);
let instance;
let user;
let contractAddress = "0xEc31E571Ce0721b71976e1D4696b7BA5C3F051B5"

$(document).ready( function(){
    // Prompt user to allow our website to use their metamask account to interact with the blockchain
    window.ethereum.enable().then(function(accounts){
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

        console.log(instance)
    })

})