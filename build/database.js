"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchase = exports.products = exports.users = void 0;
exports.users = [{
        id: '1',
        email: 'user1@gmail',
        password: '567'
    }, {
        id: '2',
        email: 'user2@gmail',
        password: '100'
    }];
exports.products = [{
        id: '1',
        name: 'Notebook',
        price: 3000,
        category: 'technology'
    },
    {
        id: '2',
        name: 'Headphone Game',
        price: 472,
        category: 'accessories gammer'
    }];
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