const moongose = require("mongoose")

const productSchema = new moongose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String
    },
    code: {
        type: String,
        unique: true,
        required: true
    },
    stock:{
        type: Number,
        required: true
    }
})

const ProductModel = moongose.model("products", productSchema)

module.exports = ProductModel