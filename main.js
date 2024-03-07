const fs = require("fs")
const ruta = "./ruta.json"

const indumentaria = [
    { title: "Trasher", description: "Remera color amarilla talle xl", price: 12000, img: "Sin imagen", code: "abc123", stock: 10 },
    { title: "DTS", description: "Remera color beige talle L", price: 10000, img: "Sin imagen", code: "abc124", stock: 15 },
    { title: "Cristobal Colon", description: "Remera color roja talle xl", price: 9000, img: "Sin imagen", code: "abc125", stock: 20 },
    { title: "Creature", description: "Remera color verde talle xxl", price: 15000, img: "Sin imagen", code: "abc126", stock: 10 }
]
class ProductManager {

    static id = 0
    constructor() {
        this.products = []
        this.path = ruta
    }

    addProduct(title, description, price, img, code, stock) {

        if (!title || !description || !price || !img || !code || !stock) {
            console.log("Rellenar los campos obligatorios")
            return
        }

        if (this.products.some(item => item.code === code)) {
            console.log("Este codigo del producto ya existe")
            return
        }

        const nuevoProducto = {
            id: ++ProductManager.id,
            title,
            description,
            price,
            img,
            code,
            stock,
        }

        this.products.push(nuevoProducto)

    }
    getProducts() {
        return this.products
    }
    getProductById(id) {
        const product = this.products.find(item => item.id === id)

        if (!product) {
            console.log("Not found")
        } else {
            console.log("Existe")
        }

    }

    guardarProducts(){
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2), error =>{
            if (error){
                console.error("No se pudieron guardar los productos", error)
            }
        })
    }
    updateProduct(id, updatedFields){
        const i = this.products.findIndex(product => product.id === id)
        if(i !== -1) {
            this.products[i] = {...this.products[i], ...updatedFields}
            this.guardarProducts
        }else{
            console.log("No existe el producto")
        }
    }

    deleteProduct(id){
        this.products = this.products.filter(product => product.id !== id)
        this.guardarProducts
    }
}


//Testing

/* productos.addProduct("Trasher", "Remera color amarilla talle xl", 12000, "Sin imagen", "abc123", 10)
productos.addProduct("DTS", "Remera color beige talle L", 10000, "Sin imagen", "abc124", 15)
productos.addProduct("Cristobal Colon", "Remera color roja talle xl", 9000, "Sin imagen", "abc125", 20)
productos.addProduct("Creature", "Remera color verde talle xxl", 15000, "Sin imagen", "abc126", 10) */

//console.log(productos.getProducts())

//Se creará una instancia de la clase “ProductManager”
const productos = new ProductManager()

for (const producto of indumentaria){
    productos.addProduct(producto.title, producto.description, producto.price, producto.img, producto.code, producto.stock)
}
console.log(productos.getProducts())

//Se llamará al método “addProduct” con los campos:
productos.addProduct("Trasher", "Remera color amarilla talle xl", 12000, "Sin imagen", "abc123", 10)

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.
productos.getProductById(5)
productos.getProductById(2)

//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.
productos.updateProduct(3,{
    title: "DTS",
    description: "Remera blanca L",
    price: 12000,
    img: "Sin imagen",
    code: "abc129",
    stock: 25
})
console.log(productos.getProducts());

//Se llamará al método “deleteProduct”, se evaluará que realmente se elimine el producto o que arroje un error en caso de no existir.
productos.deleteProduct(2)
console.log(productos.getProducts())
productos.deleteProduct(5)
