import express from "express";
import { config } from "dotenv";
import {connectToDatabase} from "./data/db";
import * as path from "path";
const app = express();
config({path: path.join(__dirname, ".env")});

const port = process.env["PORT"];


app.get('/', (_, res) => {
    res.json({
        property: "Hello World!"
    });
});

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`server listening on port ${port}`);
    });
});

