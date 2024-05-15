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
const MongoStore = require("connect-mongo")
const session = require("express-session")
const FileStore = require("session-file-store")
const usersRouter = require("./src/routes/user.router.js")
const fileStore = new FileStore(session)

main.use(express.json())
main.use(express.urlencoded({extended:true})) //Middle
main.use(express.static("./src/public"))
main.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true, 
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://nicoveron09:zt87hb6910@cluster0.748gfp0.mongodb.net/Ecommerce-Desafio?retryWrites=true&w=majority&appName=Cluster0", ttl: 15
    })

}))


main.get("/", (req, res) =>{
    res.render("home") 
})
/* main.get("/login", (req, res) =>{
    let usuario = req.query.usuario
    req.session.usuario = usuario
    res.send("Guardamos el usuario")
}) */
main.get("/usuario", (req, res)=>{
    if(req.session.usuario){
        return res.send(`User Register: ${req.session.usuario}`)
    }
    res.send("No hay usuario registrado")
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
main.use("/api/users", usersRouter )


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