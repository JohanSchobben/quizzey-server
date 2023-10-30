import {User} from "../models/user";
import {database} from "./db";

export function createUser(user: User): Promise<void> {
    return database.transaction(async function (trx) {
        const userId = await trx.insert({
            username: user.username,
            email: user.email,
            password: user.password
        }).returning("id").into("users");

        const { id: userRoleId} = await database("roles").select({id: 'id'}).where("role", "player").first();
        await trx.insert({
            "role_id": userRoleId,
            "user_id": userId
        });
    });
}