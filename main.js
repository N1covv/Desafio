class ProductManager{

    static id = 0
    constructor(){
        this.products = []
    }

    addProduct(title, description, price, img, code, stock){

        if(!title || !description || !price || !img || !code || !stock){
            console.log("Rellenar los campos obligatorios")
            return
        }

        if(this.products.some(item => item.code === code)){
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
    getProducts(){
        return this.products
    }
    getProductById(id){
        const product = this.products.find(item => item.id === id)

        if(!product){
            console.log("Not found")
        }else{
            console.log("Existe")
        }

    }
}


const productos = new ProductManager()


productos.addProduct("Trasher", "Remera color amarilla talle xl", 12000, "Sin imagen", "abc123", 10)

productos.addProduct("DTS", "Remera color beige talle L", 10000, "Sin imagen", "abc124", 15)

productos.addProduct("Cristobal Colon", "Remera color roja talle xl", 9000, "Sin imagen", "abc125", 20)

productos.addProduct("Creature", "Remera color verde talle xxl", 15000, "Sin imagen", "abc126", 10)

console.log(productos.getProducts())

productos.getProductById()
productos.getProductById(2)