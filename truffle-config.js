const HDWalletProvider = require("@truffle/hdwallet-provider");
const keys = require("./keys.json")

module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    ropsten: {
      // must be a thunk, otherwise truffle commands may hang in CI
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: keys.MNEMONIC
          },
          providerOrUrl: `https://ropsten.infura.io/v3/${keys.INFURA_PROJECT_ID}`,
          addressIndex: 0
        }),
      network_id: '3',
      gas: 5500000,
      gasPrice: 21000000000,
      confirmations: 2,
      timeoutBlocks: 200
    },
  },
  compilers: {
    solc: {
      version: "0.8.4",
    }
  },
};


// transaction hash: 0x73228336743eada5c0132bb30a98a4f38ab4005ee3ff02a9fef41ff341791e87
// contract address: 0xF5Bd902f407949D4d88D6CAcbd2C235280555803


// transaction hash: 0x9ddac87eb5853859e92be7799f8e85c2b885c4e40174b90c2eb46f8390c7bf48
// contract address: 0xF520b793d7558D38C549fF94F7F7B9794f046632


// const instance = await CourseMarketplace.deployed()
// instance.transferOwnership("0x97B9bba51C243744cbaC79A8cD40a5B6B0175fe3", {from: accounts[0]})