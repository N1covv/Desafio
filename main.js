const ProductManager = require("./src/productManager.js")
const productManager = new ProductManager("./src/listaProductos.js")
const express = require("express")
const main = express()
const exphbs = require("express-handlebars")
const productRouter = require("./src/routes/products.router.js")
const port = 8080
const cartsRouter = require("./src/routes/carts.router.js")
const viewsRouter = require("./src/routes/views.router.js")

main.use(express.json())
main.use(express.urlencoded({extended:true}))

/* main.get("/", (req, res) =>{
    res.send("Funciona correctamente") 
}) */
main.engine("handlebars", exphbs.engine())
main.set("view engine", "handlebars")
main.set("views", "./src/views")

main.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})

main.use("/api", productRouter)
main.use("/api", cartsRouter)
main.use("/", viewsRouter)
