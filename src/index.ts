import { users, products, purchase, createUser, createProduct, getProductById, queryProductsByName} from "./database";
// createUser("3","user3@gmail", "579" )
// createProduct("3","mouse", 50, Categorias.ACCESSORIES)
// queryProductsByName("notebook")
console.log(purchase)
import  express, { Request, Response} from 'express'
import cors from 'cors';
import {TProduct, TUser, TPurchase,Categorias}  from "./type";



const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})

////Get All Users refatorar

app.get('/users',(req: Request, res:Response) => {
    try {
        res.status(200).send(users)

    } catch (error:any) {
      console.log(error)
        
    if (res.statusCode === 200){
         res.status(500)
    }
    res.send(error.message)
}
    })

////Get All Products refatorar

app.get('/products',(req: Request, res:Response) => {

    try {
        res.status(200).send(products)

    } catch (error:any) {
      console.log(error)
        
    if (res.statusCode === 200){
         res.status(500)
    }
    res.send(error.message)
    }

 })

////Search Product by name

app.get("/products/search", ( req:Request, res:Response) => {


    try {

        const q = req.query.q as string
        const buscaNomeProduto =products.filter((product) => {
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


/// create User 
app.post('/users', (req: Request, res: Response) => {

    try{

    const {id, email, password} = req.body 

    const newUser = {
        id,
        email,
        password
    }

    
    if(typeof id !== "string") {
        res.status(400)
        throw new Error ("verifique o id deve ser uma string")
    }

    if(id.length  <= 0) {
        res.status(400)
        throw new Error (" id deve ter um valor")
    }
    if (! email.includes("@")) {
        throw new Error("Parâmetro 'email' inválido")
    }
    if(typeof password !== "string") {
        res.status(400)
        throw new Error ("verifique o password deve ser uma string ")
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















////procurar produto pelo id///////
app.get("/products/:id", (req:Request,res: Response) => {
const id = req.params.id
const result = products.find((product) =>{
    return product.id === id
})
res.status(200).send(result)
})



app.get("/users/:id/purchases", (req:Request,res: Response) => {
    const id = req.params.id
    const purchaseIndex = purchase.find((purchase) => purchase.userId === id)
    res.status(200).send(purchaseIndex)
    })

///// deletar o usuario////////////////
    app.delete ("/users/:id", (req:Request, res: Response) =>{
        const id= req.params.id
        const userIndex = users.findIndex((user) => {
            return user.id === id
        })
        console.log("Index", userIndex)
    
        if(userIndex>=0){
            users.splice(userIndex,1)
            res.status(200).send("usuario deletado com sucesso")
    
        }else{
        res.status(400).send("usuario não encontrado")
        }
    })
 
///// deletar o produto////////////////

    app.delete ("/products/:id", (req:Request, res: Response) =>{
        const id= req.params.id
        const productIndex = products.findIndex((product) => {
            return product.id === id
        })
        console.log("Index", productIndex)
    
        if(productIndex>=0){
            products.splice(productIndex,1)
            res.status(200).send("produto deletado com sucesso")
    
        }else{
        res.status(400).send("produto não encontrado")
        }
    })

///////////editar o usuario pelo id////////


    app.put("/user/:id", (req: Request, res: Response) => {
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
    })


///////////editar o produto pelo id////////


app.put("/product/:id", (req: Request, res: Response) => {
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
})





////lista de usuarios/////////


// app.get('/users',(req: Request, res:Response) => {
//     res.status(200).send(users)
//     })

//// lista de produtos///////

// app.get('/products',(req: Request, res:Response) => {
//     res.status(200).send(products)
//     })

   

/// pesquisar por nome do produto     

// app.get("/products/search", ( req:Request, res:Response) => {
//     const q = req.query.q as string
    
//     const buscaNomeProduto =products.filter((product) => {
//         return product.name.toLowerCase().includes(q.toLowerCase())
//     } )

//     res.status(200).send(buscaNomeProduto) 
// })



/// Criar novo usuario 

app.post('/users', (req: Request, res: Response) => {

    const {id, email, password} = req.body as TUser

    const newUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("usuario registrado com sucesso!")
})


/// Criar novo produto

app.post('/products', (req: Request, res: Response) => {

    const {id, name, price,category} = req.body as TProduct

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("produto registrado com sucesso!")
})



/// Criar novo compra

app.post('/purchase', (req: Request, res: Response) => {

    const {userId, productId, quantity,totalPrice} = req.body as TPurchase

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchase.push(newPurchase)

    res.status(201).send("nova compra registrado com sucesso!")
})


