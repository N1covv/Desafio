const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://nicoveron09:zt87hb6910@cluster0.748gfp0.mongodb.net/Ecommerce-Desafio?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=> console.log("Conecction Successful"))
    .catch((error)=>console.log("Error Conecction", error))