import express from "express";
import router from "./router/routes";
import {getEnvironmentValue} from "./utils/env";
const app = express();

const port = Number(getEnvironmentValue("PORT"))
console.log(port)
app.use(express.json());

app.use('/api', router)
app.listen(port, () => {
console.log(`server listening on port ${port}`);
});

