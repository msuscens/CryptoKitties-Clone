
const web3 = new Web3(Web3.givenProvider);
// console.log(web3.version)

const contractAddress = "0x988169d87167A80adCBe647BcE6008E532f3c89B"

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

        if (user.length > 0) {
            console.log("Connected with account :" + user)
            return true
        }
    }
    catch (err) {
         console.log("Error from initiateConnection(): ")
         return false
    }
}
