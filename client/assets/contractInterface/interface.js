
const web3 = new Web3(Web3.givenProvider);
// console.log(web3.version)

const KITTY_CONTRACT_ADDRESS = "0x02e260B27fBC4e4A9A0A9e79E04b1c0138c34e65"
const MARKETPLACE_ADDRESS = "0x933Ac90f693c32c4Ad6052bdeA826b24B7dB22b3"

let Instance_Of_KittyContract
let Instance_Of_Marketplace
let User

async function initiateConnection(){
    try {
        // Prompt user to allow our website to use their metamask account to interact with the blockchain
        // window.ethereum.enable().then(function(accounts){
        //     instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]})
        //     user = accounts[0]
        // })

        let accounts = await window.ethereum.enable()
        Instance_Of_KittyContract = new web3.eth.Contract(abi.kittyContract, KITTY_CONTRACT_ADDRESS, {from: accounts[0]})
        Instance_Of_Marketplace = new web3.eth.Contract(abi.marketplace, MARKETPLACE_ADDRESS, {from: accounts[0]})
        User = accounts[0]

        if (User.length > 0) {
            console.log("Connected with account :" + User)
            return true
        }
    }
    catch (err) {
         console.log("Error from initiateConnection(): " + err)
         return false
    }
}


function isUser(address) {
    try {
        if (String(address).toLowerCase() !== String(User).toLowerCase()) return false
        return true
    }
    catch (err) {
        console.log("Error from isUser(address): " + err)
    }
}


// KittyContract Events

function reportOnBirthEvent(uiCallbackFunc) {
    Instance_Of_KittyContract.events.Birth().on('data', function(event){

        uiCallbackFunc(event.returnValues)
    })
    .on('error', function(error, receipt) {
        console.log("Birth Event Error")
        console.log(error)
        console.log(receipt)
    })
}


// KittyContract Interface functions

async function getAllYourCatIds() {
    try {
        console.log("In getAllYourCatIds()")
        let catIds = []
        await Instance_Of_KittyContract.methods.getAllYourKittyIds().call({}, function(err, idsTokens){
            if (err) throw "Error from getAllYourKittyIds().call(): " + err
            catIds = idsTokens
        })
        return catIds
    }
    catch (error) {
        console.log("In getAllYourCatIds(): " + error)
    }
}


async function getDetailsAllCats(catIds) { 
    try {
        let allCats = []
        for (let i = 0; i < catIds.length; i++) {
            const cat = await getCatDetails(catIds[i])
            allCats.push(cat)
        }
        return allCats
    }
    catch (error) {
        console.log("Error from getDetailsAllCats(catIds): " + error)
    }
}


async function getCatDetails(catId) {
    try {
        const cat = {
            id: catId,
            genes: undefined,
            gen: undefined,
            mumId: undefined,
            dadId: undefined,
            birthTime: undefined,
            dna: undefined  // added dna object (required by front-end)
        }

        await Instance_Of_KittyContract.methods.getKitty(catId).call({}, function(errMsg, kitty){
            if (errMsg) throw "Error from getKitty(catId).call(): " + errMsg
            // cat.dna = getKittyDna(kitty.genes)
            cat.genes = kitty.genes
            cat.birthTime = kitty.birthTime
            cat.mumId = kitty.mumId
            cat.dadId = kitty.dadId
            cat.gen = kitty.generation
        })
        // Add further info as required by UI
        cat.dna = getKittyDna(cat.genes)

        return cat
    }
    catch (error) {
        console.log("Error from getCatDetails(catId): " + error)
    }
}


async function breedCats(mumId, dadId){
    try {
        await Instance_Of_KittyContract.methods.breed(mumId, dadId).send({}, function(err, txHash){
            if (err) throw "Error returned from 'Instance_Of_KittyContract.methods.breed(mumId, dadId).send({}': " + err
            else {
                console.log(txHash)
                return txHash
            }
        })
    }
    catch (error) {
        console.log("In breedCats(): " + error)
    }        
}



// Marketplace Contract Events

