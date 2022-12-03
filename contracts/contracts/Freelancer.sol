// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

abstract contract FreelancerNFT is Counter, Context, ERC721URIStorage {
    address companyAddress;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => string) public tokenURIs;

    constructor() ERC721("FreelancerNFT", "FLNFT") {
        console.log("Deploying a FreelancerNFT with Solidity");
        companyAddress = _msgSender();
    }

    // ================= EVENTS ===================
    event NFTMinted(address indexed _to, uint256 _tokenId);
    event NFTBurned(address indexed _from, uint256 _tokenId);

    // ================= FUNCTIONS ===================

    //* FUNCTION: MINT an invoice
    function mintNFT(address _to, string memory _tokenURI) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        _setApprovalForAll(_msgSender(), address(this), true);

        tokenURIs[tokenId] = _tokenURI;

        emit NFTMinted(_to, tokenId);
    }

    //* FUNCTION: BURN an invoice
    function burnNFT(uint256 tokenId) public {
        _burn(tokenId);

        emit NFTBurned(_msgSender(), tokenId);
    }

    //* FUNCTION: GET the tokenID
    function getTokenId() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    //* FUNCTION: GET the tokenURI
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        return tokenURIs[tokenId];
    }
}
