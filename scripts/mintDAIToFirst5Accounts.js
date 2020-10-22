const { BN, ether, balance } = require('@openzeppelin/test-helpers');
const { asyncForEach } = require('../test/utils');

// ABI
const daiABI = require('../test/abi/dai');

// userAddress must be unlocked using --unlock ADDRESS
const userAddress = '0x9eb7f2591ed42dee9315b6e2aaf21ba85ea69f8c';
const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';
const daiContract = new web3.eth.Contract(daiABI, daiAddress);

module.exports = async function(callback) {

  // this must be inside here because await can only be called in a async method
  const accounts = await new web3.eth.getAccounts();

  await web3.eth.sendTransaction({
    from: accounts[0],
    to: userAddress,
    value: ether('0.1')
  });
  const ethBalance = await balance.current(userAddress)
  console.log(web3.utils.fromWei(ethBalance.toString()))


  // Get 100 DAI for first 5 accounts
  await asyncForEach(accounts.slice(0, 5), async account => {
    // daiAddress is passed to ganache-cli with flag `--unlock`
    // so we can use the `transfer` method
    await daiContract.methods
      .transfer(account, ether('100').toString())
      .send({ from: userAddress, gasLimit: 800000 });
    const daiBalance = await daiContract.methods.balanceOf(account).call();

    // log
    console.log(web3.utils.fromWei(daiBalance));
  });

  callback();
}