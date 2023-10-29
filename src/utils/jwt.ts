import jwt from "jsonwebtoken";
import {promises} from "fs";
import path from "path";


/*
 *  ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key
 *  # Don't add passphrase
 *  openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pub
 *  cat jwt.key
 *  cat jwt.key.pub
 */

const secret = promises.readFile(path.join(__dirname, "..", "jwt.key"), "utf8");

export function createToken(userId: string): Promise<{ token: string; expires: Date }> {
    return secret.then(secret => {
        return new Promise((res, rej) => {
            jwt.sign({userId}, secret, {algorithm: "RS256", expiresIn: "2h"}, function (err, token) {
                const date = new Date();
                date.setHours(date.getHours()+2);
                if (err) {
                    rej(err);
                    return;
                }
                res({
                    token,
                    expires: date
                });
            });
        });
    })

}


export function verifyToken(token): Promise<string> {
    return new Promise((res, rej) => {
        jwt.verify(token, process.env["JWT_SECRET"], function (error, decoded) {
            if (error) {
                rej(error);
                return;
            }
            res(decoded.userId)
        })
    })
}