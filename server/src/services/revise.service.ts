import { NftDataInput, NftPropertiesInput } from "../schemas/nft.schema";
import revise from "../utils/reviseObject";

export const createNFT = async (data: NftDataInput, properties: NftPropertiesInput) => {
    try {
        // get token id from contract and add it to data obj
        await revise.addNFT(data, properties);
        // image link: https://img.freepik.com/free-vector/professional-invoice-template-red-theme_1017-14356.jpg
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export const updateIsCleared = async (nftId: string) => {
    try {
        const nft = await revise.fetchNFT(nftId);
        console.log("nft:", nft)
        const result = await revise.nft(nft).setProperty("isCleared", "true").setImage("https://img.myloview.com/posters/a-cash-invoice-with-tick-mark-and-pencil-concept-of-paid-700-235514286.jpg").save();
        console.log("res:", result)
    } catch (error) {
        console.log(error)
        return { success: false }
    }
}
