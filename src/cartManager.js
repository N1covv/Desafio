const fs = require("fs").promises
const CartModel = require("./models/cart.models.js")

class CartManager {
    constructor(path) {
        this.carts = []
        this.path = path
        this.ultId = 0
        this.cargarCart()
    }
    async cargarCart() {
        try {
            const data = await fs.readFile(this.path, "utf-8")
            this.carts = JSON.parse(data)
            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id))
            }
        } catch (error) {
            console.log("Error al crear el cart", error)
            await this.guardarCart()
        }
    }
    async guardarCart() {
        try {
            await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
            console.log("Carrito guardado correctamente");
        } catch (error) {
            console.error("Error al guardar", error);
        }
    }
    async crearCart() {
        try{
            const newCart = new CartModel({products: []})
            await newCart.save()
            return newCart
        } catch (error){
            console.log("Error al cargar el carrito", error)
            throw error
        }
    }
    async getCartById(cartId) {
        try {
            const cart = this.carts.find(a => a.id === cartId)
            if(!cart){
                console.log("No hay cart con el Id")
                return
            }
            return cart
        } catch (error) {
            console.log("Error al tener un cart con el Id ", error)
        }
    }
    async agregarProductAlCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId)
        const existProduct = cart.products.find(p => p.products === productId)
        if(existProduct){
            existProduct.quantity +=quantity
        }else{
            cart.products.push({product: productId, quantity})  
        }

        cart.markModified("products")
        await this.guardarCart()
        return cart
    }
}

module.exports = CartManager