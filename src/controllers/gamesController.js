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
      
        if(!name || stockTotal <= 0 || pricePerDay <= 0 ){
            return res.sendStatus(400);
        }

        const jogoJaExiste = await db.query('SELECT * FROM games WHERE name = $1' ,[name,]);
        
        if(jogoJaExiste.rows.length !== 0){
            return res.sendStatus(409);
        }

        await db.query('INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)', [name, image, stockTotal, pricePerDay]);
        res.sendStatus(201);

    } catch(error) {
        res.sendStatus(500);
    }
}