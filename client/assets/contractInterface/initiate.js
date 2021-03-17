/*
const web3 = new Web3(Web3.givenProvider);
// console.log(web3.version)

const contractAddress = "0xAB714687a2f21f589140e8325Dc1E212adae2F3d"

let instance
let user

async function initiateConnection(){
    try {
        // Prompt user to allow our website to use their metamask account to interact with the blockchain
        // window.ethereum.enable().then(function(accounts){
        //     instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        //     user = accounts[0]
        // })

        let accounts = await window.ethereum.enable()
        instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        user = accounts[0]

    }
    catch (err) {
         console.log("Error from initiateConnection(): ")
    }
}
*/