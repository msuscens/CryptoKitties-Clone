pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Safemath.sol";

contract KittyContract is IERC721 {

    using SafeMath for uint256;

    string private _name;
    string private _symbol;

    mapping (address => uint256) private _ownersKittyCount;

    struct Kitty {
        uint256 genes;
        uint256 bithTime;
        uint256 mumId;
        uint256 dadId;
        uint256 generation;
    }
    Kitty[] private _kitties;  

    mapping (uint256 => address) private _kittyOwners;


    constructor (string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
    }


    function balanceOf(address owner) external view returns (uint256 balance){
        return _ownersKittyCount[owner];
    }

    function totalSupply() external view returns (uint256 total){
        return _kitties.length;
    }

    function name() external view returns (string memory tokenName){
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol){
        return _symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner){
        require(tokenId < _kitties.length, "tokenId does not exist!");
        return _kittyOwners[tokenId];
    }

    function transfer(address to, uint256 tokenId) external{
        // Checks
        require(to != address(0), "Recipient's address is zero");
        require(to != address(this), "Recipient's address is the contract address");
        // require(_kittyOwners[tokenId] == msg.sender, "Sender is not the owner of this token");
        require(_isOwner(msg.sender, tokenId), "Sender is not the owner of this token");

        // uint256 sendersInitialTokens = _ownersKittyCount[msg.sender];
        // uint256 receiversInitialTokens = _ownersKittyCount[to];
        // require(sendersInitialTokens > 0, "Internal error - Sender's token count before transfer is zero or less!");
        // require(receiversInitialTokens >= 0, "Internal error - Receiver's token count before transfer is negative!");

        // Effects - Transfer token
        _transfer(msg.sender, to, tokenId);
        // _ownersKittyCount[msg.sender] = _ownersKittyCount[msg.sender].sub(1);
        // _ownersKittyCount[to] = _ownersKittyCount[to].add(1);
        // _kittyOwners[tokenId] = to;

        // assert(_kittyOwners[tokenId] != msg.sender);
        // assert(sendersInitialTokens > _ownersKittyCount[msg.sender]);
        // assert(receiversInitialTokens < _ownersKittyCount[to]);

        // emit Transfer(msg.sender, to, tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal{

        uint256 sendersInitialTokens = _ownersKittyCount[from];
        uint256 receiversInitialTokens = _ownersKittyCount[to];
        require(receiversInitialTokens >= 0, "Internal error - Receiver's token count before transfer is negative!");

        if (from != address(0)){
            require(sendersInitialTokens > 0, "Internal error - Sender's token count before transfer is zero or less!");
            _ownersKittyCount[from] = _ownersKittyCount[from].sub(1);
        }
        _ownersKittyCount[to] = _ownersKittyCount[to].add(1);
        _kittyOwners[tokenId] = to;

        assert(_kittyOwners[tokenId] != from);
        if (from != address(0)) assert(sendersInitialTokens > _ownersKittyCount[from]);
        assert(receiversInitialTokens < _ownersKittyCount[to]);

        emit Transfer(from, to, tokenId);
    }

    function _isOwner(address claimer, uint256 tokenId) internal view returns (bool owner){
        return (_kittyOwners[tokenId] == claimer);
    }

}