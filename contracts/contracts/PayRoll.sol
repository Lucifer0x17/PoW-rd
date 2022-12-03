// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Import the Coporate and Freelancer contracts
import "./Corporate.sol";
import "./Freelancer.sol";

import "hardhat/console.sol";

contract PayRoll is Context {
    // Address of the owner
    address owner;

    // Super Admin => Address of their deployed conrtacts
    mapping(address => address) public superCorporates;

    constructor() {
        owner = _msgSender();
    }

    //* FUNCTION: To deploy the new Coroporate contract.
    function deployCorporateAccount() public {
        // Create a new Corporate contract
        Corporate newCorporate = new Corporate(_msgSender());
    }

    //* FUNCTION: To deploy the new Freelancer contract.
    function deployFreelancerAccount() public {
        // Create a new Freelancer contract
        Freelancer newFreelancer = new Freelancer(_msgSender());
    }
}
