const express = require("express")
const CartManager = require("../cartManager.js")
const router = express.Router()
const cartManager = new CartManager("./src/cart.json")

router.post("/carts", async (req, res)=>{
    try {
        const newCart = await cartManager.crearCart()
        res.json(newCart)
    } catch(error){
        res.status(400).json({error: "Error"})
    }
})
router.get("/carts/:id", async(req, res)=>{
    const cartId = parseInt(req.params.id)
    try {
        const cart = await cartManager.getCartById(cartId)
        res.json(cart.products)
    } catch(error){
        res.status(400).json({error: "Error"})
    }
})
router.post("/carts/:id/products/:id", async (req, res)=>{
    const cartId = parseInt(req.params.id)
    const productId = parseInt(req.params.id)
    try {
        const updateCart = await cartManager.agregarProductAlCart(cartId,productId)
        res.json(updateCart.products)
    } catch(error){
        res.status(400).json({error: "Error"})
    }
})


module.exports = router