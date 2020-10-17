const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function(callback){
    let tokenFarm = await TokenFarm.deployed();

    // swap Dapp Token for eth
    await tokenFarm.swapDappTokenForDAI();
    callback();
}