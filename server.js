const  express = require ('express');
const mysql = require('mysql2');
const cors = require('cors');


const server = express();
const port = 9118;
server.listen(port, ()=> {
    console.log(`Server is running!`, port);
});

server.use(cors());
server.use(express.json());

//DATABASE SETUP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'user123',
    database: 'viray_db'
});

db.connect((error)=> {
    if (error) throw error;
    console.log("DATABASE CONNECTED!");   
});

//Get all USERS
server.get(`/users`, (req, res) =>{
    db.query('SELECT * FROM users', (error, result) => {
        if(error) throw error;
        res.json(result);
    });
});


//GET all PRODUCTS
server.get('/products', (req, res) => {
    db.query('SELECT * FROM products', (error, result)=>
    {
        if(error) throw error;
        res.json(result);
    });
});


//GET With Parameter
//USERS
server.get('/users/:id', (req, res) => {
    const {id} = req.params;
db.query('SELECT * FROM users WHERE id = ?', id,(error, result) => {
    if (error) throw error;
    res.json(result);
});
});

//PRODUCTS
server.get('/products/:id', (req, res) => {
    const {id} = req.params;
    db.query('SELECT * FROM products WHERE id = ?', id,(error, result) => {
    if (error) throw error;
    res.json(result);   
    });
});


//POST METHOD
//USERS
server.post ('/users', (req, res)=>{
    console.log(req.body);
    const {id, name, address} = req.body;

    const query = 'INSERT INTO users (id, name, address) VALUES(?,?,?)';
    db.query(query, [id,name, address], (error, result) =>{
        if (error) throw error;
        res.json({message: 'User successfully created!',
            id, name, address});
    });
});

//POST PRODUCTS
server.post('/products', (req,res)=>{
    const {id, name, price} = req.body;
    const createProducts = 'INSERT INTO products (id, name, price) VALUES (?,?,?)';
    
    db.query(createProducts, [id, name, price], (error,result)=>{
        if (error) throw error;
        res.json({
            messsage: 'Product successfully created!',
            id, name, price
        });
    });
});


//PUT METHOD
//USERS
server.put('/users/:id', (req, res) =>{
    const userIdParam = req.params.id;
    const {name, address} = req.body;

    const updateUser = 'UPDATE users SET name = ?, address = ? WHERE id = ?';
    db.query(updateUser,
         [name, address, userIdParam],
         (error, result) =>{
            if (error) throw error;
            res.json({
                status : true,
                message : "Successfulely Updated!"
            });

         });
 });

 //PUT PRODUCTS
 server.put('/products/:id', (req,res)=>{
    const {id} = req.params;
    const {name, price} = req.body;
    const updateProducts = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    
    db.query(updateProducts, [name, price, id], (error,result)=>{
        if (error) throw error;
        res.json({
           status: true,
           message: 'Successfully updated!'
        });
    });
});



 //DELETE METHOD
 //USERS
 server.delete('/users/:id', (req, res) =>{
    const deleteUser = 'Delete from users where id = ?';
    db.query(deleteUser, req.params.id, (error, result) =>
    {   if (error) throw error;
        res.json({
           status: true,
           message: 'Successfully deleted!'
        });
    });
 });




 //DELETE PRODUCTS
 server.delete('/products/:id', (req,res)=>{
    const {id,name,price} = req.body;

    const deleteProducts = 'DELETE FROM products where id = ?';
    
    db.query(deleteProducts, [id, name, price], (error,result)=>{
        if (error) throw error;
        res.json({
           status: true,
           message: 'Successfully deleted!'
        });
    });
});