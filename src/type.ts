
export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    description: string
}

export type TPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

// export enum Categorias  {
//     ACCESSORIES = "Acessórios",
//     ELECTRONICS = "Eletrônicos"
// }


