
create table users (
 `id` INT PRIMARY KEY,
 `name` VARCHAR(255) 
);




CREATE TABLE address (
    `id` INT PRIMARY KEY,
    address_name VARCHAR(255)
);

CREATE TABLE user_address(
    `user_id` INT,
    `address_id` INT,
    FOREIGN KEY(`user_id`) REFERENCES users(`id`),
    FOREIGN KEY(`address_id`) REFERENCES address(`id`)
);



insert into users (id, name) values(1,'Lexie');
insert into users(id, name) values(2,'Vincent');
insert into users(id, name) values(3,'Yocor');


insert into address(id, address_name) values(1,'Candau-ay');
insert into address(id, address_name) values(2,'Bacong');
insert into address(id, address_name) values(3,'Dumaguete');


insert into user_address(user_id,address_id) values(1,1);
insert into user_address(user_id,address_id) values(2,3);
insert into user_address(user_id, address_id) values(3,2);

select * from users;
select * from address;
select * from user_address;

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




