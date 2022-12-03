// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";

import "hardhat/console.sol";

contract Corporate is Context, AutomationCompatibleInterface, ReentrancyGuard {
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
        uint8 payPeriod;
        uint256 payAmount;
        uint256 startTimestamp;
        uint256 nextPayTimestamp;
    }

    // ==================== Mappings ====================
    // Mapping for the employee.
    mapping(address => Employee) public employeeMapping;

    // Mapping for the freelancer's accepted invoices. (address => tokenID => tokenURI)
    mapping(address => mapping(uint256 => string))
        public freelancerInvoiceMapping;

    // ==================== ENUMS ====================
    enum PayPeriod {
        week,
        twoWeeks,
        month,
        threeMonths,
        sixMonths,
        year
    }

    // =============EVENTS================= //
    event AdminAdded(address indexed _admin);
    event AdminRemoved(address indexed _admin);
    event EmployeeAdded(address indexed _employee);
    event EmployeeRemoved(address indexed _employee);
    event FundsAdded(uint256 _amount);
    event FundsWithdrawn(uint256 _amount);
    event InvoiceGenerated(uint256 indexed tokenId, address);
    event InvoiceRejected(uint256 indexed tokenId, address);
    event InvoicePaid(uint256 indexed tokenId, address);

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
    function addAdmin(address _admin) public onlySuperAdmin {
        admins.push(_admin);

        emit AdminAdded(_admin);
    }

    //* FUNCTION: TO remove the admin from the admins array and notiying the event.
    function removeAdmin(address _admin) public onlySuperAdmin {
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
        uint8 _payPeriod,
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
            block.timestamp + _startTimestamp,
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

    //* FUNCTION: To add funds to the contract.
    function addFunds() public payable onlyAdmin {
        emit FundsAdded(msg.value);
    }

    //* FUNCTION: To withdraw funds from the contract.
    function withdrawFunds(uint256 _amount) public onlyAdmin nonReentrant {
        require(
            address(this).balance - getWithdrawableAmount() >= _amount,
            "Insufficient funds in the contract"
        );

        (bool success, ) = _msgSender().call{value: _amount}("");
        require(success, "Withdraw failed.");

        emit FundsWithdrawn(_amount);
    }

    //* FUNCTION: Pay the employee their salary.
    function payEmployee(address _walletAddress) public onlyAdmin {
        // Checking if the employee is already added or not.
        require(
            employeeMapping[_walletAddress].walletAddress != address(0),
            "Employee not added"
        );

        // Checking if the employee is eligible for the salary or not.
        require(
            block.timestamp >= employeeMapping[_walletAddress].nextPayTimestamp,
            "Employee not eligible for the salary"
        );

        // Paying the employee.
        (bool success, ) = _walletAddress.call{
            value: employeeMapping[_walletAddress].payAmount
        }("");
        require(success, "Payment failed.");

        // Updating the nextPayTimestamp.
        employeeMapping[_walletAddress].nextPayTimestamp =
            block.timestamp +
            getSeconds(employeeMapping[_walletAddress].payPeriod);
    }

    //* FUNCTION: To response to the invoice generated by the freelancer.
    function responseToInovice(
        bool _response,
        uint256 _tokenId,
        string memory _tokenURI,
        address _freelancerAddress
    ) public onlyAdmin {
        if (_response == true) {
            acceptInvoice(_tokenId, _freelancerAddress, _tokenURI);
        } else {
            emit InvoiceRejected(_tokenId, _freelancerAddress);
        }
    }

    //* FUNCTION: To pay the freelancer for the specific invoice.
    function payFreelancer(
        uint256 _tokenId,
        address _freelancerAddress,
        uint256 _amountToPay
    ) public onlyAdmin {
        require(
            address(this).balance - getWithdrawableAmount() >= _amountToPay,
            "Insufficient funds in the contract"
        );

        (bool success, ) = _freelancerAddress.call{value: _amountToPay}("");
        require(success, "Withdraw failed.");

        emit InvoicePaid(_tokenId, _freelancerAddress);
    }

    //======================GET FUNCTIONS=====================//
    //* FUNCTION: To get the seconds of the pay period.
    function getSeconds(uint8 index) internal pure returns (uint64 time) {
        require(index <= uint8(type(PayPeriod).max), "ERR:ST"); //ST => Small Time

        if (index == 0) {
            time = uint64(7 days);
        } else if (index == 1) {
            time = uint64(14 days);
        } else if (index == 2) {
            time = uint64(30 days);
        } else if (index == 3) {
            time = uint64(90 days);
        } else if (index == 4) {
            time = uint64(180 days);
        } else if (index == 5) {
            time = uint64(365 days);
        }
    }

    //* FUNCTION: To get the withdrawable amount.
    function getWithdrawableAmount() public view returns (uint256 amount) {
        return calculateAmountToBePaid(30);
    }

    //* FUNCTION: To get the balance of the contract.
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //* FUNCTION: To get the employee details.
    function getEmployeeDetails(
        address _employee
    ) public view returns (Employee memory) {
        return employeeMapping[_employee];
    }

    //* FUNCTION: Amount to be paid in {15,30,60} days.
    function getAmountToBePaid(uint256 _days) public view returns (uint256) {
        return calculateAmountToBePaid(_days);
    }

    //============================= INTERNAL FUNCTIONS =============================//
    //* FUNCTION: Calculate amount to be paid in the next { 15, 30, 60 } days.
    function calculateAmountToBePaid(
        uint256 _days
    ) internal view returns (uint256) {
        uint256 amountToBePaid = 0;
        for (uint i = 0; i < employees.length; i++) {
            if (
                block.timestamp >=
                employeeMapping[employees[i]].nextPayTimestamp &&
                employeeMapping[employees[i]].nextPayTimestamp <
                block.timestamp + (_days * 1 days)
            ) {
                amountToBePaid += employeeMapping[employees[i]].payAmount;
            }
        }
        return address(this).balance - amountToBePaid;
    }

    //* FUNCTION: Accepting the request of the freelancer and adding the tokenId to the freelancer mappings.
    function acceptInvoice(
        uint256 tokenId,
        address _freelancerAddress,
        string memory _tokenURI
    ) internal {
        freelancerInvoiceMapping[_freelancerAddress][tokenId] = _tokenURI;

        emit InvoiceGenerated(tokenId, _freelancerAddress);
    }

    //* FUNCTION: To itereate through every employee who have a the pay cycle in 24 hours from the block.timestamp, and making the upkeep transaction true to send them the PayAmount.
    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        for (uint i = 0; i < employees.length; i++) {
            if (
                block.timestamp >=
                employeeMapping[employees[i]].nextPayTimestamp &&
                employeeMapping[employees[i]].nextPayTimestamp <
                block.timestamp + (24 * 1 hours)
            ) {
                upkeepNeeded = true;
                break;
            }
        }
    }

    //* FUNCTION: To itereate through every employee who have a the pay cycle in 24 hours from the block.timestamp, and sending them their payamount and updating their nextPayTimestamp.
    function performUpkeep(bytes calldata /* performData */) external override {
        for (uint i = 0; i < employees.length; i++) {
            if (
                block.timestamp >=
                employeeMapping[employees[i]].nextPayTimestamp &&
                employeeMapping[employees[i]].nextPayTimestamp <
                block.timestamp + (24 * 1 hours)
            ) {
                // Paying the employee.
                (bool success, ) = employees[i].call{
                    value: employeeMapping[employees[i]].payAmount
                }("");
                require(success, "Payment failed.");

                // Updating the nextPayTimestamp.
                employeeMapping[employees[i]].nextPayTimestamp =
                    block.timestamp +
                    getSeconds(employeeMapping[employees[i]].payPeriod);
            }
        }
    }
}
