-- Active: 1673884655775@@127.0.0.1@3306



CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL

);

Drop TABLE products;

PRAGMA table_info ('products');

SELECT *FROM products;

INSERT INTO products (id,name,price,description, imageUrl)
VALUES
('P1', 'notebook','3000','eletrônicos', 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY'),
('P2', 'headset gamer','106','acessorios', 'https://imgs.casasbahia.com.br/1531288905/1xg.jpg?imwidth=500'),
('P3', 'teclado gammer','70','acessorios', 'https://m.media-amazon.com/images/I/718-DlUkzWL._AC_SY450_.jpg'),
('P4', 'monitor 21.6 ','590','eletrônicos','https://nissei.com/media/catalog/product/cache/16a9529cefd63504739dab4fc3414065/l/e/len-66d2kcc6us_-_2.jpg'),
('P5', 'mouse gamer','45','acessorios', 'https://images.tcdn.com.br/img/img_prod/1041964/mouse_gamer_evolut_rayden_eg_104rb_75_1_c6e0cc5b93b83fa980e64a8ba4a4d17b.jpg');

---------------------------------------------------------------------

--Get All Products
SELECT *FROM products;

-----------------------------------------------------------------------


--Search Product by name
-- mocke um termo de busca, por exemplo "monitor"
-- retorna o resultado baseado no termo de busca

SELECT *FROM products
WHERE name = 'teclado gammer';

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
--Delete Product by id
-- mocke uma id
-- delete a linha baseada no valor mockado

DELETE FROM products
WHERE id = "P2";
-----------------------------------------------------------------------


--Edit Product by id
-- mocke valores para editar um product
-- edite a linha baseada nos valores mockados

UPDATE products
SET price = '2500'
WHERE id = 'P1';
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

-----------------------------------------------------------------------
