import { ethers } from "ethers"
const lighthouse = require('@lighthouse-web3/sdk');


const getSignedAuth = async (publicKey: string, privateKey: string) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = new ethers.Wallet(privateKey, provider);
    try {
        const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message;
        const signedMessage = await signer.signMessage(messageRequested);
        return signedMessage
    } catch (error) {
        return { success: false, error }
    }
}


export default getSignedAuth