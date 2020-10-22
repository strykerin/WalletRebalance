var DappToken = artifacts.require("DappToken");
var TokenFarm = artifacts.require("TokenFarm");
var YVault = artifacts.require("yVault");
var Controller = artifacts.require("Controller");
var StrategyDAICompoundBasic = artifacts.require("StrategyDAICompoundBasic");

module.exports = async function(deployer, network, accounts) {
    // // deploy Dapptoken
    // await deployer.deploy(DappToken);
    // const dappToken = await DappToken.deployed();

    // // deploy tokenFarm
    // await deployer.deploy(TokenFarm, dappToken.address);
    // const tokenFarm = await TokenFarm.deployed();

    // // transfer dappTokens to tokenFarm
    // const totalSupply = await dappToken.totalSupply();
    // // await dappToken.transfer(tokenFarm.address, totalSupply);
    // await dappToken.transfer(accounts[0], totalSupply);

    const daiAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
    const rewardsAddress = "0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde";

    // *** DEPLOY SMART CONTRACTS ***
    await deployer.deploy(Controller, rewardsAddress);
    const controller = await Controller.deployed();
    // deploy yVault
    await deployer.deploy(YVault, daiAddress, controller.address);
    const yVault = await YVault.deployed();
    // deploy daiCompStrategy
    await deployer.deploy(StrategyDAICompoundBasic, controller.address);
    const strategy = await StrategyDAICompoundBasic.deployed();

    // *** SET SMART CONTRACT PROPERTIES ***
    // set Vault in Controller
    await controller.setVault(daiAddress, yVault.address);
    // set Strategy in Controller
    await controller.approveStrategy(daiAddress, strategy.address);
    await controller.setStrategy(daiAddress, strategy.address);
}