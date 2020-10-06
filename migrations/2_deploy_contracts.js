var MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
    deployer.deploy(MyToken, 1000000);
    // Additional contracts can be deployed here
};