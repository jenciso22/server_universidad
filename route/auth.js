const express = require("express");
const app = express();
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");
const authControllers = require("../controllers/authControllers");
const verificarToken = require("../middleware/validarJWT");

//Obtener login de usuario
app.post("/api/auth" ,
    [
        check("correo", "Debes ingresar una dirección de correo valida").isEmail(),
        check("password", "La contraseña debe tener 6 digitos o más").isLength({ min: 6 }),
        validarCampo
    ],
    authControllers.authUsuario
);

//Renovar token de  usuario
//Header token 
app.get( "/api/renew", 
    [verificarToken],
    authControllers.authRenew
);

module.exports = app;