const ProductManager = require("./src/productManager.js")
const productManager = new ProductManager("./src/listaProductos.js")
const express = require("express")
const main = express()
const productRouter = require("./src/routes/products.router.js")
const port = 8080
const cartsRouter = require("./src/routes/carts.router.js")

main.use(express.json())
main.use(express.urlencoded({extended:true}))

main.get("/", (req, res) =>{
    res.send("Funciona correctamente")
})

main.listen(port, ()=>{
    console.log(`Funcionando en el puerto ${port}`)
})

main.use("/api", productRouter)
main.use("/api", cartsRouter)


/* 
main.get("/productos", async(req, res) =>{
    try{
        const limit = req.query.limit
        const productos = await productManager.getProducts()
        if (limit) {
            res.json(productos.slice(0, limit))
        } else {
            res.json(productos)
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: "Error interno del servidor"
        })
    }
})

app.get("/products:id", async (req, res) =>{

    const id = req.params.id

    try {
        const producto = await productManager.getProductById(parseInt(id))
        if(!producto) {
            return res.json({
                error:"Producto no encontrado"
            })
        }
        res.json(producto)
    } catch(error) {
        console.error("Error al obtener producto", error)
        res.status(400).json({
            error:"Error interno del servidor"
        })
    }
})

app.listen(port, () => {
    console.log(`Funcionando en el puerto ${port}`)
}) */