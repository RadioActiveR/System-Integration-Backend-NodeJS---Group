
|               **Activity 3**                 |


| **Component**                 | **Criteria**                                                | **Max Points** |
| ----------------------------- | ----------------------------------------------------------- | -------------- |
| **Server Setup**              | Express server is correctly initialized                     | 20             |✅
|                               | Server listens on a valid port and logs confirmation        | 10             |✅
| **Database Setup**            | MySQL2 is properly imported and configured                  | 20             |✅
|                               | Database connection is established and logs success         | 20             |✅
|                               | Error handling for DB connection is implemented             | 10             |✅
| **Code Quality**              | Code is clean, readable, and modular                        | 10             |✅
| **package.json Requirements** | Includes required dependencies: `express`, `mysql2`, `cors` | 5              |✅
|                               | `author` field is present and not empty                     | 2.5            |✅
|                               | `description` field is present and not empty                | 2.5            |✅



|       **Database MySQL2**                 |

create database harv_dbs;

Select harv_dbs;

create table users (
 `id` INT PRIMARY KEY,
 `name` VARCHAR(255), `address` VARCHAR(255)
);

insert into users (id, name,address) values
(1, 'harvey','Bais City'),
(2, 'ciara','Pamplona'),
(3, 'lexie','Dumaguete City'),;
(4, 'viray','Dumaguete City');
(5, 'cornelius','Dipolog City');     
(6, 'biance','Sibulan');     
(7,'Irald','Tanjay City');


create table products (
 `id` INT PRIMARY KEY,
 `name` VARCHAR(255),
 `price` DECIMAL(10, 2)
);

insert into products (id, name, price) values
(1, 'Laptop', 60000),
(2, 'Smartphone', 10000),
(3, 'Tablet', 15999);
(4, 'Monitor', 6890);
(5, 'Mechanical Keyboard', 2800);
(6, 'Gaming Mouse', 1500);



|           **Server**                 |

npm init
Author: Harvey Masalihit
Description: Activity for SIA and DBMS
github:harvey404
npm install express mysql2 cors

node.index.js

http://127.0.0.1:3000/users
http://127.0.0.1:3000/products


### 🔹 **Activity 4: GET Method – View All & View by ID**

**Points: 100**

| Criteria                                                     | Max Points |
| ------------------------------------------------------------ | ---------- |
| Implements GET `/users` and `/products` to fetch all records | 30         |
| Implements GET `/user/:id` and `/product/:id` to fetch by ID | 30         |
| Uses parameterized queries to prevent SQL injection          | 20         |
| Handles errors and sends proper JSON responses               | 10         |
| Code is clean and logically structured                       | 10         |
