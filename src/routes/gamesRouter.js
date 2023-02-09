import { Router } from "express";

import { listarJogos, inserirJogos } from "../controllers/gamesController.js";

const gamesRouter = Router();
gamesRouter.post("/games", inserirJogos);
gamesRouter.get("/games", listarJogos);

export default gamesRouter;