pragma solidity 0.5.12;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Safemath.sol";
import "./Ownable.sol";
import "./ArrayUtils.sol";

contract KittyContract is IERC721, Ownable {

    using SafeMath for uint256;
    using ArrayUtils for uint256[];

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint64 mumId;
        uint64 dadId;
        uint64 generation;
    }

    bytes4 internal constant _ERC721_RECEIVED =
        bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;
    // Note: bytes4(keccak256('supportsInterface(bytes4) == 0x01ffc9a7'));

    uint64 private constant _GEN0_LIMIT = 10;
    uint256 private _gen0KittiesCount;
    string private _name;
    string private _symbol;

    Kitty[] private _kitties;  
    mapping(uint256 => address) private _kittiesOwner;
    mapping(address => uint256) private _ownersKittyCount;
    mapping(address => uint256[]) private _ownersKittyIds;

    mapping(uint256 => address) private _kittiesApprovedOperator;
    mapping(address => mapping(address => bool)) private _ownersApprovedOperators;


    event Birth(
        address owner,
        uint256 kittenId,
        uint256 mumId,
        uint256 dadId,
        uint256 genes
    );


// Public & external functions

    constructor(string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
    }


    function createKittyGen0(uint256 genes) public onlyOwner {
        require(_gen0KittiesCount < _GEN0_LIMIT, "Hit Gen0 creation limit!");
        _gen0KittiesCount = _gen0KittiesCount.add(1);
        _createKitty( 0, 0, 0, genes, msg.sender);
    }


    function getKitty(uint256 kittyId) external view returns (
        uint256 genes,
        uint64 birthTime, 
        uint64 mumId,
        uint64 dadId,
        uint64 generation
    )
    {
        require(_isInExistance(kittyId), "No such kitty id!");
        
        return (
            _kitties[kittyId].genes, 
            _kitties[kittyId].birthTime,
            _kitties[kittyId].mumId, 
            _kitties[kittyId].dadId, 
            _kitties[kittyId].generation
        );
    }


    function getAllYourKittyIds() external view returns(uint256[] memory) {
        // Set pointer to owners array of kitty Ids
        return _ownersKittyIds[msg.sender];
    }


    // IERC165 function implementations
    function supportsInterface(bytes4 interfaceId) public pure returns (bool) {
        return (
            interfaceId == _INTERFACE_ID_ERC721 ||
            interfaceId == _INTERFACE_ID_ERC165
        );
    }


    // IERC721 function implementations

    function balanceOf(address owner) external view returns (uint256 balance) {
        return _ownersKittyCount[owner];
    }


    function totalSupply() external view returns (uint256 total) {
        return _kitties.length;
    }


    function name() external view returns (string memory tokenName) {
        return _name;
    }


    function symbol() external view returns (string memory tokenSymbol) {
        return _symbol;
    }


    function ownerOf(uint256 tokenId) external view returns (address owner) {
        require(_isInExistance(tokenId), "Token does not exist!");

        return _kittiesOwner[tokenId];
    }


    function transfer(address to, uint256 tokenId) external {
        // Checks
        require(_isNotZero(to), "Recipient's address is zero!");
        require(to != address(this), "Recipient is contract address!");
        require(_isOwner(msg.sender, tokenId), "Sender is not token owner!");

        // Effects - Transfer token
        _transfer(msg.sender, to, tokenId);
    }


    function approve(address approved, uint256 tokenId) external {
        require(
            _isOwner(msg.sender, tokenId) ||
            _isOperator(_kittiesOwner[tokenId], msg.sender),
            "Not token owner, nor operator!"
        );
        require(_isNotZero(approved), "0 address can't be an approver!");   // Additional check

        _approve(msg.sender, approved, tokenId);
    }


    function setApprovalForAll(address operator, bool approved) external {
        require(operator != msg.sender);
        _setApprovalForAll(msg.sender, operator, approved);
    }


    function getApproved(uint256 tokenId) external view returns (address) {
        require(_isInExistance(tokenId), "Token does not exist!");

        return _kittiesApprovedOperator[tokenId];
    }


    function isApprovedForAll(address owner, address operator)
        external
        view
        returns (bool)
    {
        return _isOperator(owner, operator);
    }


    function safeTransferFrom(
        address from, 
        address to, 
        uint256 tokenId, 
        bytes calldata data
    )
        external
    {  
        _safeTransferFrom(msg.sender, from, to, tokenId, data);
    }


    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    )
        external
    {
        _safeTransferFrom(msg.sender, from, to, tokenId, "");
    }


    function transferFrom(address from, address to, uint256 tokenId) external {
        require(
            _isOwnerOrApproved(msg.sender, from, to, tokenId),
            "No authority to transfer token!"
        );
        _transfer(from, to, tokenId);
    }


