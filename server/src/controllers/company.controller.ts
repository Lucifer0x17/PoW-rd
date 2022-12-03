import { NextFunction, Request, Response } from "express";
import { throwError } from "../helpers/ErrorHandler.helper";
import { asyncWrap } from "../middlewares/async.middleware";
import { getEmployeData } from "../services/lighthouse.service";


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
        res.status(200).json({ success: false });
    } catch (error) {
        console.error(error);
        throwError(400, `${error}`);
    }
});