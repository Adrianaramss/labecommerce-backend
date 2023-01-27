-- Active: 1673884655775@@127.0.0.1@3306


------Criação da tabela de pedidos---------------Relações em SQL I

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL ,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id)


);

DROP TABLE purchases;



INSERT INTO purchases (id, total_price, buyer_id)
VALUES
    ("C1", 3000, "2"),
    ("C3", 70,   "2"),
    ("C4", 590,  "3"),
    ("C6", 401,  "3");


SELECT * FROM purchases;


-- UPDATE purchases
-- SET created_at = DATETIME ("NOW")
-- WHERE ID = "C1";


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "2";
