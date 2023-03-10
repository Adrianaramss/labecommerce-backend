"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.getAllPuchasesFromUserId = exports.createPuschase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.products = exports.getAllUsers = exports.createUser = exports.users = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const type_1 = require("./type");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => {
    res.status(200).send(exports.users);
});
app.get('/products', (req, res) => {
    res.status(200).send(exports.products);
});
app.get("/products/search", (req, res) => {
    const q = req.query.q;
    const buscaNomeProduto = exports.products.filter((product) => {
        return product.name.toLowerCase().includes(q.toLowerCase());
    });
    res.status(200).send(buscaNomeProduto);
});
app.post('/users', (req, res) => {
    const { id, email, password } = req.body;
    const newUser = {
        id,
        email,
        password
    };
    exports.users.push(newUser);
    res.status(201).send("usuario registrado com sucesso!");
});
app.post('/products', (req, res) => {
    const { id, name, price, category } = req.body;
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    res.status(201).send("usuario registrado com sucesso!");
});
exports.users = [{
        id: '1',
        email: 'user1@gmail',
        password: '567'
    }, {
        id: '2',
        email: 'user2@gmail',
        password: '100'
    }];
function createUser(id, email, password) {
    console.log(exports.users);
    const newUser = {
        id: id,
        email: email,
        password: password
    };
    exports.users.push(newUser);
    console.log(exports.users);
    console.log("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
exports.products = [{
        id: '1',
        name: 'Notebook',
        price: 3000,
        category: type_1.Categorias.ELECTRONICS
    },
    {
        id: '2',
        name: 'Headphone Game',
        price: 472,
        category: type_1.Categorias.ACCESSORIES
    }];
function createProduct(id, name, price, category) {
    console.log(exports.products);
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    console.log(exports.products);
    console.log("produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(idToSearch) {
    return (exports.products.filter((product) => {
        if (product.id === idToSearch) {
            return product;
        }
    }));
}
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    const query = exports.products.filter((products) => {
        return (products.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()));
    });
    console.log(query);
};
exports.queryProductsByName = queryProductsByName;
function createPuschase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    };
    exports.purchase.push(newPurchase);
    console.log(exports.purchase);
    console.log("compra realizada com sucesso");
}
exports.createPuschase = createPuschase;
const getAllPuchasesFromUserId = (userIdToSearch) => {
    return exports.purchase.filter((purchase) => {
        return (purchase.userId.toLocaleLowerCase().includes(userIdToSearch.toLocaleLowerCase()));
    });
};
exports.getAllPuchasesFromUserId = getAllPuchasesFromUserId;
exports.purchase = [{
        userId: "1",
        productId: "1",
        quantity: 1,
        totalPrice: exports.products[0].price * 1
    },
    { userId: "2",
        productId: "2",
        quantity: 2,
        totalPrice: exports.products[1].price * 2
    }
];
//# sourceMappingURL=database.js.map