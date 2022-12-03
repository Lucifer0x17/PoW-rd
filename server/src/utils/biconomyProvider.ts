/// only used for creating your custom paymaster
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";
import SmartAccount from "@biconomy/smart-account";

// initialise Smart Account

const provider = useWeb3AuthContext();
const walletProvider = new ethers.providers.Web3Provider(provider);

export let activeChainId = ChainId.POLYGON_MUMBAI;
export const supportedChains = [ChainId.POLYGON_MUMBAI];

let options = {
  activeNetworkId: activeChainId,
  supportedNetworksIds: supportedChains,
  // Network Config.
  // Link Paymaster / DappAPIKey for the chains you'd want to support Gasless transactions on
  networkConfig: [
    {
      chainId: ChainId.POLYGON_MUMBAI,
      dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
      // customPaymasterAPI: <IPaymaster Instance of your own Paymaster>
    },
  ],
};

let smartAccount = new SmartAccount(walletProvider, options);

export const smartAccountFunc = async () => {
  return await smartAccount.init();
};