// Internal & private functions

    function _isOwnerOrApproved(
        address sender,
        address from,
        address to,
        uint256 tokenId
    )
        internal
        view
        returns (bool)
    {
        require(_isOwner(from, tokenId), "'from' doesn't own token!");
        require(_isNotZero(to), "Recipient's address is zero!");
        require(_isInExistance(tokenId), "Token doesn't exist!");

        return (
            _isOwner(sender, tokenId) ||
            _isOperator(_kittiesOwner[tokenId], sender) ||
            _isApproved(sender, tokenId)
        );
    }


    function _isNotZero(address candidate)
        internal
        pure
        returns (bool notZero)
    {
        return (candidate != address(0));
        // notZero = (candidate != address(0));     // Q. Consider my prefered 'return' method!?
    }


    function _isOwner(address claimer, uint256 tokenId)
        internal
        view
        returns (bool owner)
    {
        return (_kittiesOwner[tokenId] == claimer);
        // owner = (_kittiesOwner[tokenId] == claimer);     // Q. Consider my prefered 'return' method!?
    }


    function _isOperator(address owner, address candidate)
        internal
        view
        returns (bool operator)
    {
        return _ownersApprovedOperators[owner][candidate];
    }


    function _isApproved(address candidate, uint256 tokenId)
        internal
        view
        returns (bool approved)
    {
        // approved = (candidate == _kittiesApprovedOperator[tokenId]);  // Q. Consider my prefered 'return' method!?
        return (candidate == _kittiesApprovedOperator[tokenId]);
    }


    function _isInExistance(uint256 tokenId)
        internal
        view
        returns (bool exists)
    {
        return (tokenId < _kitties.length);
    }


    function _transfer(address from, address to, uint256 tokenId) internal {

        if (_isNotZero(from)){
            // Take kittie token from the sender
            delete _kittiesApprovedOperator[tokenId];
            _ownersKittyIds[from].removeFrom(tokenId);
            _ownersKittyCount[from] = _ownersKittyCount[from].sub(1);
        }

        // Give token to the receiver
        _ownersKittyIds[to].push(tokenId);
        _ownersKittyCount[to] = _ownersKittyCount[to].add(1);
        _kittiesOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }


    function _safeTransferFrom(
        address sender, 
        address from, 
        address to, 
        uint256 tokenId, 
        bytes memory data
    )
        internal
    {
        require(
            _isOwnerOrApproved(sender, from, to, tokenId),
            "No authority to transfer token!"
        );
        
        _safeTransfer(from, to, tokenId, data);
    }


    function _safeTransfer(
        address from, 
        address to, 
        uint256 tokenId, 
        bytes memory data
    )
        internal 
    {
        _transfer(from, to, tokenId);
        require(_checkERC721Support(from, to, tokenId, data));
    }


    function _approve(
        address grantor,
        address approved,
        uint256 tokenId
    )
        internal
    {
        _kittiesApprovedOperator[tokenId] = approved;
        emit Approval(grantor, approved, tokenId);
    }


    function _setApprovalForAll(
        address owner,
        address operator,
        bool approved
    )
        internal
    {
        _ownersApprovedOperators[owner][operator] = approved;
        emit ApprovalForAll(owner, operator, approved);
    }


    function _checkERC721Support(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    )
        internal
// Q.       view // Not view because it could potentailly modify state -HOW? (eg. if called external contract called back???)
        returns (bool)
    {
        if (!_isContract(to)) return true;

        // Call onERC721Received in the _to contract
        bytes4 response = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            tokenId,
            data
        );
        return (response == _ERC721_RECEIVED);
    }


    function _isContract(address to) internal view returns (bool) {
        uint32 codeSize;
        assembly{
            codeSize := extcodesize(to)
        }
        return (codeSize > 0);
    }


    function _createKitty(
        uint256 mumId,
        uint256 dadId,
        uint256 generation,
        uint256 genes,
        address owner
    ) 
        private
        returns (uint256)
    {
        Kitty memory newKitty = Kitty(
            {
                genes: genes,
                birthTime: uint64(now),
                mumId: uint64(mumId),
                dadId: uint64(dadId),
                generation: uint64(generation)
            }
        );
        uint256 newKittenId = (_kitties.push(newKitty)).sub(1);
        emit Birth(owner, newKittenId, mumId, dadId, genes);
        _transfer(address(0), owner, newKittenId);
        return newKittenId;
    }

}