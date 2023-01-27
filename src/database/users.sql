-- Active: 1673884655775@@127.0.0.1@3306



CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    create_at TEXT DEFAULT (DATETIME()) NOT NULL
);
-----------------------------------------------------------------------
 DROP TABLE users;

PRAGMA table_info ('users');
--Get All Users
SELECT *FROM users;

-----------------------------------------------------------------------

-- Get All Users
-- retorna o resultado ordenado pela coluna email em ordem crescente

SELECT *FROM users
ORDER BY email ASC;

-----------------------------------------------------------------------


-- Create User
-- mocke um novo usuário
-- insere o item mockado na tabela users

INSERT INTO users (id,email,password)
VALUES ('5','humberto@gmail.com','845245');
-----------------------------------------------------------------------



INSERT INTO users (id, name,email,password)
VALUES
('1', 'poliana','polianacost@gmail.com','845958'),
('2','maria', 'mariac@gmail.com','955542'),
('3', 'roberto','robertolima1@gmail.com','121524');

-----------------------------------------------------------------------


-- --Edit User by id
-- mocke valores para editar um user
-- edite a linha baseada nos valores mockados

UPDATE users
SET email = 'juliana@gmail.com'
WHERE id = '2';

-----------------------------------------------------------------------


--Delete User by id
-- mocke uma id
-- delete a linha baseada no valor mockado

DELETE FROM users
WHERE id = "1";