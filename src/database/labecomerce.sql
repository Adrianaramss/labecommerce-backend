-- Active: 1673884655775@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

PRAGMA table_info ('users');

SELECT *FROM users;

INSERT INTO users (id,email,password)
VALUES
('1', 'polianacost@gmail.com','845958'),
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

-------aprofundamento sql ------------------------------------------------------

--Get All Users
SELECT *FROM users;

-----------------------------------------------------------------------

--Get All Products
SELECT *FROM products;

-----------------------------------------------------------------------

--Search Product by name
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca

SELECT *FROM products
WHERE name = 'teclado gammer';

-----------------------------------------------------------------------

-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users

INSERT INTO users (id,email,password)
VALUES ('5','humberto@gmail.com','845245');
-----------------------------------------------------------------------

--Create Product
-- mocke um novo produto
-- insere o item mockado na tabela products

INSERT INTO products (id,name,price,category)
VALUES('P6','Hd externo','401','acessorios');
-----------------------------------------------------------------------

--Get Products by id
-- mocke uma id
-- busca baseada no valor mockado

SELECT *FROM products
WHERE id = 'P4';
-----------------------------------------------------------------------


--Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado

DELETE FROM users
WHERE id = "1";
-----------------------------------------------------------------------

--Delete Product by id
-- mocke uma id
-- delete a linha baseada no valor mockado

DELETE FROM products
WHERE id = "P2";
-----------------------------------------------------------------------

-- --Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados

UPDATE users
SET email = 'juliana@gmail.com'
WHERE id = '2';

-----------------------------------------------------------------------

--Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados

UPDATE products
SET price = '2500'
WHERE id = 'P1';
-----------------------------------------------------------------------
-----Exercício 3
-- Copie as queries do exercício 1 e refatore-as
-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT *FROM users
ORDER BY email ASC;
-----------------------------------------------------------------------
-- Get All Products versão 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item

SELECT *FROM products
ORDER BY price ASC;

-----------------------------------------------------------------------
--Get All Products versão 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT *FROM products
WHERE "price" >= '100' AND price <= '3000'
ORDER BY price ASC