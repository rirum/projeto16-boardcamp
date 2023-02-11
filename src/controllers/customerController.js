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
    // const {id} = req.params;
    const idCustomer = Number(req.params.id);
    if (!idCustomer || idCustomer < 1 ) {
        return res.sendStatus(400);
    }
    try {
        const resultado = await db.query('SELECT * FROM customers WHERE id = $1', [idCustomer]);
        
       if (resultado.rowCount === 0) {return res.sendStatus(404) };
       return res.status(200).send(resultado.rows[0])
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
    
    // if(!name || !phone || !cpf || !birthday ){
    //     return res.sendStatus(400);
    // }
    
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

    const {name, phone, cpf, birthday} = req.body;
    const {id } = req.params;

    // const idCustomer = Number(req.params.id);
    // if (!idCustomer || idCustomer < 1 ) {
    //     return res.sendStatus(400);
    // }


    try{

        const existeCpf = await db.query("SELECT * FROM customers WHERE cpf = $1 AND id <> $2", [cpf, id]);
        if (existeCpf.rowCount > 0) { res.sendStatus(409)};

        const editaCliente = await db.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5", [name, phone,cpf, birthday, id]);
       
        if (editaCliente.rowCount === 0) {return res.sendStatus(400);
        }
        res.sendStatus(200);
        }catch(error){
        res.sendStatus(500);
    }
}
