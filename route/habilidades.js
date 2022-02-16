const express = require("express");
const app = express();
/*Habilidades y materias*/
const habilidadController = require("../controllers/habilidadControllers");
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");

/*Agregando habilidad */
app.post("/api/usuario/habilidades", 
    [
        check("habilidad", "Debes agregar una habilidad").not().isEmpty(),
        check("idUsuario", "Debes proporcionar el ID del usuario").not().isEmpty(),
        validarCampo
    ],
    habilidadController.addHabilidad
);

app.get("/api/usuario/habilidad", habilidadController.getHabilidad);

app.delete("/api/usuario/habilidad/:id", habilidadController.deleteHabilidad);

module.exports = app;