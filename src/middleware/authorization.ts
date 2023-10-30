import {NextFunction, Request, Response} from "express";
import {getUserRoles} from "../data/roles";

function authorization(...roles: string[]): Function {
    return async function (req: Request, res: Response, next: NextFunction) {
        const userId = res.locals.userId;
        const userRoles = await getUserRoles(userId);
        if (userRoles.some(item => roles.includes(item))) {
            next();
            return;
        }
        res.status(403).json({
            message: "You are not allowed to do this action"
        });
    }
}