Assignement Week 9 Day 4: Implement a Kitty Marketplace Contract
 - Download the interface IKittyMarketplace'.sol (from the download section on the right). Extract the zip file to get the .sol file and add it to your project.
 - Implement the KittyMarketPlace.sol


Assignment Week 9 Day 3: Implement More Randomness
Regardless if you have the simple or advanced DNA/Gene algorithm, I want you to make some modifications. After you made these modifications, please hand in your code for today in Google Classroom in the assignment Day 3 Hand in.
    i. For those of you that have kept the simple algorithm:  Add one more level of mixing into your algorithm. Get creative and see if you can find some other way of mixing the DNA's instead of just combining the two halves. 

    ii. For those of you that built the advanced algorithm: I mentioned in the last video that you can implement even more randomness to spice things up even more. That's exactly what I want you to do. Take the random number we calculated in the previous video, and use it to select one of the pairs that will get an extra randomness treatment. Then generate a new, 2 digit, random number and set it as that pair. That DNA pair will now be completely random, independent from any parent. 

Assignment Week 9 Day 2: DNA Mixing
1. Backend contract: Write a breed() function:
    - This should REVERT if the sender does not own the mom or dad kitties.
    - Use the _mixDna() function to get the DNA of the new kitten.
    - Determine the generation of the new kitten
    - Transfer the new kitten to the sender.
2. Frontend: Add a Breed page:
    - Navigation bar link to the new breed page.
    - Select mom & dad kitties.
    - Should not be able to select the same kitty for both the mom and dad.
    - Button to breed.
    - Should display a message notifying the user of the Birth event and display the new kitten.

Assignment Week 9 Day 1: ERC712 Fullfilment - Approval
1. Download the new IERC721 interface from this page (on the right), and replace the IERC721.sol in your project with this new interface.
2. Implement IERC721 functions: approve, setApprovalForAll, getApproved, and isApprovedForAll.
3. Implement IERC721 functions: safeTransferFrom (with and without the data parameter).
4. Implement the supportsInterface function for ERC721 and ERC165.  

Assignment Week 8 : Day 3 -5 - Cat Website Assignment
1. Add a function in your smart contract that retrieves all cat id's owned by the msg.sender. 
2. Add a page where you can see all the cats that you own. The cat's should be displayed visually.
3. Add a navigation bar to your page where you can navigate between the different pages of your site.
Bonus Assignment
4. Create a good looking, attractive Home page to your site.

Assignment Week 8 : Day2
1. Add in web3.js to allow website connection to blockchain via MetaMask (test account with test ETH)
2. Link-up UI's Create Kittie button to send the transaction (to create a kitty on the blockchain)
3. Set an event listener for the kittie's Birth event, and output the Birth event details (kitties details)
to the user (via the GUI).

Assignment Week 8: Day 1 - Create new Kitty (Building upon previous assignments - see below)
1. Write a public createKittyGen0(uint256 _genes) function, that employs a private _createkitty function.
2. Ensure that createKittyGen0() can only be called by the contract owner.
3. Get Kitty  - Part 2 is to Implement a getKitty() function in the contract. It should take a kitty id and return all the information on that kitty.
4. Check your solution via truffle migrate, and then use the console to create a gen0 kitty on the deployed contract instance, get the first kitty from the contract and check it's attribute values such as genes.


Assignment Week 7: Day 5
1. Take your front-end Kitties code (that you developed throughout Week 7)
2. Initialise Truffle
3. Download and add the IERC721.sol interface file (into contracts folder)
4. Add a Kitty contract that inherits from it.
5. Implement the IERC721 interface functions into the Kitty contract, with any required state variables etc.
6. Add a token migration file to deploy the contract.





