
-- Create database
CREATE DATABASE IF NOT EXISTS lexie_db;
USE lexie_db;

-- Users table
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

-- Products table
CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2)
);

-- User-Products relationship table
CREATE TABLE user_products (
    user_id INT,
    product_id INT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(product_id) REFERENCES products(id)
);

-- Insert sample users
INSERT INTO users (id, name) VALUES 
(1, 'Lexie'),
(2, 'Vincent'),
(3, 'Yocor');

-- Insert sample products
INSERT INTO products (id, name, price) VALUES 
(1, 'Laptop', 999.99),
(2, 'Phone', 699.99),
(3, 'Headphones', 199.99);

INSERT INTO user_products (user_id, product_id) VALUES 
(1, 1),  
(1, 3),  
(2, 2),  
(3, 1),  
(3, 2),  
(3, 3);  











-->WANI LABUT
queries
sql statements or queries
where clause


specific row

--For tables Delete
DROP TABLE users;

-- delete statement for rows in tables  
DELETE FROM users WHERE id = 3;

=== ADD COLUMN ===

ALTER TABLE users add email VARCHAR(255);

=== DROP COLUMN ===

ALTER TABLE users drop column email;

=== UPDATE THE ROW ====

UPDATE users set NICKNAME = 'Lex' where id = 1;




