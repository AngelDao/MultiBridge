require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");
require('dotenv').config();

module.exports = {
  solidity: "0.8.9",
  networks: {
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOY_PRIVATE_KEY_TESTNET]
          : [],
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOY_PRIVATE_KEY_TESTNET]
          : [],
    },
    "kovan-optimism": {
      url: process.env.KOVAN_OP_URL || "",
      accounts:
        process.env.DEPLOY_PRIVATE_KEY_TESTNET !== undefined
          ? [process.env.DEPLOY_PRIVATE_KEY_TESTNET]
          : [],
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY || "",
  }
};
