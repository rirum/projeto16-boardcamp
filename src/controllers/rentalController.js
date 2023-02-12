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
    const { customerId, gameId, daysRented } = req.body;

    try {
      let customer = await db.query("SELECT * FROM customers WHERE id = $1", [
        customerId,
      ]);
  
      if (customer.rowCount === 0) {
        return res.sendStatus(400);
      }
  
      customer = customer.rows[0];
  
      let game = await db.query("SELECT * FROM games WHERE id = $1", [gameId]);
  
      if (game.rowCount === 0) {
        return res.sendStatus(400);
      }
  
      game = game.rows[0];
  
      if (daysRented < 1) {
        return res.sendStatus(400);
      }
  
      let rentals = await db.query(
        'SELECT * FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL ',
        [gameId]
      );
  
      if (rentals.rowCount >= game.stockTotal) {
        return res.sendStatus(400);
      }
  
      let originalPrice = daysRented * game.pricePerDay;
  
      let rent = {
        customerId: customerId,
        gameId: gameId,
        daysRented: daysRented,
        rentDate: new Date(Date.now()),
        originalPrice: originalPrice,
      };
  
      const result = await db.query(
        'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice") VALUES($1, $2, $3, $4, $5)',
        [
          rent.customerId,
          rent.gameId,
          rent.daysRented,
          rent.rentDate,
          rent.originalPrice,
        ]
      );
  
      if (result.rowCount === 0) {
        return res.sendStatus(400);
      }
  
      res.sendStatus(201);

    }catch(error){
        res.status(500).send(error.message);
    }
}

//post POST /rentals/:id/return

export async function concluirAluguel(req,res){
    const {id} = req.params;

    try{
        let rentals = await db.query("SELECT * from rentals WHERE id = $1", [id]);

        if (rentals.rowCount === 0) {
          return res.sendStatus(404);
        }
    
        const rental = rentals.rows[0];
    
        if (rental.returnDate) {
          return res.sendStatus(400);
        }
    
        let game = await db.query("SELECT * FROM games WHERE id = $1", [
          rental.gameId,
        ]);
    
        game = game.rows[0];
    
        let delayFee = 0;
    
        const returnDate = new Date(Date.now());
    
        const diff = returnDate - rental.rentDate;
    
        let diffDays = diff / (1000 * 60 * 60 * 24);
        diffDays = parseInt(diffDays | 0);
    
        if (diffDays > rental.daysRented) {
          delayFee =
            game.pricePerDay * (diffDays - parseInt(rental.daysRented | 0));
        }
    
        await db.query(
          'UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3',
          [returnDate, delayFee, id]
        );
    
        res.sendStatus(200);
    }catch(error){
        res.status(500).send(error.message);
    }
}

//delete DELETE /rentals/:id
export async function apagarAluguel(req,res){
    const { id } = req.params;
    try{
        let rentals = await db.query("SELECT * FROM rentals WHERE id = $1;" [id]);
        if (rentals.rowCount === 0) {
            return res.sendStatus(404);
          }

          const rental = rentals.rows[0];

          if (!rental.returnDate) {
            return res.sendStatus(400);
          }
      
          await db.query("DELETE FROM rentals WHERE id = $1", [id]);

          res.sendStatus(200)


    }catch(error){
        res.status(500).send(error.message);
    }
}