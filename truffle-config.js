const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
    okc_testnet: {
      provider: () => new HDWalletProvider(mnemonic, 'https://exchaintestrpc.okex.org'),
      network_id: 65,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    matic: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rpc-mumbai.maticvigil.com'),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 2000,
      skipDryRun: false,
      gas: 10000000
    }
  },
  compilers: {
    solc: {
      version: '0.8.9',
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
};