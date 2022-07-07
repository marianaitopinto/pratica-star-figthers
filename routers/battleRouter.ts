import { Router } from "express";

import { battle } from "../controllers/battleController.js";

const battleRouter = Router();

battleRouter.post("/battle", battle)

export default battleRouter;