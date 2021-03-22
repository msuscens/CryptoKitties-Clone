const Utilities = artifacts.require("ArrayUtils");
const Token = artifacts.require("KittyContract");

module.exports = function(deployer) {
  deployer.deploy(Utilities)
  deployer.link(Utilities, Token)
  deployer.deploy(Token, "MarksCryptoKitties", "MCK");
};