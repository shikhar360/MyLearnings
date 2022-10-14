// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

error NotTheEntityOwner();
error CreateEntityFirst();
error NotContractOwner();

contract Crowdfunding {
    address private immutable i_owner;
    uint private constant MINIMUM_DONATION = 0.01 ether;
    uint private s_id = 0;

    constructor() {
        i_owner = msg.sender;
    }

    //create  entity
    struct Entity {
        address payable entityowner;
        string name;
        string description;
        uint256 targetAmount;
        bool isFundraisingStarted;
        uint entityId;
    }

    Entity[] private currentEntity;

    mapping(address => uint) private addressToId;
    mapping(address => bool) private haveActiveEntity;

    function sendFunds(uint _id) external payable {
        require(msg.value >= MINIMUM_DONATION, "Send More ");
        require(_id <= currentEntity.length);
        require(
            currentEntity[_id].entityowner != address(0),
            " Invalid Entity"
        );
        currentEntity[_id].entityowner.transfer(msg.value);
    }

    function addEntity(
        string memory _name,
        string memory _desc,
        uint256 _target,
        bool _isStarted
    ) external {
        require(haveActiveEntity[msg.sender] == false); // one person can create one entity
        currentEntity.push(
            Entity(payable(msg.sender), _name, _desc, _target, _isStarted, s_id)
        );
        addressToId[msg.sender] = s_id;
        haveActiveEntity[msg.sender] = true;
        s_id++;
    }

    // add funds after starting fundraising

    function startFundraising() external {
        if (msg.sender != currentEntity[addressToId[msg.sender]].entityowner) {
            revert NotTheEntityOwner();
        }
        currentEntity[addressToId[msg.sender]].isFundraisingStarted = true;
    }

    // close fund raising
    function endFundraising() external {
        if (msg.sender != currentEntity[addressToId[msg.sender]].entityowner) {
            revert NotTheEntityOwner();
        }
        currentEntity[addressToId[msg.sender]].isFundraisingStarted = false;
    }

    // discontinue entity

    function discontinueEntity() external {
        if (msg.sender != currentEntity[addressToId[msg.sender]].entityowner) {
            revert NotTheEntityOwner();
        }

        if (!(haveActiveEntity[msg.sender])) {
            revert CreateEntityFirst();
        }
        delete currentEntity[addressToId[msg.sender]];
        haveActiveEntity[msg.sender] = false;
    }

    //getter Functions
    function getAllEntity() external view returns (Entity[] memory) {
        return currentEntity;
    }

    function getMyEntity() external view returns (Entity memory) {
        return currentEntity[addressToId[msg.sender]];
    }

    function getMinimumDonation() external pure returns (uint) {
        return MINIMUM_DONATION;
    }
}
