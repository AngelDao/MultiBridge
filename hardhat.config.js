require("@nomiclabs/hardhat-waffle");
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
    }
  },
};
