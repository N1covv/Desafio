const ProductManager = require("./src/productManager.js")
const productManager = new ProductManager("./src/listaProductos.js")
const express = require("express")
const main = express()
const exphbs = require("express-handlebars")
const socket = require("socket.io")
const productRouter = require("./src/routes/products.router.js")
const port = 8080
const cartsRouter = require("./src/routes/carts.router.js")
const viewsRouter = require("./src/routes/views.router.js")

main.use(express.json())
main.use(express.urlencoded({extended:true}))
main.use(express.static("./src/public"))


main.get("/", (req, res) =>{
    res.render("home") 
})

main.engine("handlebars", exphbs.engine())
main.set("view engine", "handlebars")
main.set("views", "./src/views")

const httpServer  = main.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})

main.use("/api", productRouter)
main.use("/api", cartsRouter)
main.use("/", viewsRouter)


const io = new socket.Server(httpServer)

let messages = []

io.on("connection", async (socket) =>{
    console.log("Nuevo usuario conectado")

    socket.emit("products", await productManager.getProducts())
    socket.on("eliminarProducto", async (id) =>{
        await productManager.deleteProduct(id)
        socket.emit("products", await productManager.getProducts())
    })
    socket.on("agregarProduct", async(product)=>{
        await productManager.addProduct(product)
        socket.emit("products", await productManager.getProducts())
    })
})