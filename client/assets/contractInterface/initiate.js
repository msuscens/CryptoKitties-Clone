
const web3 = new Web3(Web3.givenProvider);
// console.log(web3.version)

const KITTY_CONTRACT_ADDRESS = "0x02e260B27fBC4e4A9A0A9e79E04b1c0138c34e65"
const MARKETPLACE_ADDRESS = "0x933Ac90f693c32c4Ad6052bdeA826b24B7dB22b3"

let instanceOfKittyContract
let instanceOfMarketplace


let user

async function initiateConnection(){
    try {
        // Prompt user to allow our website to use their metamask account to interact with the blockchain
        // window.ethereum.enable().then(function(accounts){
        //     instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        //     user = accounts[0]
        // })

        let accounts = await window.ethereum.enable()
        instanceOfKittyContract = new web3.eth.Contract(abi.kittyContract, KITTY_CONTRACT_ADDRESS, {from: accounts[0]})
        instanceOfMarketplace = new web3.eth.Contract(abi.marketplace, MARKETPLACE_ADDRESS, {from: accounts[0]})
        user = accounts[0]

        if (user.length > 0) {
            console.log("Connected with account :" + user)
            return true
        }
    }
    catch (err) {
         console.log("Error from initiateConnection(): " + err)
         return false
    }
}



async function grantMarketplaceApproval(){
    try {
        const isMarketplaceAnOperator = await instanceOfKittyContract.methods.isApprovedForAll(user, MARKETPLACE_ADDRESS).call()

        if (isMarketplaceAnOperator == false) {

            await instanceOfKittyContract.methods.setApprovalForAll(MARKETPLACE_ADDRESS, true).send({}, function(err, txHash){
                if (err) console.log(err)
                else console.log(txHash)
            })

/* Filips code - investiage what he's doing here with .on('receipt' ... can't see code beyond that point, is there an extra parameter??
            await instanceOfKittyContract.methods.setApprovalForAll(MARKETPLACE_ADDRESS, true).send().on('receipt', function(receipt) {
                // tx done
                console.log("tx done");
                getInventorty()
            })
*/
        }
    }
    catch (err) {
         console.log("Error from grantMarketplaceApproval(): " + err)
         return false
    }
}