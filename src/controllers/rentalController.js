import { db } from "../database/database.js";

//get /rentals
export async function listarAluguel(req,res) {
    
    try {
        const lista = await db.query(`
        SELECT rentals.*,
        json_build_object('id', customers.id, 'name', customers.name) AS customer,
        json_build_object('id', games.id, 'name', games.name ) AS game
        FROM
        rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id;`
        )
        res.send(lista.rows);
    } catch(error) {
        res.status(500).send(error.message)
    }
}

//post /rentals

export async function inserirAluguel(req, res){
    try{

    }catch(error){

    }
}

//post POST /rentals/:id/return

export async function concluirAluguel(req,res){
    try{

    }catch(error){

    }
}

//delete DELETE /rentals/:id
export async function apagarAluguel(req,res){
    const { id } = req.params;
    try{
        await db.query("DELETE FROM rentals WHERE id = $1;" [id]);
        res.sendStatus(200);
    }catch(error){
        res.sendStatus(500);
    }
}