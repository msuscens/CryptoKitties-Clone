pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Safemath.sol";

contract Kittycontract is IERC721 {

    using SafeMath for uint256;

    uint256 private _totalSupply;
    string private _tokenName;
    string private _tokenSymbol;

    mapping (address => uint256) private _ownersTokenCount;

    //Strut below is not used yet but should struct (and array) be private? If so, how?
    struct KittyToken {
         // Add unique token attributes here
         uint256 dna;
    }
    KittyToken[] kitties;  

    mapping (uint256 => address) private _kittyOwners;


    constructor (string memory name, string memory symbol, uint256 supply) public {
        _tokenName = name;
        _tokenSymbol = symbol;
        _totalSupply = supply;
    }

    function balanceOf(address owner) external view returns (uint256 balance){
        return _ownersTokenCount[owner];
    }

    function totalSupply() external view returns (uint256 total){
        return _totalSupply;
    }

    function name() external view returns (string memory tokenName){
        return _tokenName;
    }

    function symbol() external view returns (string memory tokenSymbol){
        return _tokenSymbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner){
        require(tokenId < kitties.length, "tokenId does not exist!");
        return _kittyOwners[tokenId];
    }

    function transfer(address to, uint256 tokenId) external{
        // Checks
        require(to != address(0), "Recipient's address is zero");
        require(to != address(this), "Recipient's address is the contract address");
        require(_kittyOwners[tokenId] == msg.sender, "Sender is not the owner of this token");

        uint256 sendersInitialTokens = _ownersTokenCount[msg.sender];
        uint256 receiversInitialTokens = _ownersTokenCount[to];
        require(sendersInitialTokens > 0, "Internal error - Sender's token count before transfer is zero or less!");
        require(receiversInitialTokens >= 0, "Internal error - Receiver's token count before transfer is negative!");

        // Effects - Transfer token
        _ownersTokenCount[msg.sender] = _ownersTokenCount[msg.sender].sub(1);
        _ownersTokenCount[to] = _ownersTokenCount[to].add(1);
        _kittyOwners[tokenId] = to;

        assert(_kittyOwners[tokenId] != msg.sender);
        assert(sendersInitialTokens > _ownersTokenCount[msg.sender]);
        assert(receiversInitialTokens < _ownersTokenCount[to]);

        emit Transfer(msg.sender, to, tokenId);
    }

}