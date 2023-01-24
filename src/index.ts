import { users, products, purchase, createUser, createProduct, getProductById, queryProductsByName } from "./database";
// createUser("3","user3@gmail", "579" )
// createProduct("3","mouse", 50, Categorias.ACCESSORIES)
// queryProductsByName("notebook")
console.log(purchase)
import express, { Request, Response } from 'express'
import cors from 'cors';
import { db } from "./database/knex";
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
app.get("/users", async (req: Request, res: Response) => {
    try {
        const result = await db.raw(`
            SELECT * FROM users
        `)
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
        const result = await db.raw (`SELECT *FROM products`)
        res.status(200).send(result)

    }  catch (error) {
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
        const buscaNomeProduto = await db.raw (`
        SELECT *FROM products
        WHERE name LIKE "%${q}%";
        `)
            
      

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

app.post('/users', async (req: Request, res: Response) => {

    try {

        const { id, name, email, password } = req.body 
        // const newUser = {
        //     id,
        //     email,
        //     password
        // }


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
            throw new Error("Parâmetro 'email' inválido")
        }
        if (typeof password !== "string") {
            res.status(400)
            throw new Error("verifique o password deve ser uma string ")
        }

        ////// verificar se o email ou id já existe ou não 
        const searchId = users.filter((user) => {
            return user.id === id
        })

        if (searchId.length >= 1) {
            res.status(400)
            throw new Error("Id já esta cadastrado.")
        }

        const searchEmail = users.filter((user) => {
            return user.email === email
        })


        if (searchEmail.length >= 1) {
            res.status(400)
            throw new Error("esse Email já  esta cadastrado.")
        }


        // users.push(newUser)
        await db.raw(`
        INSERT INTO users (id,name,email,password)
        values
        ("${id}","${name}","${email}","${password}" );`)
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

        // const newProduct = {
        //     id,
        //     name,
        //     price,
        //     category
        // }

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

        
        if (!description) {
            res.status(400)
            throw new Error("coloque uma descrição para produto")
        }
     
        if (!imageUrl) {
            res.status(400)
            throw new Error("coloque uma Imagem")
        }
       
        if (products. find((product) => product.id === id)) {
            res.status(400)
            throw new Error("esse id já existe!")
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

app.post('/purchase', async (req: Request, res: Response) => {

    try {
        // const { userId, productId, quantity, totalPrice } = req.body
        // const { id, total_price, paid, buyer_id } = req.body
        const id = req.body.id;
        const total_price = req.body.total_price;
        const paid = req.body.paid;
        const buyer_id = req.body.buyer_id
        // const newPurchase = {
        //     userId,
        //     productId,
        //     quantity,
        //     totalPrice
        // }


        if (typeof id !== "string") {
            res.status(400)
            throw new Error("verifique o id deve ser uma string")
        }


        if (typeof total_price !== "number") {
            res.status(400)
            throw new Error("verifique o total deve ser uma number")
        }

        
        await db.raw(`
        INSERT INTO purchases (id, total_price, paid, buyer_id)
        VALUES 
            ("${id}", "${total_price}", ${paid}, "${buyer_id}")
        `)
     
       
    

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




//============Get Products by  id==============================================


app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        // const result = 
        //  products.find((product) => {
        //     return product.id === id
        // })


        const result = await db.raw (`
        SELECT * FROM products
        WHERE id = "${id}"`)

        res.status(200).send(result)

        // if (result) {
        //     res.status(200).send(result)

        // } else {
        //     res.status(400)
        //     throw new Error("Produto não encontrado.")
        // }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }

})


//============Get User Purchase by User id==============================================

app.get("/users/:id/purchases", async (req: Request, res: Response) => {

    try {

        const id = req.params.id
        // const purchaseIndex = purchase.find((purchase) => purchase.userId === id)
         const purchaseIndex =  await db.raw (`
         SELECT *FROM purchases
         WHERE buyer_id = "${id}";
         `)
          res.status(200).send(purchaseIndex)


        // if (purchaseIndex) {
        //     res.status(200).send(purchaseIndex)

        // } else {
        //     res.status(400)
        //     throw new Error(" usuario não tem compras")
        // }


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


////===============Get All purchase

//Get All Purchases
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


