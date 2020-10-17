pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DappToken is ERC20 {
    constructor() ERC20("Dapp Token", "DAPP") public {
        _mint(msg.sender, 1000000000000000000000000);
    }
}