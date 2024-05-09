const ProductManager = require("./src/productManager.js")
const productManager = new ProductManager("./src/listaProductos.json")
const express = require("express")
const main = express()
const exphbs = require("express-handlebars")
const socket = require("socket.io")
const productRouter = require("./src/routes/products.router.js")
const port = 8080
const cartsRouter = require("./src/routes/carts.router.js")
const viewsRouter = require("./src/routes/views.router.js")
require("./src/database.js")

main.use(express.json())
main.use(express.urlencoded({extended:true})) //Middle
main.use(express.static("./src/public"))


main.get("/", (req, res) =>{
    res.render("home") 
})

main.engine("handlebars", exphbs.engine())
main.set("view engine", "handlebars") //Handle
main.set("views", "./src/views")

const httpServer  = main.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})

const MessageModel = require("./src/models/messgae.model.js")


main.use("/api", productRouter)
main.use("/api", cartsRouter) //Routes
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
    socket.on("message", async data =>{
        await MessageModel.create(data)
        const messages = await MessageModel.find()
        io.socket.emit("message", messages)
    })
})