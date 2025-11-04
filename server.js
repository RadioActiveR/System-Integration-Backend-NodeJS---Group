const dotenv = require('dotenv');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
dotenv.config();

// Create Express db
const app = express();
const port = 3323;



// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB 
});


// Connect to database
db.connect((error) => {
    if (error) throw error;
    console.log('Connected to database!');

    // Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

});


// ===== USERS =====

// Get all users
app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error getting users');
            return;
        }
        res.json(result);
    });
});

// Get one user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'SELECT * FROM users WHERE id = ?';
    
    db.query(sql, [userId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error getting user');
            return;
        }
        
        res.json(result);
    });
});


// Create new user
app.post('/users', (req, res) => {
    const { id, name } = req.body;
   
  if (!id || !name) {
        res.status(400).send('ID and name are required');
        return;
    }
    
    const sql = 'INSERT INTO users (id, name) VALUES (?, ?)';
    db.query(sql, [id, name], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error creating user');
            return;
        }
        res.json({ id: id, name: name });
    });
});


// Update user
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    
    if (!name) {
        res.status(400).send('Name is required');
        return;
    }
    
    const sql = 'UPDATE users SET name = ? WHERE id = ?';
    db.query(sql, [name, userId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error updating user');
            return;
        }
        
        res.json({ id: userId, name: name });
    });
});

// Delete user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    
    db.query(sql, [userId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error deleting user');
            return;
        }
        res.send('User deleted');
    });
});


// ===== PRODUCTS =====

// Get all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error getting products');
            return;
        }
        res.json(result);
    });
});

// Get one product by ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'SELECT * FROM products WHERE id = ?';
    
    db.query(sql, [productId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error getting product');
            return;
        }
        
        
        res.json(result[0]);
    });
});

// Create new product
app.post('/products', (req, res) => {
    const { id, name, price } = req.body;
    
    if (!id || !name || price === undefined) {
        res.status(400).send('ID, name, and price are required');
        return;
    }

    const sql = 'INSERT INTO products (id, name, price) VALUES (?, ?, ?)';
    db.query(sql, [id, name, price], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error creating product');
            return;
        }
        res.json({ 
            id: id, 
            name: name, 
            price: price
        });
    });
});

// Update product
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const { name, price } = req.body;
    
    if (!name || price === undefined) {
        res.status(400).send('Name and price are required');
        return;
    }
    
    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.query(sql, [name, price, productId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error updating product');
            return;
        }
        
        res.json({ 
            id: productId, 
            name: name, 
            price: price 
        });
    });
});

// Delete product
app.delete('/products/:id', (req, res) => {
    const productId = req.params.id;
    const sql = 'DELETE FROM products WHERE id = ?';
    
    db.query(sql, [productId], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error deleting product');
            return;
        }
        
        res.json({ 
            message: 'Product deleted successfully',
            id: productId
        });
    });
});

// Add product to user
app.post('/user-products', (req, res) => {
    const { user_id, product_id } = req.body;
    
    if (!user_id || !product_id) {
        res.status(400).send('User ID and Product ID are required');
        return;
    }
    
    const sql = 'INSERT INTO user_products (user_id, product_id) VALUES (?, ?)';
    db.query(sql, [user_id, product_id], (error, result) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error adding product to user');
            return;
        }
        res.json({ 
            user_id: user_id, 
            product_id: product_id
        });
    });
});

// Get user's products
app.get('/users/:userId/products', (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT p.* FROM products p ' +
                'JOIN user_products up ON p.id = up.product_id ' +
                'WHERE up.user_id = ?';
    
    db.query(sql, [userId], (error, results) => {
        if (error) {
            console.log('Error:', error);
            res.status(500).send('Error getting user products');
            return;
        }
        res.json(results);
    });
});

