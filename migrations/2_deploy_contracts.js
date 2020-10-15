var DappToken = artifacts.require("DappToken");
var TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(deployer, network, accounts) {
    // deploy Dapptoken
    await deployer.deploy(DappToken, 1000000*10^18);
    const dappToken = await DappToken.deployed();

    // deploy tokenFarm
    await deployer.deploy(TokenFarm, dappToken.address);
    const tokenFarm = await TokenFarm.deployed();

    // transfer dappTokens to tokenFarm
    await dappToken.transfer(tokenFarm.address, 500000 * 10^18)
    await dappToken.transfer(accounts[0], 500000 * 10^18)
};