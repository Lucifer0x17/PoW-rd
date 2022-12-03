import { z, TypeOf } from "zod";


export const createNftSchema = z.object({
    body: z.object({
        walletAddress: z.string({
            required_error: "Wallet address is required"
        }),
        name: z.string({
            required_error: "Please provide the name of the NFT."
        }),
        description: z.string({
            required_error: "Please provide description."
        }),
        amount: z.number({
            required_error: "Amount is required"
        })
    })
})

const nftData = z.object({
    name: z.string({
        required_error: "Please provide the name of the NFT."
    }),
    description: z.string({
        required_error: "Please provide description."
    }),
    image: z.string(),
    tokenId: z.string(),

})

export type CreateNftInput = TypeOf<typeof createNftSchema>['body']

export type NftDataInput = TypeOf<typeof nftData>

export type NftPropertiesInput = {
    amount?: number;
    isCleared?: string;
    walletAddress?: string;
    isVerified?: string;
    companyAddress?: string;
}[]