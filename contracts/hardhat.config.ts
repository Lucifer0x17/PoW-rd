import "@nomiclabs/hardhat-waffle";
import * as fs from "fs";

const projectID = fs.readFileSync(".projectId").toString();
const prvKey = fs.readFileSync(".secret").toString();

export default {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mainnet: {
      url: `https://rpc-mainnet.maticvigil.com/v1/${projectID}`,
      accounts: [prvKey],
    },
    mumbai: {
      url: `https://rpc-mumbai.maticvigil.com/v1/${projectID}`,
      accounts: [prvKey],
    },
  },
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
