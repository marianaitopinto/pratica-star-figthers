import { Router } from "express";

import battleRouter from "./battleRouter";
import rankingRouter from "./rankingRouter";

const routers = Router();

routers.use(battleRouter);
routers.use(rankingRouter);

export default routers;