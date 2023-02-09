import {db} from "../database/database.js";

//get customers
export async function listarClientes(req, res){
    try {
        const clientes = await db.query('SELECT * FROM customers');
        res.send(clientes.rows)
    } catch(error) {
        res.status(500).send(error.message)
    }
}

//get customers by id
export async function listarClientesPorId(req, res){

    
}

//post customers
export async function inserirCliente(req, res){

    
}

//put customers
export async function editarClientes(req, res){

    
}