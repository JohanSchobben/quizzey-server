import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../utils/jwt";

export async function authenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["authorization"]?.slice(7, req.headers['authorization']?.length);
    console.log(token);
    if (!token) {
        res.status(401).json({
            message: "You are not logged in"
        })
        return;
    }

    try {
        const verified = await verifyToken(token);
        if (verified) {
            res.locals.userId = verified;
            next();
            return;
        }
        res.status(401).json({
            message: "You are not logged in"
        });
    } catch {
        res.status(401).json({message: "Something went wrong verifying token"});
    }


}