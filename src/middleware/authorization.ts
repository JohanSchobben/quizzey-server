import {NextFunction, Request, Response} from "express";
import {getUserRoles} from "../data/roles";
import {getEnvironmentValue} from "../utils/env";

function authorization(...roles: string[]): Function {
    return async function (req: Request, res: Response, next: NextFunction) {
        const superAdminEmail = getEnvironmentValue("SUPER_ADMIN_EMAIL");
        let userId = res.locals.userId;
        let userEmail = res.locals.username;
        if (!userId) {
            res.status(401).json({
                "message": "no token to authorize the user"
            });
        }

        if (userEmail === superAdminEmail) {
            next();
            return;
        }

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