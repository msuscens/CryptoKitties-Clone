pragma solidity 0.5.12;

import "./IKittyMarketplace.sol";
import "./KittyContract.sol";
import "./Ownable.sol";

import "./Safemath.sol";
// import "./ArrayUtils.sol";

contract KittyMarketPlace is Ownable, IKittyMarketPlace {
    using SafeMath for uint256;
    // using ArrayUtils for uint256[];

    KittyContract private _kittyContract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

    Offer[] private _offers;
    mapping(uint256 => Offer) private _tokenIdToOffer;


// Public & external functions

    constructor(address kittyContractAddress) public {
        setKittyContract(kittyContractAddress);
    }

    /**
    * Set the current KittyContract address and initialize the instance of Kittycontract.
    * Requirement: Only the contract owner can call.
     */
    function setKittyContract(address kittyContractAddress)
        public
        onlyOwner
    {
        _kittyContract = KittyContract(kittyContractAddress);
    }

    /**
    * Get the details about a offer for _tokenId. Throws an error if there is no active offer for _tokenId.
     */
    function getOffer(uint256 tokenId)
        external
        view
        returns(address, uint256, uint256, uint256, bool)
    {
        //Offer storage theOffer = _tokenIdToOffer[tokenId];
        //require(theOffer != Offer(0), "Token is not on offer for sale!");
        // require(_tokenIdToOffer[tokenId] != Offer(0), "Token is not on offer for sale!");

        // If attempt to access non existance offer will throw an error !?
        return (
            _tokenIdToOffer[tokenId].seller,
            _tokenIdToOffer[tokenId].price,
            _tokenIdToOffer[tokenId].index,
            _tokenIdToOffer[tokenId].tokenId,
            _tokenIdToOffer[tokenId].active
        );
    }

    /**
    * Get all tokenId's that are currently for sale. Returns an empty arror if none exist.
     */
    function getAllTokenOnSale() external view  returns(uint256[] memory) {

        // uint256[] storage listOfOffers = new uint256[];
        uint256 totalOffers = _offers.length;
        uint256[] memory maxListOfferIds = new uint256[](totalOffers);

        uint256 i;
        uint256 activeOffers = 0;
        for (i = 0; i < totalOffers; i++){
            if (_offers[i].active == true) {
                // listOfOffers.push(_offers[i].tokenId);
                maxListOfferIds[activeOffers] = _offers[i].tokenId;
                activeOffers = activeOffers.add(1);
            }
        }

        if (activeOffers == totalOffers) return maxListOfferIds;

        // Create array of correct size
        uint256[] memory activeOfferIds = new uint256[](activeOffers);
        for (i = 0; i < activeOffers; i++) {
            activeOfferIds[i] = maxListOfferIds[i];
        }
        return activeOfferIds;
    }

    /**
    * Creates a new offer for _tokenId for the price _price.
    * Emits the MarketTransaction event with txType "Create offer"
    * Requirement: Only the owner of _tokenId can create an offer.
    * Requirement: There can only be one active offer for a token at a time.
    * Requirement: Marketplace contract (this) needs to be an approved operator when the offer is created.
     */
    function setOffer(uint256 price, uint256 tokenId) external {

        // address owner = _kittyContract.ownerOf(tokenId);
        // require(msg.sender == owner, "Only owner can offer token!");
        require(_isKittyOwner(msg.sender, tokenId), "Only owner can offer token!");
        require(_isOnOffer(tokenId) == false, "An offer already exists!");
        require(
            _kittyContract.isApprovedForAll(
                _kittyContract.ownerOf(tokenId),
                msg.sender
            ),
            "Marketplace must be an operator!"
        );

        // address payable seller = address(uint160(msg.sender));

        Offer memory newOffer = Offer(
            {
                seller: address(uint160(msg.sender)),
                price: price,
                index: _offers.length,
                tokenId: tokenId,
                active: true
            }
        );
        _offers.push(newOffer);
        _tokenIdToOffer[tokenId] = newOffer;

        emit MarketTransaction("Create offer", owner, tokenId);
    }

    /**
    * Removes an existing offer.
    * Emits the MarketTransaction event with txType "Remove offer"
    * Requirement: Only the seller of _tokenId can remove an offer.
     */
    function removeOffer(uint256 tokenId) external {

        require(_isOnOffer(tokenId) == true, "Active offer doesn't exist!");
        address seller = _tokenIdToOffer[tokenId].seller;
        require(msg.sender == seller, "Only seller can remove offer!");

        _removeOffer(tokenId);

        emit MarketTransaction("Remove offer", seller, tokenId);
    }

    /**
    * Executes the purchase of _tokenId.
    * Sends the funds to the seller and transfers the token using transferFrom in Kittycontract.
    * Emits the MarketTransaction event with txType "Buy".
    * Requirement: The msg.value needs to equal the price of _tokenId
    * Requirement: There must be an active offer for _tokenId
     */
    function buyKitty(uint256 tokenId) external payable {
        Offer memory tokenOffer = _tokenIdToOffer[tokenId];
        require(_isOnOffer(tokenId) == true, "Active offer doesn't exist!");
        require(msg.value >= tokenOffer.price, "Token purchase price not sent!");

        _removeOffer(tokenId);

        _kittyContract.safeTransferFrom(tokenOffer.seller, msg.sender, tokenId);

        emit MarketTransaction("Buy", tokenOffer.seller, tokenId);
    }


// Internal & private functions

    function _isKittyOwner(address claimant,uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return(_kittyContract.ownerOf(tokenId) == claimant);
    }


    function _isOnOffer(uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return(_tokenIdToOffer[tokenId].active == true);
    }


    function _removeOffer(uint256 tokenId) internal {
        Offer memory toBeRemoved = _tokenIdToOffer[tokenId];

        //delete _tokenIdToOffer[tokenId];
        // delete _offers[toBeRemoved.index];  // This leaves an empty element in the array ...

        // Alternative overwrite the deleted offer with the last offer in the array (so that array doesn't contain empty offer element)
        // Note: This requires the last offer in the array (that is moved) to have it's offer index updated to new array position,
        // and likewise the mapping's same offer record will need its index field updated.

        uint256 lastIndex = _offers.length.sub(1);
        if (toBeRemoved.index < lastIndex) { // not the last offer in the array
            // Move last offer (in array) to overwrite the offer to be removed
            Offer memory lastOffer = _offers[lastIndex];
            lastOffer.index = toBeRemoved.index;       // poisition to which last offer record will be moved
            _offers[toBeRemoved.index] = lastOffer;    // overwrite offer to be removed (with last offer record) 
            _tokenIdToOffer[lastOffer.tokenId] = lastOffer; // Update record in the token mapping 
        }
        _offers.pop();   // remove last offer record (now redundant as moved, or is the offer to be removed)
        delete _tokenIdToOffer[toBeRemoved.tokenId];   
    }

}

