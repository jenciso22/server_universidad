const express = require("express");
const app = express();
/*Habilidades y materias*/
const habilidadController = require("../controllers/habilidadControllers");
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");

/*Agregando habilidad */
app.post("/api/usuario/habilidad",
    [
        check("habilidad", "Debes agregar una habilidad").not().isEmpty(),
        check("idUsuario", "Debes proporcionar el ID del usuario").not().isEmpty(),
        validarCampo
    ],
    habilidadController.addHabilidad
);

app.get("/api/usuario/habilidad/:idUsuario", habilidadController.getHabilidad);

app.delete("/api/usuario/habilidad/:idUsuario/:idHabilidad", habilidadController.deleteHabilidad);


/*Agregando Materia */
app.post("/api/usuario/materia",
     [
         check("materia", "Debes agregar una materia").not().isEmpty(),
         check("idUsuario", "Debes proporcionar el ID del usuario").not().isEmpty(),
         validarCampo
     ],
     habilidadController.addNewMateria
);

app.get("/api/usuario/materia/:idUsuario", habilidadController.getMaterias);

app.delete("/api/usuario/materia/:idUsuario/:idMateria", habilidadController.deleteMateria);

module.exports = app;