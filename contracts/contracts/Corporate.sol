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

    // ==================== SUPER ADMIN Functions ====================

    //* FUNCTION: TO add the admin to the admins array and notiying the event.
    function addAdmin(address _admin) private onlySuperAdmin {
        admins.push(_admin);

        emit AdminAdded(_admin);
    }

    //* FUNCTION: TO remove the admin from the admins array and notiying the event.
    function removeAdmin(address _admin) private onlySuperAdmin {
        for (uint i = 0; i < admins.length; i++) {
            if (admins[i] == _admin) {
                admins[i] = admins[admins.length - 1];
                admins.pop();
                break;
            }
        }

        emit AdminRemoved(_admin);
    }

    // ==================== ADMIN Functions ====================
    //* FUNCTION: TO add the employee to the employees array and notiying the event.
    function addEmployee(
        string memory _name,
        address _walletAddress,
        uint256 _payPeriod,
        uint256 _payAmount,
        uint256 _startTimestamp
    ) public onlyAdmin {
        // Checking if the employee is already added or not.
        require(
            employeeMapping[_walletAddress].walletAddress == address(0),
            "Employee already added"
        );

        // Adding the employee to the employees array.
        employees.push(_walletAddress);

        // Adding the employee to the employeeMapping.
        employeeMapping[_walletAddress] = Employee(
            _name,
            _walletAddress,
            _payPeriod,
            _payAmount,
            _startTimestamp,
            _startTimestamp + getSeconds(_payPeriod)
        );

        emit EmployeeAdded(_walletAddress);
    }

    //* FUNCTION: TO remove the employee from the employees array and notiying the event.
    function removeEmployee(address _walletAddress) public onlyAdmin {
        // Checking if the employee is already added or not.
        require(
            employeeMapping[_walletAddress].walletAddress != address(0),
            "Employee not added"
        );

        // Removing the employee from the employees array.
        for (uint i = 0; i < employees.length; i++) {
            if (employees[i] == _walletAddress) {
                employees[i] = employees[employees.length - 1];
                employees.pop();
                break;
            }
        }

        // Removing the employee from the employeeMapping.
        delete employeeMapping[_walletAddress];

        emit EmployeeRemoved(_walletAddress);
    }

    //======================GET FUNCTIONS=====================//
    //* FUNCTION: TO get the seconds of the pay period.
    function getSeconds(
        uint256 _payPeriod
    ) public pure returns (uint256 seconds_) {
        if (_payPeriod == uint256(PayPeriod.week)) {
            return 604800;
        } else if (_payPeriod == uint256(PayPeriod.twoWeeks)) {
            return 1209600;
        } else if (_payPeriod == uint256(PayPeriod.month)) {
            return 2629743;
        } else if (_payPeriod == uint256(PayPeriod.threeMonths)) {
            return 7889229;
        } else if (_payPeriod == uint256(PayPeriod.sixMonths)) {
            return 15778458;
        } else if (_payPeriod == uint256(PayPeriod.year)) {
            return 31556926;
        }
    }
}
