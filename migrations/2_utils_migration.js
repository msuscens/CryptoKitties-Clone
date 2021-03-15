const Utilities = artifacts.require("UtilsLibrary");

module.exports = function(deployer) {
  deployer.deploy(Utilities);
};