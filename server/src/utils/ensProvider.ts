import { ethers } from 'ethers';
import { ENS } from '@ensdomains/ensjs'
import * as dotenv from "dotenv";
dotenv.config();

const providerUrl = `https://chaotic-chaotic-shape.discover.quiknode.pro/${process.env.ENS_RPC}`
const provider = new ethers.providers.JsonRpcProvider(providerUrl)

const getEns = async () => {
    try {
        const ens = new ENS()
        console.log("first")
        await ens.setProvider(provider)
        // console.log(bleh)
        // return bleh
    } catch (error) {
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
        throw error
    }
}

export default getEns;