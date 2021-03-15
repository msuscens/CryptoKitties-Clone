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





