import { ethers } from "ethers";
import { smartAccountFunc } from "../utils/biconomyProvider";

const erc721Interface = new ethers.utils.Interface([
  "function mintNFT(address _to, string _tokenURI)",
]);

// Encode an ERC-721 token transfer to recipient of the specified amount

// Function to get the wallet address fromt the smartAccount instance
export const walletAddress = async () => {
  const smartAccount = await smartAccountFunc();
  return smartAccount.address;
};

// const address = await smartAccountFunc.address;

const data = erc721Interface.encodeFunctionData("mintNFT", [
  recipientAddress,
  tokenURI,
]);

const tx1 = {
  to: nftAddress,
  data,
};

// Transaction subscription

smartAccountFunc.on("txHashGenerated", (response: any) => {
  console.log("txHashGenerated event received via emitter", response);
  showSuccessMessage(`Transaction sent: ${response.hash}`);
});

smartAccountFunc.on("txMined", (response: any) => {
  console.log("txMined event received via emitter", response);
  showSuccessMessage(`Transaction mined: ${response.hash}`);
});

smartAccountFunc.on("error", (response: any) => {
  console.log("error event received via emitter", response);
});

// Sending transaction

// Gasless
const txResponse = await smartAccountFunc.sendGasLessTransaction({
  transaction: tx1,
});
