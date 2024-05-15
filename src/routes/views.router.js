const express = require("express")
const router = express.Router()
const ProductManager = require("../productManager.js")
const productManager = new ProductManager("./src/listaProductos.json")


router.get("/", async(req, res)=>{
    try {
        const products = await productManager.getProducts()
        res.render("home", {products:products}) 
    } catch (error) {
        res.status(400).json({error: "Error"})
    }
})

router.get("/realtimeproducts", async(req, res) =>{
    try {
        res.render("realtimeproducts")
    } catch (error) {
        res.status(400).json({error: "Error"})
    }
})

router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/register",(req,res)=>{
    res.render("register")
})

module.exports = router