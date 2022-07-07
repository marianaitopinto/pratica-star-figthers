import express from "express";

import routers from "./routers";

const app = express();

app.use(routers);

app.listen(5000, () => console.log(`Rodando!!!`))