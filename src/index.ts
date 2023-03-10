import { users, products, purchase, createUser, createProduct, getProductById, queryProductsByName } from "./database";
console.log(purchase)
import express, { Request, Response } from 'express'
import cors from 'cors';
import { db } from "./database/knex";
import { TProduct, TUser, TPurchase } from "./type";



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
app.get("/users", async (req: Request, res: Response) => {
    try {

        const result = await db.select("*").from("users")
        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})



//============Get All Products==============================================


app.get('/products', async (req: Request, res: Response) => {

    try {
        const result = await db.select("*").from("products")
        res.status(200).send(result)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//============Search Product By name==============================================


app.get("/products/search", async (req: Request, res: Response) => {


    try {

        const q = req.query.q as string
        const buscaNomeProduto = await db.raw(`
        SELECT *FROM products
        WHERE name LIKE "%${q}%";
        `)



        if (q.length < 1) {
            res.status(400)
            throw new Error("query deve possuir pelo menos um caractere ")
        }

        if (buscaNomeProduto.length < 1) {
            res.status(404)
            throw new Error("produto n??o encontrado ")
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

app.post('/users', async (req: Request, res: Response) => {

    try {

        const { id, name, email, password } = req.body



        if (typeof id !== "string") {
            res.status(400)
            throw new Error("verifique o id deve ser uma string")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("verifique o name deve ser uma string")
        }

        if (id.length <= 0) {
            res.status(400)
            throw new Error(" id deve ter um valor")
        }
        if (!email.includes("@")) {
            throw new Error("Par??metro 'email' inv??lido")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("verifique o password deve ser uma string ")
        }

        ////// verificar se o email ou id j?? existe ou n??o 
        const searchId = users.filter((user) => {
            return user.id === id
        })

        if (searchId.length >= 1) {
            res.status(400)
            throw new Error("Id j?? esta cadastrado.")
        }

        const searchEmail = users.filter((user) => {
            return user.email === email
        })


        if (searchEmail.length >= 1) {
            res.status(400)
            throw new Error("esse Email j??  esta cadastrado.")
        }

        await db("users").insert({ id, name, email, password })
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


app.post('/products', async (req: Request, res: Response) => {

    try {

        const { id, name, price, description, imageUrl } = req.body



        if (typeof id !== "string") {
            res.status(400)
            throw new Error("verifique o id deve ser uma string")
        }
        if (typeof name !== "string") {
            res.status(400)
            throw new Error("o tipo do nome ?? uma string.")
        }


        if (typeof price !== "number") {
            res.status(400)
            throw new Error("O tipo do price ?? um n??mero.")
        }


        if (!description) {
            res.status(400)
            throw new Error("coloque uma descri????o para produto")
        }

        if (!imageUrl) {
            res.status(400)
            throw new Error("coloque uma Imagem")
        }

        if (products.find((product) => product.id === id)) {
            res.status(400)
            throw new Error("esse id j?? existe!")
        }


        await db.raw(`
        INSERT INTO products (id, name, price, description, imageUrl)
        VALUES
        ("${id}","${name}","${price}","${description}","${imageUrl}"  )`)
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

app.post('/purchases', async (req: Request, res: Response) => {

    try {

        const { id, buyer_id, productId, quantity } = req.body
        const [products] = await db("products").where({ id: productId })


        if (!id || !buyer_id || !productId) {
            res.status(400)
            throw new Error("falta o id ou buyer")

        }
        if (typeof id !== "string" &&
            typeof buyer_id !== "string") {
            res.status(400)
            throw new Error("'userId' e 'productId' precisam ser strings e 'totalPrice' precisa ser do tipo number.")
        }

        const newPurchase = {
            id,
            buyer_id,
            total_price: products.price * quantity
        }

        const newPurchaseProduct = {
            purchase_id: id,
            product_id: productId,
            quantity

        }
        const [findUser] = await db("users").where({ id: newPurchase.buyer_id })


        if (findUser) {
            await db("purchases").insert(newPurchase)
            await db("purchases_products").insert(newPurchaseProduct)
        } else {
            res.status(400)
            throw new Error("pedido n??o realizad0")
        }
        res.status(201).send({
            message: "pedido realizado com sucesso",
            purchase: { newPurchase, newPurchaseProduct }
        })


    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})




//============Edit Product by id==============================================

app.put("/product/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const newName = req.body.name
        const newPrice = req.body.price
        const newDescription = req.body.description
        const newImageUrl = req.body.imageUrl 
        const [product] = await db("products").where({ id: id })


        if (product) {
            const editeproduct = {
                name: newName || product.name,
                price: newPrice || product.price,
                description: newDescription || product.description,
                imageUrl:  newImageUrl ||  product.imageUrl
            }
            await db("products").update(editeproduct).where({ id: id })
            res.status(200).send("Cadastro atualizado com sucesso!")

        } else {
            res.status(404).send("produto n??o encontrado!")
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})


////===============Get All purchase==============================================

app.get("/purchases", async (req: Request, res: Response) => {
    try {
        const result = await db("purchases")

        res.status(200).send(result)
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

//============Delete Purchase by id==============================================

app.delete('/purchases/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const [filterpurchase] = await db("purchases").where({ id: id })

        if (filterpurchase) {
            await db("purchases").del().where({ id: id })
            res.status(200).send({ message: "Pedido excluido com sucesso" })
        } else {
            res.status(400)
            throw new Error("Pedido n??o localizado!")
        }

    } catch (error) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }

})



//============Get Purchase by id==============================================


app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const purchaseId = req.params.id

        if (!purchaseId) {
            res.status(400)
            throw new Error("coloque  um 'id'")
        }

        const purchases = await db("purchases_products").where({ purchase_id: purchaseId });
        const productsList = []

        for (let purchase of purchases) {
            const product = await db("products").where({ id: purchase.product_id })
            productsList.push({ ...product[0], quantity: purchase.quantity })
        }

        const purchase = await db("purchases").where({ id: purchaseId });

        const purchaseData = purchase[0]

        const user = await db("users").where({ id: purchaseData.buyer_id });

        const userData = user[0]
        const data = {
            purchaseId: purchaseData.id,
            buyerId: userData.id,
            name: userData.name,
            email: userData.email,
            totalPrice: purchaseData.total_price,
            createdAt: purchaseData.created_at,
            isPaid: purchaseData.paid ? true : false,
            productsList
        }
        res.status(200).send(data)

    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})


