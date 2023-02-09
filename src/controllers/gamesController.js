import { db } from "../database/database.js";

//get /games
export async function listarJogos(req,res) {
    
    try {
        const lista = await db.query('SELECT * FROM games');
        res.send(lista.rows)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

//post games
export async function inserirJogos(req,res) {
    const {name, image, stockTotal, pricePerDay } = req.body;
    try {
        // const jogos = await db.query('SELECT * FROM games WHERE name = $1' ,[name,]);
        const inserir = await db.query('INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay]);
        if(inserir.rowCount === 0){
            return res.sendStatus(400);
        }
        res.sendStatus(201);

    } catch(error) {
        res.sendStatus(500);
    }
}