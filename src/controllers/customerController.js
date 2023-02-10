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
    const {id} = req.params;
    try {
        const customerId = await db.query('SELECT * FROM customers WHERE id = $1', [id]);
        
       if (customerId.rows.length === 0) return res.sendStatus(404)
    } catch(error){
        res.status(500).send(error.message);
    }

    
}

//post customers
export async function inserirCliente(req, res){
const {name, phone, cpf, birthday} = req.body;
try {
    const customerCpf = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
    if (customerCpf.rowCount > 0)
    return res.status(409).send("Esse CPF já existe");

    const result = await db.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)', [name, phone, cpf, birthday]);
    if (result.rowCount === 0){
        return res.sendStatus(400);
    }
        res.sendStatus(201);
}catch(error) {
    res.status(500).send(error.message)
}
    
}

//put customers
export async function editarClientes(req, res){

    
}