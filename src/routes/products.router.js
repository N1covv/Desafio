const express = require("express")
const router = express.Router()

const ProductManager = require("../productManager.js")
const productManager = new ProductManager("./src/listaProductos.json")

router.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit
        const products = await productManager.getProducts()
        if (limit) {
            res.json(products.slice(0, limit))
        } else {
            res.json(products)
        }
    } catch (error) {
        console.error("No se obtuvieron productos", error)
        res.status(500).json({
            error: "Error server"
        })
    }
})
router.get("/products/:prodid", async (req, res) => {
    const id = req.params.prodid
    try {
        const product = await productManager.getProductById(parseInt(id))
        if (!product) {
            return res.json({
                error: "No se encontraron productos"
            })
        }
        res.json(product)

    } catch (error) {
        console.error("Error al encontrar el producto", error)
        res.status(500).json({
            error: "Error server"
        })
    }
})

router.post("/products", async (req, res) => {
    const newProduct = req.body

    try {
        await productManager.addProduct(newProduct)
        res.status(200).json({ message: "Producto agregado" })
    } catch (error) {
        res.status(500).json({ error: "Error server" })
    }
})

router.put("/products/:prodid", async (req, res) => {
    const id = req.params.prodid
    const updatedFields = req.body

    try {
        await productManager.updateProduct(parseInt(id), updatedFields)
        res.json({
            message: "Producto actualizado"
        })
    } catch (error) {
        res.status(500).json({ error: "Error server" })
    }
})
router.delete("/products/:prodid", async (req, res) => {
    const id = req.params.prodid
    try {
        await productManager.deleteProduct(parseInt(id))
        res.json({
            message: "Producto eliminado"
        })
    } catch (error) {
        res.status(400).json({ error: "Error" })
    }
})

module.exports = router