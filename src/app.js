import express from "express"
import cors from "cors"

import gamesRouter from "./routes/gamesRouter.js";
import customerRouter from "./routes/customerRouter.js";
import rentalRouter from "./routes/rentalRouter.js";
const PORT = 5000;

const server = express();

server.use(express.json());
server.use(cors());



server.use([gamesRouter, customerRouter, rentalRouter]);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})