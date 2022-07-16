import { Request, Response } from "express";

import { find } from "../services/battleServices.js";

export async function getRanking(req: Request, res: Response) {
  const ranking = await find();
  res.send(ranking);
}
