import knex from "knex";
import {getEnvironmentValue} from "../utils/env";


export const database = knex({
    client: "mysql",
    connection: {
        user: getEnvironmentValue("DATABASE_USER"),
        database: getEnvironmentValue("DATABASE_NAME"),
        password: getEnvironmentValue("DATABASE_PASSWORD"),
        host: getEnvironmentValue("DATABASE_HOST"),
        port: Number(getEnvironmentValue("DATABASE_PORT"))
    }
});
