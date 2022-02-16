const express = require("express");
const app =  express();
const usuarioController = require("../controllers/usuariosControllers");
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");

app.post("/api/usuarios", 
    [
        check("nombre", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("apellido", "El apellido de usuario es obligatorio").not().isEmpty(),
        check("correo", "Debes ingresar una direccion de correo valida").isEmail(),
        check("tipoUsuario", "El tipo de usuario es obligatorio").not().isEmpty(),
        check("password", "La contraseña debe contener 6 digitos o más").isLength({ min: 6 }),
        validarCampo
    ],
    usuarioController.crearUsuario
);

app.get("/api/usuarios", usuarioController.obtenerUsuarios);

app.get("/api/usuarios/:id", usuarioController.obtenerUsuarioId);

app.put("/api/usuarios/:id", 
    [
        check("nombre", "El nombre de usuario es obligatorio").not().isEmpty(),
        check("apellido", "El apellido de usuario es obligatorio").not().isEmpty(),
        check("correo", "Debes ingresar una direccion de correo valida").isEmail(),
        validarCampo
    ],
    usuarioController.putUsuario
);

app.delete("/api/usuarios/:id", usuarioController.deleteUsuario);

module.exports = app;