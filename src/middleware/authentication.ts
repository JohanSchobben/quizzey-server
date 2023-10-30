import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/jwt";

export async function authenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["Authentication"].slice(7, req.headers['Authentication'].length);
    console.log(token);
    const verified = await verifyToken(token).catch(() => res.status(401).json({message: "Something went wrong verifying token"}));
    if (verified) {
        res.locals.userId = verified;
        next();
        return;
    }
    res.status(401).json({
        message: "You are not logged in"
    });
}