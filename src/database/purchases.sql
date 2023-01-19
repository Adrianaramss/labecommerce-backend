-- Active: 1673884655775@@127.0.0.1@3306


------Criação da tabela de pedidos---------------Relações em SQL I

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT, 
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)

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
