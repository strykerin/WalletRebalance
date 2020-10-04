var MyToken = artifacts.require("MyToken");

module.exports = function(deployer) {
    deployer.deploy(MyToken, "MyToken");
    // Additional contracts can be deployed here
};