import express from "express"
import cors from "cors"
// import routers from 
import gamesRouter from "./routes/gamesRouter.js";
import customerRouter from "./routes/customerRouter.js";
const PORT = 5000;

const server = express();

server.use(express.json());
server.use(cors());
// server.use(routers);

// rotas em breve
server.use([gamesRouter, customerRouter]);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})