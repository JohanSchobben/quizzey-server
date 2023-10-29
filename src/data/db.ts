import {Connection, createConnection} from "mariadb";

export let connection: Connection;
export async function connectToDatabase() {
    connection = await createConnection({
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT)
    });

    process.on("exit", function () {
        if (connection) {
            connection.end();
        }
    });
}
