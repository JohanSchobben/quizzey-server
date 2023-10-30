import {database} from "./db";

export function getUserRoles(userId: string): Promise<string[]> {
    return database({ur: "users_roles", r: "roles"})
        .select("r.role")
        .where("ur.user_id", userId)
        .whereRaw("?? = ??", ['ur.role_id', "r.id"]);
}