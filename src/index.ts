import { users, products, purchase, createUser, createProduct, getProductById, queryProductsByName } from "./database";
// createUser("3","user3@gmail", "579" )
// createProduct("3","mouse", 50, Categorias.ACCESSORIES)
// queryProductsByName("notebook")
console.log(purchase)
import express, { Request, Response } from 'express'
import cors from 'cors';
import { TProduct, TUser, TPurchase, Categorias } from "./type";



const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

//============Get All Users==============================================


app.get('/users', (req: Request, res: Response) => {
    try {
        res.status(200).send(users)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//============Get All Products==============================================


app.get('/products', (req: Request, res: Response) => {

    try {
        res.status(200).send(products)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//============Search Product By name==============================================


app.get("/products/search", (req: Request, res: Response) => {


    try {

        const q = req.query.q as string
        const buscaNomeProduto = products.filter((product) => {
            return product.name.toLowerCase().includes(q.toLowerCase())
        })

        if (q.length < 1) {
            res.status(400)
            throw new Error("query deve possuir pelo menos um caractere ")
        }

        if (buscaNomeProduto.length < 1) {
            res.status(404)
            throw new Error("produto não encontrado ")
        }

        res.status(200).send(buscaNomeProduto)

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }


})


//============Create User==============================================

app.post('/users', (req: Request, res: Response) => {

    try {

        const { id, email, password } = req.body

        const newUser = {
            id,
            email,
            password
        }


        if (typeof id !== "string") {
            res.status(400)
            throw new Error("verifique o id deve ser uma string")
        }

        if (id.length <= 0) {
            res.status(400)
            throw new Error(" id deve ter um valor")
        }
        if (!email.includes("@")) {
            throw new Error("Parâmetro 'email' inválido")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("verifique o password deve ser uma string ")
        }

        ////// verificar se o email ou id já existe ou não 
        const searchId = users.filter((user) => {
            return user.id === newUser.id
        })

        if (searchId.length >= 1) {
            res.status(400)
            throw new Error("Id já esta cadastrado.")
        }

        const searchEmail = users.filter((user) => {
            return user.email === newUser.email
        })


        if (searchEmail.length >= 1) {
            res.status(400)
            throw new Error("esse Email já  esta cadastrado.")
        }


        users.push(newUser)

        res.status(201).send("usuario registrado com sucesso!")

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//============Create Product==============================================


app.post('/products', (req: Request, res: Response) => {

    try {

        const { id, name, price, category } = req.body

        const newProduct = {
            id,
            name,
            price,
            category
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("verifique o id deve ser uma string")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("o tipo do nome é uma string.")
        }


        if (typeof price !== "number") {
            res.status(400)
            throw new Error("O tipo do price é um número.")
        }

        if (newProduct.category !== Categorias.ACCESSORIES &&
            newProduct.category !== Categorias.ELECTRONICS) {
            res.status(400)
            throw new Error("a category deve ser Acessórios ou eletrônico")
        }

        const searchProductById = products.find((product) => {
            return product.id === newProduct.id
        })

        if (searchProductById) {
            res.status(400)
            throw new Error("Id já está cadastrado.")
        }


        products.push(newProduct)

        res.status(201).send("produto registrado com sucesso!")



    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }




})


//============Create Purchase==============================================

app.post('/purchase', (req: Request, res: Response) => {

    try {
        const { userId, productId, quantity, totalPrice } = req.body

        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        }


        if (typeof productId !== "string") {
            res.status(400)
            throw new Error("verifique o productId deve ser uma string")
        }


        if (typeof quantity !== "number") {
            res.status(400)
            throw new Error("verifique o quantity deve ser uma number")
        }


        if (typeof totalPrice !== "number") {
            res.status(400)
            throw new Error("verifique o total deve ser uma number")
        }
////// verificar se o userid ou o produto já existe ou não 

        const PurchaseUser = users.filter((user) => {
            return user.id === newPurchase.userId
        })

        const PurchaseProduct = products.filter((product) => {
            return product.id === newPurchase.productId
        })

        if (!PurchaseUser) {
            res.status(400)
            throw new Error("Usuário não cadastro.")
        }

        if (!PurchaseProduct) {
            res.status(400)
            throw new Error("Produto não cadastrado.")
        }

        purchase.push(newPurchase)

        res.status(201).send("nova compra registrado com sucesso!")




    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//============Get Products by  id==============================================


app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const result = products.find((product) => {
            return product.id === id
        })

        if (result) {
            res.status(200).send(result)

        } else {
            res.status(400)
            throw new Error("Produto não encontrado.")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


//============Get User Purchase by User id==============================================

app.get("/users/:id/purchases", (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const purchaseIndex = purchase.find((purchase) => purchase.userId === id)


        if (purchaseIndex) {
            res.status(200).send(purchaseIndex)

        } else {
            res.status(400)
            throw new Error(" usuario não tem compras")
        }


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }



})



//============Delete User by id==============================================

app.delete("/users/:id", (req: Request, res: Response) => {

    try {

        const id = req.params.id
        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
        console.log("Index", userIndex)

        if (userIndex >= 0) {
            users.splice(userIndex, 1)
            res.status(200).send("usuario deletado com sucesso")

        } else {
            res.status(400).send("usuario não encontrado")
        }


    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

//============Delete Product by id==============================================

app.delete("/products/:id", (req: Request, res: Response) => {


    try {
        const id = req.params.id
        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
        console.log("Index", productIndex)

        if (productIndex >= 0) {
            products.splice(productIndex, 1)
            res.status(200).send("produto deletado com sucesso")

        } else {
            res.status(400).send("produto não encontrado")
        }
    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})

//============Edit User by id==============================================


app.put("/user/:id", (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newEmail = req.body.email as string | undefined
        const newPassword = req.body.password as string | undefined

        const user = users.find((user) => user.id === id)


        if (user) {
            user.email = newEmail || user.email
            user.password = newPassword || user.password

            res.status(200).send("Cadastro atualizado com sucesso!")

        } else {
            res.status(404).send("User não encontrado!")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


//============Edit Product by id==============================================

app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newName = req.body.name as string | undefined
        const newPrice = req.body.price as number | undefined
        const newCategory = req.body.category as Categorias | undefined

        const product = products.find((product) => product.id === id)


        if (product) {
            product.name = newName || product.name
            product.price = newPrice || product.price
            product.category = newCategory || product.category

            res.status(200).send("Cadastro atualizado com sucesso!")

        } else {
            res.status(404).send("produto não encontrado!")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})





