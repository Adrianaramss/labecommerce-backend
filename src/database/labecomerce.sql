-- Active: 1673884655775@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

PRAGMA table_info ('users');

SELECT *FROM users;

INSERT INTO users (id,email,password)
VALUES('1', 'polianacost@gmail.com','845958'),
('2', 'mariac@gmail.com','955542'),
('3', 'robertolima1@gmail.com','121524');



CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);


PRAGMA table_info ('products');

SELECT *FROM products;

INSERT INTO products (id,name,price,category)
VALUES
('P1', 'notebook','3000','eletrônicos'),
('P2', 'headset gamer','106','acessorios'),
('P3', 'teclado gammer','70','acessorios'),
('P4', 'monitor 21.6 ','590','eletrônicos'),
('P5', 'mouse gamer','45','acessorios');

