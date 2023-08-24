// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Decode.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract LuckyDuckiesNFT is ERC721Enumerable, Ownable, Pausable, Decode {

    mapping(uint256 => string) tokenURIs;
    using Strings for uint256;
    address public signerManager;
    address public erc20Address;
    address public recipientWallet;
    string private baseURIs;

    event SignerMint(
        address indexed _sender,
        address indexed _receiver,
        bool _res
    );

    event SignerBurn(
        address indexed _sender,
        address indexed _receiver,
        bool _res
    );

    constructor(
        string memory _name,
        string memory _symbol,
        address _erc20Address,
        address _recipientWallet,
        string memory _buri,
        address _signer
    ) ERC721( _name, _symbol) {
        baseURIs = _buri;
        signerManager = _signer;
        erc20Address = _erc20Address;
        recipientWallet = _recipientWallet;
    }

    function mintBySignature(bytes memory _signurate, bytes32 _mHash, uint256 _price, uint256[] memory _tokenIds, string memory _uri) public {
        require(!paused(), "Pausable: token transfer while paused");
        require(_tokenIds.length > 0, "ERC721: token empty!!!");
        string memory tokenIds;

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            tokenIds = appendString(tokenIds,Strings.toString(_tokenIds[i]));
        }

        require(VerifyNonce(Strings.toHexString(uint256(uint160(msg.sender)), 20), _price, tokenIds, _uri, _mHash), "Hash validation error.");
        address signAddress = decode(_signurate, _mHash);

        if (!IERC20(erc20Address).transferFrom(msg.sender, recipientWallet, _price)) {
            revert("Failed to transfer ERC20");
        }

        if (signerManager == signAddress) {

            for (uint256 i = 0; i < _tokenIds.length; i++) {
                _safeMint(_msgSender(), _tokenIds[i]);
                _setTokenURI(_tokenIds[i], _uri);
            }

            emit SignerMint(msg.sender, signAddress, true);
        } else {
            emit SignerMint(msg.sender, signAddress, false);
        }
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI = tokenURIs[_tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(_tokenId);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual {
        require(_exists(_tokenId), "ERC721URIStorage: URI set of nonexistent token");
        tokenURIs[_tokenId] = _tokenURI;
    }

    function _burn(uint256 _tokenId) internal virtual override {
        super._burn(_tokenId);

        if (bytes(tokenURIs[_tokenId]).length != 0) {
            delete tokenURIs[_tokenId];
        }
    }

    function burnBySignature(bytes memory _signurate, bytes32 _mHash, uint256 _price, uint256[] memory _tokenIds, string memory _nonce) public {
        require(!paused(), "Pausable: token transfer while paused");
        require(_tokenIds.length > 0, "ERC721: token empty!!!");
        string memory tokenIds;

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            require(_isApprovedOrOwner(_msgSender(), _tokenIds[i]), "burn caller is not owner nor approved");
            tokenIds = appendString(tokenIds,Strings.toString(_tokenIds[i]));
        }

        require(VerifyNonce(Strings.toHexString(uint256(uint160(msg.sender)), 20), _price, tokenIds, _nonce, _mHash), "Hash validation error.");
        address signAddress = decode(_signurate, _mHash);

        if (!IERC20(erc20Address).transferFrom(msg.sender, recipientWallet, _price)) {
            revert("Failed to transfer ERC20");
        }

        if (signerManager == signAddress) {

            for (uint256 i = 0; i < _tokenIds.length; i++) {
                _burn(_tokenIds[i]);
            }

            emit SignerBurn(msg.sender, signAddress, true);
        } else {
            emit SignerBurn(msg.sender, signAddress, false);
        }

    }

    function getTokensOfOwner(address _owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(_owner);
        require(balance > 0, "NFT: Address doesn't owns tokens");

        uint256[] memory tokenIds = new uint256[](balance);
        for (uint256 i; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokenIds;
    }

    function VerifyNonce(string memory _sender, uint256 _price, string memory _tokenId, string memory _nonce, bytes32 _msgHash) public pure returns (bool) {
        bytes memory prefix = abi.encodePacked("\x19Ethereum Signed Message:\n", Strings.toString(abi.encodePacked(_sender, Strings.toString(_price), _tokenId, _nonce).length));
        bytes32 prefixedHashNonce = keccak256(abi.encodePacked(prefix, abi.encodePacked(_sender, Strings.toString(_price), _tokenId, _nonce)));
        return (prefixedHashNonce == _msgHash);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURIs;
    }

    function setBaseURI(string memory _buri) public onlyOwner {
        require(bytes(_buri).length > 0, "wrong base uri");
        baseURIs = _buri;
    }

    function setPause() external onlyOwner {
        _pause();
    }

    function unsetPause() external onlyOwner {
        _unpause();
    }

    function setSinger(address _signer) public onlyOwner {
        signerManager = _signer;
    }

    function setAddressERC20(address _address) public onlyOwner {
        erc20Address = _address;
    }

    function setRecipientWallet(address _address) public onlyOwner {
        recipientWallet = _address;
    }

}
