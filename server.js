const  express = require ('express');
const mysql = require('mysql2');
const cors = require('cors');


const server = express();
const port = 3323;
server.listen(port, ()=> {
    console.log(`Server is running!`, port);
});

server.use(cors());
server.use(express.json());

//DATABASE SETUP
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'M@x3rm4n123',
    database: 'lexie_db'
});

db.connect((error)=> {
    if (error) throw error;

    console.log("DB CONNECTED !");   

});

//Get
server.get(`/users`, (req, res) =>{
    db.query('SELECT * FROM users', (error, result) => {
        res.json(result);
        console.log(result);
    });
});

server.get('/address', (req, res) => {
    db.query('SELECT * FROM address', (error, result)=>
    {
        if(error) throw error;
        res.json(result);
        console.log(result);
    });
});

//With Parameter
server.get('/user/:user_id', (req, res) => {
    console.log(req);
db.query('SELECT * FROM users WHERE id = ?', 
    req.params.user_id, 
    
    (error, result) => {
    if (error) throw error;
    console.log(res);
    res.json(result);

});
});



//POST METHOD
server.post ('/create-user', (req, res)=>{
    console.log(req.body);
    const {id, name, NICKNAME} = req.body;

    console.log("User Nickname", NICKNAME);
    const query = 'INSERT INTO users (id, name, NICKNAME) VALUES(?,?,?)';
    db.query(query, [id,name, NICKNAME], (error, result) =>{
        if (error) throw error;
        res.json(result);
        console.log(result);
    });
});


//POST ADDRESS
server.post('/create-address', (req, res) =>{
    const {id, address_name} = req.body;

    db.query('INSERT INTO address(id, address_name) VALUES(?,?)', [id, address_name], (error, result) =>
{   
    if (error) throw error;
    res.json(result)
    console.log(result);
});
});



//POST METHOD

server.post('/create-user2', (req, res) => {
    const {id, name} = req.body;

    const createuser = 'INSERT INTO users (id, name, NICKNAME) VALUES (?,?,?)'
    db.query(createuser, [id, name, nickname],
         (error, result) =>{
        if (error) throw error;
        res.json(result);
        console.log(result);
    });
});

//PUT METHOD
server.put('/update-user/:id', (req, res) =>{
    const userIdParam = req.params.id;
    const {name, NICKNAME} = req.body;

    const updateUser = 'UPDATE users SET name = ?, NICKNAME = ? WHERE id = ?';
    db.query(updateUser,
         [name, NICKNAME, userIdParam],
         (error, result) =>{
            if (error) throw error;
            res.json({
                status : true,
                message : "Successfulely Updated!"
            });

         });
 });



 //DELETE METHOD
 server.delete('/delete-user/:id', (req, res) =>{
    const deleteUser = 'Delete from users where id = ?';
    db.query(deleteUser, req.params.id, (error, result) =>
    {   if (error) throw error;
        res.json(result);
        console.log(result);
    });
 });

 server.delete('/delete-all/users', (req, res) => {
        const deleteAllUsers = 'DELETE FROM users';
        db.query(deleteAllUsers, (error, result) => {
            if (error) throw error;
            res.json(result);
            console.log(result);
        })
 });