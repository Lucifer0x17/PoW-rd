import { ethers } from 'ethers';
import * as dotenv from "dotenv";
dotenv.config();

const providerUrl = `https://chaotic-chaotic-shape.discover.quiknode.pro/${process.env.ENS_RPC}`
const provider = new ethers.providers.JsonRpcProvider(providerUrl)

const getEns = async (ens: string) => {
    try {
        // console.log("ayush")
        return await provider.resolveName(ens)
        // return bleh
    } catch (error) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        throw error
    }
}

export default getEns;