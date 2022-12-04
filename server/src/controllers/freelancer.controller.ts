import { NextFunction, Request, Response } from "express";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { CreateNftInput } from "../schemas/nft.schema";
import { fetchMyNfts } from "../services/revise.service";
import getEns from "../utils/ensProvider";


export const verifyEnsRoute = asyncWrap(async (req: Request<{}, {}, { ensAddresss: string }>, res: Response, next: NextFunction) => {
    const { ensAddresss } = req.body;
    try {
        const data = await getEns(ensAddresss)
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const filterVerifiedNft = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nfts = await fetchMyNfts();
        // get the data from revise
        res.status(200).json(nfts);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});

export const generateNft = asyncWrap(async (req: Request<{}, {}, CreateNftInput>, res: Response, next: NextFunction) => {
    const { amount, companyAddress, description, name, walletAddress } = req.body
    try {

        // get the data from revise
        // res.status(200).json(nfts);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});

