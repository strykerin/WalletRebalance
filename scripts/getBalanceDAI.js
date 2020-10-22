const { web3 } = require("@openzeppelin/test-helpers/src/setup");
const yVault = artifacts.require("yVault");
const Controller = artifacts.require("Controller");
const StrategyDAICompoundBasic = artifacts.require("StrategyDAICompoundBasic");

// ABI
const daiAbi = require('../test/abi/dai');

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3.eth.Contract(daiAbi, daiAddress);

module.exports = async function(callback) {
    const yvault = await yVault.deployed();
    // this must be inside here because await can only be called in a async method
    const addresses = await new web3.eth.getAccounts();
    const userAddress = addresses[0];

    let balance = await daiContract.methods.balanceOf(userAddress).call();
    let formattedBalance = web3.utils.fromWei(balance.toString());
    console.log('Account_0 ' + formattedBalance);

    balance = await daiContract.methods.balanceOf(Controller.address).call();
    formattedBalance = web3.utils.fromWei(balance.toString());
    console.log('Controller ' + formattedBalance); 

    balance = await daiContract.methods.balanceOf(StrategyDAICompoundBasic.address).call();
    formattedBalance = web3.utils.fromWei(balance.toString());
    console.log('Strategy ' + formattedBalance); 

    callback();
}