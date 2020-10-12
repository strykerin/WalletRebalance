var DappToken = artifacts.require("DappToken");
var TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer) {
    // deploy Dapptoken
    await deployer.deploy(DappToken, 1000000);
    const dappToken = await DappToken.deployed();

    // deploy tokenFarm
    await deployer.deploy(TokenFarm, dappToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // transfer dappTokens to tokenFarm
    await dappToken.transfer(tokenFarm.address, '1000000')
};