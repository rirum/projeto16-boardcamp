import { Router } from "express";

import { apagarAluguel, concluirAluguel, inserirAluguel, listarAluguel } from "../controllers/rentalController.js";

const rentalRouter = Router();

rentalRouter.get("/rentals", listarAluguel);
rentalRouter.post("/rentals", inserirAluguel);
rentalRouter.post("/rentals/:id/return",concluirAluguel )
rentalRouter.delete("/rentals/:id", apagarAluguel);
export default rentalRouter;