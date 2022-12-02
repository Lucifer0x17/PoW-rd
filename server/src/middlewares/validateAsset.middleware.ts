import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import { throwError } from "../helpers/ErrorHandler.helper";


const validateAsset = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            })
            next()
        } catch (e: any) {
            throwError(400, e.flatten().fieldErrors.body)
        }
    };


export default validateAsset