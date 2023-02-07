import express from "express"
import cors from "cors"
const PORT = 5000;

const server = express();

server.use(express.json());
server.use(cors());

// rotas em breve
// server.use([])

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})