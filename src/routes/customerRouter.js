import { Router } from "express";
import { listarClientes, listarClientesPorId, inserirCliente, editarClientes } from "../controllers/customerController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { customerSchema } from "../schemas/customerSchema.js";


const customerRouter = Router();
customerRouter.post("/customers",validateSchema(customerSchema), inserirCliente);
customerRouter.get("/customers", listarClientes);
customerRouter.get("/customers/:id", listarClientesPorId);
customerRouter.put("/customers/:id", validateSchema(customerSchema), editarClientes);

export default customerRouter;