function reportOnTransactionEvent(uiCallbackFunc) {
    Instance_Of_Marketplace.events.MarketTransaction().on('data', function(event){
        uiCallbackFunc(event.returnValues)
    })
    .on('error', function(error, receipt) {
        console.log("Market Transaction Event Error")
        console.log(error)
        console.log(receipt)
    })
}


// Marketplace Contract Interface functions

async function getAllCatIdsOnSale() {
    try {
        let catIdsOnSale = []
        await Instance_Of_Marketplace.methods.getAllTokenOnSale().call({}, function(err, idsTokensOnSale){
            if (err) throw "Error from getAllTokenOnSale().call(): " + err
            catIdsOnSale = idsTokensOnSale
        })
        return catIdsOnSale
    }
    catch (error) {
        console.log("In getAllCatIdsOnSale(): " + error)
    }
}


async function getDetailsOfAllCatsForSale(catIds) {
    try {
        let allCatsForSale = []

        for (let i = 0; i < catIds.length; i++) {
            const cat = await getCatDetails(catIds[i])
            const forSale = await getForSaleDetails(catIds[i])
            const catForSale = {...cat, ...forSale}
            allCatsForSale.push(catForSale)
        }
        return allCatsForSale
    }
    catch (error) {
        console.log("Error from getDetailsOfAllCatsForSale(catIds): " + error)
    }
}


async function getForSaleDetails(catId) {
    try {
        const forSaleDetails = {
            id: undefined,
            sellerAddress: undefined,
            priceInWei: undefined,
            active: undefined,
            price: undefined
        }
         
        await Instance_Of_Marketplace.methods.getOffer(catId).call({}, function(errMsg, offer){
            if (errMsg) throw "Error from getOffer(catId).call(): " + errMsg
            if (catId != offer.tokenId ) throw "Internal error - tokenId returned by getOffer(catId) doesn't match catId!?"

            forSaleDetails.id = offer.tokenId
            forSaleDetails.sellerAddress = offer.seller
            forSaleDetails.priceInWei = offer.price
            forSaleDetails.active = offer.active

            // Convert wei price to ether
            forSaleDetails.price = web3.utils.fromWei(offer.price, 'ether')
        })

        return forSaleDetails
    }
    catch (error) {
        console.log("Error from getForSaleDetails(catId): " + error)    
    }
}


async function setMarketplaceApproval(){
    try {
        const isMarketplaceAnOperator = await Instance_Of_KittyContract.methods.isApprovedForAll(user, MARKETPLACE_ADDRESS).call()

        if (isMarketplaceAnOperator == false) {
            await Instance_Of_KittyContract.methods.setApprovalForAll(MARKETPLACE_ADDRESS, true).send({}, function(err, txHash){
                if (err) console.log(err)
                else console.log(txHash)
            })

/* Filips code - investiage what he's doing here with .on('receipt' ... can't see code beyond that point, is there an extra parameter??
            await Instance_Of_KittyContract.methods.setApprovalForAll(MARKETPLACE_ADDRESS, true).send().on('receipt', function(receipt) {
                // tx done
                console.log("tx done");
                getInventorty()
            })
*/
        }
    }
    catch (err) {
         console.log("Error from setMarketplaceApproval(): " + err)
         return false
    }
}


async function setForSale(catId, salePriceInWei) {
    try {
        await Instance_Of_Marketplace.methods.setOffer(salePriceInWei, catId).send({}, function(err, txHash){
            if (err) {
                throw(err)
            }
            else {
                console.log(txHash)
                // return txHash;
            }
        })
    }
    catch (err) {
        console.log("Error from setForSale(catId, salePriceInWei): " + err)
    }
}


async function buyKitty(tokenId, priceInWei) {
    try {
        // const amount = web3.utils.toWei(price, "ether")
        await Instance_Of_Marketplace.methods.buyKitty(tokenId).send({value: priceInWei}, function(err, txHash){
            if (err) {
                throw(err)
            }
            else {
                console.log(txHash)
                // return txHash;
            }
        })
    }
    catch (err) {
        console.log("Error from buyKitty(tokenId): " + err)
    }
}