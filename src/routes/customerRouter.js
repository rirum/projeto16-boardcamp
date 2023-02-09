import { Router } from "express-router"
import { listarClientes, listarClientesPorId, inserirCliente, editarClientes } from "../controllers/customerController.js"
import { customerSchema } from "../schema/customerSchema.js";


const customerRouter = Router();
customerRouter.post("/customers", inserirCliente);
customerRouter.get("/customers", listarClientes);
customerRouter.get("/customers/:id", customerSchema, listarClientesPorId);
customerRouter.put("/customers/:id", customerSchema, editarClientes);

export default gamesRouter;