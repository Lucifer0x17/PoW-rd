// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "hardhat/console.sol";

contract Corporate is Context, ReentrancyGuard {
    // The address of the owner of the company.
    address public superAdmin;

    constructor() {
        console.log("Deploying a CorporateContract with Solidity");
        superAdmin = _msgSender();
    }

    // ==================== Arrays ====================
    // Addresses of the admin.
    address[] public admins;

    // Addresses of the employees.
    address[] public employees;

    // ==================== Structs ====================
    // Struct for the employee.
    struct Employee {
        string name;
        address walletAddress;
        uint256 payPeriod;
        uint256 payAmount;
        uint256 startTimestamp;
        uint256 nextPayTimestamp;
    }

    // =============EVENTS================= //
    event AdminAdded(address indexed _admin);
    event AdminRemoved(address indexed _admin);
    event EmployeeAdded(address indexed _employee);
    event EmployeeRemoved(address indexed _employee);
    event FundsAdded(uint256 _amount);
    event FundsWithdrawn(uint256 _amount);

    // ==================== ENUMS ====================
    enum PayPeriod {
        week,
        twoWeeks,
        month,
        threeMonths,
        sixMonths,
        year
    }

    // ==================== Mappings ====================
    // Mapping for the employee.
    mapping(address => Employee) public employeeMapping;

    // =============MODIFIERS================= //

    // To check if the caller is Super Admin or not.
    modifier onlySuperAdmin() {
        require(_msgSender() == superAdmin, "Caller is not Super Admin");
        _;
    }

    // To check if the caller is Admin or not.
    modifier onlyAdmin() {
        bool isAdmin = false;
        for (uint i = 0; i < admins.length; i++) {
            if (admins[i] == _msgSender()) {
                isAdmin = true;
                break;
            }
        }
        require(isAdmin, "Caller is not Admin");
        _;
    }
}
