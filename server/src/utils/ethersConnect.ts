import { ethers } from "ethers";

const RPCUrl =
  "https://convincing-thrilling-diamond.matic-testnet.discover.quiknode.pro/e4204f0263646fec0bccfe794fff845d27de2c5c/";

const provider = new ethers.providers.JsonRpcProvider(RPCUrl);

export default provider;
