import { config } from "dotenv";
import path from "path";
config({path: path.join(__dirname, "..", ".env")});

type EnvironmentVariable = "DATABASE_NAME"
    | "DATABASE_USER"
    | "DATABASE_PASSWORD"
    | "DATABASE_HOST"
    | "DATABASE_PORT"
    | "PORT"
    | "SUPER_ADMIN_EMAIL"

export function getEnvironmentValue(property: EnvironmentVariable): string {
    return process.env[property];
}