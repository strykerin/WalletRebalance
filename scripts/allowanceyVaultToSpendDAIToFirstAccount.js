const { BN, ether, balance } = require('@openzeppelin/test-helpers');
const { asyncForEach } = require('../test/utils');
const yVault = artifacts.require("yVault");

// ABI
const daiABI = require('../test/abi/dai');

// userAddress must be unlocked using --unlock ADDRESS
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3.eth.Contract(daiABI, daiAddress);

module.exports = async function(callback) {
    const addresses = await new web3.eth.getAccounts();
    const userAddress = addresses[0];
    const yVaultDeployed = await yVault.deployed(); 

    const allowanceBefore = await daiContract.methods.allowance(userAddress, yVaultDeployed.address).call();
    console.log(allowanceBefore);

    await daiContract.methods.approve(yVaultDeployed.address, 200000).send({ from: userAddress });

    const allowanceAfter = await daiContract.methods.allowance(userAddress, yVaultDeployed.address).call();
    console.log(allowanceAfter)

    callback();
}