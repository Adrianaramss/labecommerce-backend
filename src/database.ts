import {TProduct, TUser, TPurchase}  from "./type";

export const users: TUser[] = [{
    id: '1',
    email: 'user1@gmail',
    password: '567'
}, {
    id: '2',
    email: 'user2@gmail',
    password: '100'
}]

export const products: TProduct[] = [{
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
}]

export const purchase: TPurchase[] = [{
    userId: "1",
    productId:"1" ,
    quantity: 1,
    totalPrice: products[0].price *1
},

{userId: "2",
productId:"2" ,
quantity: 2,
totalPrice: products[1].price *2
}


]
