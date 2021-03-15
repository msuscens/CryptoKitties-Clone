pragma solidity 0.5.12;

import "./IERC721.sol";
import "./Safemath.sol";
import "./Ownable.sol";
import "./UtilsLibrary.sol";


contract KittyContract is IERC721, Ownable{

    using SafeMath for uint256;
    //using UtilsLibrary for uint256[];

    uint64 private constant _GEN0_CREATION_LIMIT = 10;

    uint256 private _gen0KittiesCount;
    string private _name;
    string private _symbol;

    event Birth(address owner, uint256 kittenId, uint256 mumId, uint256 dadId, uint256 genes);

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint64 mumId;
        uint64 dadId;
        uint64 generation;
    }
    Kitty[] private _kitties;  

    mapping (uint256 => address) private _kittyOwners;
    mapping (address => uint256) private _ownersKittyCount;
    mapping (address => uint256[]) private _ownersKittyIds;

    constructor (string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
    }

    function createKittyGen0(uint256 genes) public onlyOwner {
        require(_gen0KittiesCount<_GEN0_CREATION_LIMIT, "Hit Gen0 creation limit!");
        _gen0KittiesCount = _gen0KittiesCount.add(1);
        _createKitty( 0, 0, 0, genes, msg.sender);
    }

    function _createKitty(uint256 mumId, uint256 dadId, uint256 generation,
                          uint256 genes, address owner) private returns (uint256){
        Kitty memory newKitty = Kitty({
                                    genes: genes,
                                    birthTime: uint64(now),
                                    mumId: uint64(mumId),
                                    dadId: uint64(dadId),
                                    generation: uint64(generation)
                                });

        uint256 newKittenId = (_kitties.push(newKitty)).sub(1);

        emit Birth(owner, newKittenId, mumId, dadId, genes);

        _transfer(address(0), owner, newKittenId);

        return newKittenId;
    }

    function getKitty(uint256 kittyId) external view returns(uint256 genes, uint64 birthTime, 
                                                        uint64 mumId, uint64 dadId, uint64 generation){
        require(kittyId < _kitties.length, "No such kitty id");
        
        return (_kitties[kittyId].genes, _kitties[kittyId].birthTime,
                  _kitties[kittyId].mumId, _kitties[kittyId].dadId, _kitties[kittyId].generation);
    }

    function getAllYourKittyIds() external view returns(uint256[] memory){
        // Set pointer to owners array of kitty Ids
        return _ownersKittyIds[msg.sender];
    }



    // IERC721 function implementations

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
        require(to != address(this), "Recipient is contract address");
        require(_isOwner(msg.sender, tokenId), "Sender is not token owner");

        // Effects - Transfer token
        _transfer(msg.sender, to, tokenId);

    }

    function _transfer(address from, address to, uint256 tokenId) internal{

        if (from != address(0)){
            // Take kittie token from the sender
            //_ownersKittyIds[from].removeFrom(tokenId);

            uint256[] storage sendersKittyIds = _ownersKittyIds[from];
            for (uint256 i=0; i<_ownersKittyCount[from]; i++){
                if (sendersKittyIds[i] == tokenId){
                    sendersKittyIds[i] = sendersKittyIds[sendersKittyIds.length-1];
                    sendersKittyIds.pop();
                    break;
                }
            }
            _ownersKittyCount[from] = _ownersKittyCount[from].sub(1);
        }

        // Give token to the receiver
        _ownersKittyIds[to].push(tokenId);
        _ownersKittyCount[to] = _ownersKittyCount[to].add(1);
        _kittyOwners[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

    function _isOwner(address claimer, uint256 tokenId) internal view returns (bool owner){
        return (_kittyOwners[tokenId] == claimer);
    }

}