// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

interface Comptroller {
    function claimComp(address holder) external;
}
