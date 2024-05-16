const express = require("express")
const router = express.Router()
const UserModel = require("../models/usuario.models.js")

router.post("/login", async(req, res)=>{
    const{email,password} = req.body

    try {
        const user = await UserModel.findOne({email:email})
        if(user) {
            if(user.password === password) {
                req.session.login = true
                req.session.user = {
                    email: user.email,
                    first_name: user.first_name
                }
                res.redirect("/profile")
            }else{
                res.status(401).send("Contraseña no valida")
            }
        } else {
            res.status(404).send("No se encontro el usuario")
        }
    } catch (error) {
        res.status(400).send("Error")
    }
})

router.get("/logout", (req, res)=>{
    if(req.session.login){
        req.session.destroy()
    }
    res.redirect("/login")
})

module.exports = router