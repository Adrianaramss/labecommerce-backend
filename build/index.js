"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const type_1 = require("./type");
(0, database_1.createUser)("3", "user3@gmail", "579");
(0, database_1.createProduct)("3", "mouse", 50, type_1.Categorias.ACCESSORIES);
(0, database_1.queryProductsByName)("notebook");
console.log(database_1.purchase);
//# sourceMappingURL=index.js.map