require("@nomicfoundation/hardhat-toolbox");
require("@atixlabs/hardhat-time-n-mine");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks : {
    hardhat : {
      chainId : 1337,
      mining: {
        auto: false,
        interval: 5000
      }
     },
     


  }
};
