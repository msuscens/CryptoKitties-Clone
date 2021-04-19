// When page loads
$(document).ready(async function() {
    render(defaultCat)

    // Connect website to user's metamask (to allow interaction with Kittie SC)
    const connected = await initiateConnection()
    if (connected != true) console.log("Not connected to contract")

    // Make Kitty-Factory only accessable to KittyContract owner
    await isOwnerOfKittyContract() ? showFactoryLink() : hideFactoryLink()  
})
