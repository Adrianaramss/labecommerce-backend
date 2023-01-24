-- Active: 1673884655775@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL
);
 DROP TABLE users;
PRAGMA table_info ('users');

SELECT *FROM users;

INSERT INTO users (id, name,email,password)
VALUES
('1', 'poliana','polianacost@gmail.com','845958'),
('2','maria', 'mariac@gmail.com','955542'),
('3', 'roberto','robertolima1@gmail.com','121524');



CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL

    

);
DROP TABLE products;

PRAGMA table_info ('products');

SELECT *FROM products;

INSERT INTO products (id,name,price,description, "imageUrl")
VALUES
('P1', 'notebook','3000','eletrônicos', 'http://...'),
('P2', 'headset gamer','106','acessorios', 'http://...'),
('P3', 'teclado gammer','70','acessorios', 'http://...'),
('P4', 'monitor 21.6 ','590','eletrônicos','http://...'),
('P5', 'mouse gamer','45','acessorios', 'http://...');

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
ORDER BY price ASC;



------Criação da tabela de pedidos---------------Relações em SQL I

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id),
    create_at TEXT DEFAULT (DATETIME()) NOT NULL


);

DROP TABLE purchases;



INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ("C1", 3000, "0", "2"),
    ("C3", 70,  "0", "2"),
    ("C4", 590,  "0", "3"),
    ("C6", 401,  "0", "3");


SELECT * FROM purchases;


UPDATE purchases
SET delivered_at = DATETIME ("NOW")
WHERE ID = "C1";


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "2";


---Criação da tabela de relações purchases_products

CREATE TABLE purchases_products (
 purchase_id TEXT NOT NULL,
 product_id TEXT NOT NULL,
 quantity INTEGER NOT NULL,
 FOREIGN KEY (purchase_id) REFERENCES purchases(id),
 FOREIGN KEY (product_id) REFERENCES products(id)

);

DROP TABLE purchases_products;

INSERT INTO purchases_products (purchase_id, product_id, quantity)
VALUES
   ("C3", "P3", 1),
   ("C4", "P4", 2),
   ("C6", "P6", 1);


  SELECT * FROM purchases_products;

SELECT purchases.id AS purchasesId,
products.id AS productsId,
products.name,
purchases_products.quantity
FROM purchases_products
INNER JOIN purchases 
ON purchases_products.purchase_id = purchasesId
INNER JOIN products
ON purchases_products.product_id = productsId;