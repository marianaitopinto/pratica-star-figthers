import express from "express";

import routers from "./routers/index.js";
import handleError from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(express.json());

app.use(routers);
app.use(handleError);

app.listen(5000, () => console.log(`Rodando!!!`))