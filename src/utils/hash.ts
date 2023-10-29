import {hash as bcryptHash, compare as bcryptCompare } from "bcrypt";

export function hash(plaintextPassword: string): Promise<string> {
    return new Promise((resolve, reject) => {
        bcryptHash(plaintextPassword, 12, function (err, encrypted) {
            if (err) {
                reject(err);
            } else  {
                resolve(encrypted);
            }
        });
    });
}

export function compare(password: string, hashedPassword: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        bcryptCompare(password, hashedPassword, (err, same) => {
            if (err) {
                reject(err);
            } else {
                resolve(same);
            }
        })
    })
}