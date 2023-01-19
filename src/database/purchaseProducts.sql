-- Active: 1673884655775@@127.0.0.1@3306


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