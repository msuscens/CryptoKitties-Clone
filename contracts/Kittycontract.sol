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
        uint128 mumId;
        uint128 dadId;
        uint128 generation;
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
        require(_isOwner(msg.sender, tokenId), "Sender is not the owner of this token");

        // Effects - Transfer token
        _transfer(msg.sender, to, tokenId);

    }

    function _transfer(address from, address to, uint256 tokenId) internal{
        
        if (from != address(0)){
            _ownersKittyCount[from] = _ownersKittyCount[from].sub(1);
        }
        _ownersKittyCount[to] = _ownersKittyCount[to].add(1);
        _kittyOwners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _isOwner(address claimer, uint256 tokenId) internal view returns (bool owner){
        return (_kittyOwners[tokenId] == claimer);
    }

}