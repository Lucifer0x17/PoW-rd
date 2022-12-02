// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

import "hardhat/console.sol";

abstract contract FreelancerNFT is Context, ERC721URIStorage {
    address companyAddress;

    uint256 public tokenCounter = 0;

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
        _safeMint(_to, tokenCounter + 1);
        _setTokenURI(tokenCounter + 1, _tokenURI);
        _setApprovalForAll(_msgSender(), address(this), true);

        tokenCounter++;

        emit NFTMinted(_to, tokenCounter);
    }

    //* FUNCTION: BURN an invoice
    function burnNFT(uint256 tokenId) public {
        _burn(tokenId);

        emit NFTBurned(_msgSender(), tokenId);
    }
}
