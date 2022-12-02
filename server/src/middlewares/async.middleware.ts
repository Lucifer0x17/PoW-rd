import { NextFunction, RequestHandler, Response, Request } from 'express';

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

export const asyncWrap =
    (handler: AsyncHandler): RequestHandler =>
        async (req, res, next) =>
            handler(req, res, next).catch(next);
