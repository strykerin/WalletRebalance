const { web3 } = require("@openzeppelin/test-helpers/src/setup");

// ABI
const daiAbi = require('../test/abi/dai');

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3.eth.Contract(daiAbi, daiAddress);

module.exports = async function(callback) {
    // this must be inside here because await can only be called in a async method
    const addresses = await new web3.eth.getAccounts();
    const userAddress = addresses[0];

    let balance = await daiContract.methods.balanceOf(userAddress).call();

    console.log(web3.utils.fromWei(balance.toString()));
    callback();
}