const fs = require("fs").promises
const path = require("path");

class ProductManager {

    static id = 0
    constructor(path) {
        this.products = []
        this.path = path
    }

    async addProduct({id,title, description, price, img, code, stock}) {
        try{
            const arrayProducts = await this.readFile()
            if(!id || !title || !description || !price || !img || !code || !stock){
                console.log("Los campos son obligatorios")
                return
            }
            if(arrayProducts.some(item=>item.code === code)){
                console.log("El codigo no debe repetirse")
                return
            }
            const newProduct ={
                id,
                title,
                description,
                price,
                img,
                code,
                stock
            }
            if(arrayProducts.length>0){
                ProductManager.ultId = arrayProducts.reduce((maxId, product)=>Math.max(maxId, product.id), 0)
            }
            newProduct.id = ++ProductManager.ultId
            arrayProducts.push(newProduct)
            await this.guardarProducts(arrayProducts)
        }catch(error){
            console.log("Error al agregar el producto", error)
        }
    }
    async getProducts() {
        try{
            const arrayProducts = await this.readFile()
            return arrayProducts
        } catch{
            console.log("Error al leer el archivo", error)
        }
    }


    async getProductById(id) {

        try{
            const arrayProducts = await this.readFile()
            const buscar = arrayProducts.find(item => item.id === id)

            if(!buscar){
                console.log("El producto no se encontro")
                return null
            }else{
                console.log("Se ha encontrado el producto")
                return buscar
            }
        } catch (error){
            console.log("Error al mostrar el archivo:", error)
        }
    }

    async readFile(){
        try{
            const responder = await fs.readFile(this.path, "utf-8")
            const arrayProducts = JSON.parse(responder)
            return arrayProducts
        } catch (error) {
            console.log("No se pudo leer el archivo", error)
        }
    } 

    async guardarProducts(arrayProducts){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        }catch (error){
            console.log("No se pudo guardar el archivo")
        }
    }

    async updateProduct(id, updatedFields){
        try{
            const arrayProducts = await this.readFile()
            const index = arrayProducts.findIndex(item=>item.id===id)
            if(index !== -1){
                arrayProducts[index] = {...arrayProducts[index],...updatedFields}
                await this.guardarProducts(arrayProducts)
                console.log("Actualizado")
            }else{
                console.log("No se encontro nada")
            }
        }catch(error){
            console.log("Error al actualizar el producto")
        }
    }

    async deleteProduct(id){
        try{
            const arrayProducts = await this.readFile()
            const index = arrayProducts.findIndex(item=>item.id===id)
        
        if (index!== -1){
            arrayProducts.splice(index, 1)
            await this.guardarProducts(arrayProducts)
            console.log("Eliminado")
        }else{
            console.log("No se encontro nada")
        }
        }catch(error){
            console.log("Error al eliminar el producto", error)
        }
    }
}

module.exports = ProductManager