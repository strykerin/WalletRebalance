const DappToken = artifacts.require("DappToken");

module.exports = async function(callback){
    let dappToken = await DappToken.deployed();
    // deployer address
    let address = "0x73DAa0bc02ce854BAAB18a68e258AaD46fA338A9";
    let balance = await dappToken.balanceOf(address);

    console.log("Balance with 18 decimals "+ balance.toString());
    console.log("Balance formatted: "+ web3.utils.fromWei(balance.toString()));
    callback();
}