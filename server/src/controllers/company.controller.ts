import { NextFunction, Request, Response } from "express";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { sendNotification } from "../services/epns.service";
import { getEmployeData } from "../services/lighthouse.service";
import { fetchMyNfts } from "../services/revise.service";


export const getAllEmployees = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employees = await getEmployeData("0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2")
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const getCurrentBalance = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: false });
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const nextPayoutBalance = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: false });
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const withdrawableAmount = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({ success: false });
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const postAddEmployee = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // notification to employeee
        await sendNotification({ msgTitle: "Added to team", msgBody: "You have been addeed to the team." }, "") // add address
        res.status(200).json({ success: false });
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const getMyNfts = asyncWrap(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nfts = await fetchMyNfts()
        res.status(200).json(nfts);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});


export const verifyInvoiceForFreelancer = asyncWrap(async (req: Request<{}, {}, { isVerified: boolean }>, res: Response, next: NextFunction) => {
    const { isVerified } = req.body;
    try {
        if (!isVerified) {
            await sendNotification({ msgTitle: "Invoice Rejected", msgBody: "Your Invoice have been rejected please talk to your employer" }, "") // add address of the employer
            res.status(201).json({ message: "invoice have been rejected" })
        }
        // contact the smart contract here
        await sendNotification({ msgTitle: "Invoice Accepted", msgBody: "Yay!!!... Your Invoice have been accepted." }, "") // add address of the employer
        res.status(201).json({ message: "invoice have been accepted" })
        const employees = await getEmployeData("0xa60f738a60BCA515Ac529b7335EC7CB2eE3891d2")
        res.status(200).json(employees);
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});