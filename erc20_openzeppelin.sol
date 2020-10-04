pragma solidity ^0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20Detailed("Gold", "GLD") public {
        _mint(msg.sender, initialSupply);
    }
}