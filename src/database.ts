
import {TProduct, TUser, TPurchase,Categorias}  from "./type";



export const users: TUser[] = [{
    id: '1',
    email: 'user1@gmail',
    password: '567'
}, {
    id: '2',
    email: 'user2@gmail',
    password: '100'
}]


export function createUser (id: string, email: string, password: string ) : void{
    console.log(users)
    const newUser: TUser = {
    id: id,
    email: email,
    password: password
    }
users.push(newUser)
console.log(users)
console.log("Cadastro realizado com sucesso")

}

export function getAllUsers () : TUser [] {
    return users
}



export const products: TProduct[] = [{
    id: '1',
    name: 'Notebook',
    price: 3000,
    category: Categorias.ELECTRONICS
},
{
    id: '2',
    name: 'Headphone Game',
    price: 472,
    category: Categorias.ACCESSORIES

}]


export function createProduct (id: string, name: string,  price:number, category: Categorias) : void{
    console.log(products)
    const newProduct: TProduct = {
    id: id,
    name: name,
    price: price,
    category:category
    }
    products.push(newProduct)
    console.log(products)
    console.log("produto criado com sucesso")

}

export function getAllProducts () : TProduct [] {
    return products
}


export function getProductById (idToSearch: string) : TProduct[] | undefined{
  return(products.filter((product) => {
    if(product.id === idToSearch){
    return product
  }
   } ) )
  }

export const queryProductsByName = (q:string) : void => {
    const query = products.filter (
        (products) => {
            return (products.name.toLocaleLowerCase().includes(q.toLocaleLowerCase()))
        }
    )
    console.log(query)
}


export function createPuschase (userId: string, productId: string,  quantity:number, totalPrice: number  ) : void{
    const newPurchase: TPurchase = {
    userId,
    productId,
    quantity,
    totalPrice,

    }
    purchase.push(newPurchase)
    console.log(purchase)
    console.log("compra realizada com sucesso")

}

export const getAllPuchasesFromUserId = (userIdToSearch:string) :TPurchase[] => {
    return purchase.filter (
        (purchase) => { 
            return(purchase.userId.toLocaleLowerCase(). includes(userIdToSearch.toLocaleLowerCase()))

        }
    )
    }




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



