const express = require("express")
const router = express.Router()
const UserModel = require("../models/usuario.models.js")

//POST

router.post("/", async (req, res) =>{
    const {first_name, last_name, email, password} = req.body

    try {
        const existeUser = await UserModel.findeOne({email:email})
        if (existeUser){
            return res.status(400).send("El email ya esta registrado")
        }

        const newUser = await UserModel.create({
            first_name,
            last_name,
            email,
            password,
        })

    req.session.user = {
        email: newUser.email,
        first_name: newUser.first_name
    }
    req.session.login = true

    res.status(200).send("Usuario creado exitosamente")

    } catch (error) {
        res.status(500).send("Error al crear el usuario")
    }
})

module.exports = router