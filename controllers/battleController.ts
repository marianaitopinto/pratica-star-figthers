import { Request, Response } from "express";
import axios from "axios";

import { battleService } from "../services/battleServices.js";

export async function battle(req: Request, res: Response) {
  const { firstUser, secondUser }: { firstUser: string; secondUser: string } =
    req.body;

  const battleResult = await battleService(firstUser, secondUser);

  res.status(200).send(battleResult);
}
