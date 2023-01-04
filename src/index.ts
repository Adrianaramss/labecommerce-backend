import { users, products, purchase, createUser, createProduct, getProductById, queryProductsByName} from "./database";
import { Categorias } from "./type";


createUser("3","user3@gmail", "579" )
createProduct("3","mouse", 50, Categorias.ACCESSORIES)
queryProductsByName("notebook")
console.log(purchase)