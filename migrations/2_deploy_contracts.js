var DappToken = artifacts.require("DappToken");
var TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
    // deploy Dapptoken
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();

    // deploy tokenFarm
    await deployer.deploy(TokenFarm, dappToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // transfer dappTokens to tokenFarm
    const totalSupply = await dappToken.totalSupply();
    // await dappToken.transfer(tokenFarm.address, totalSupply);
    await dappToken.transfer(accounts[0], totalSupply);
};