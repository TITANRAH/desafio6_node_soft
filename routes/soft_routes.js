const express = require("express");
const ruta = express.Router();
const {
create,
login,
getUser
} = require("../controllers/soft_controllers");

ruta.route("/usuarios")
    .post(create)
    .get(getUser)
ruta.route("/login")
    .post(login)

    
module.exports = ruta;
    
