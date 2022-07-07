import { Router } from "express";

import battleRouter from "./battleRouter.js";
import rankingRouter from "./rankingRouter.js";

const routers = Router();

routers.use(battleRouter);
routers.use(rankingRouter);

export default routers;
