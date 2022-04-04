const express = require("express");
const app = express();
const proyectosControllers = require("../controllers/proyectosControllers");
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");

app.post("/api/proyectos", 
    [
        check("idUsuario", "Se requiere el ID del profesor").not().isEmpty(),
        check("nombre", "Se requiere un nombre para el proyecto").not().isEmpty(),
        check("descripcion", "Se requiere una descripcion para el proyecto").not().isEmpty(),
        check("areaInvestigacion", "Indica el area que corresponde a dicha aplicación").not().isEmpty(),
        check("vacante", "Agrega un nombre para la vacante solicitada").not().isEmpty(),
        check("fechaInicio", "Agrega la fecha en que iniciara la vacante").isDate(),
        check("fechaFinal", "Agrega la fecha en la que culmina el proyecto").isDate(),
        validarCampo
    ],
    proyectosControllers.addNewProyecto
);


app.get("/api/proyectos", proyectosControllers.getProyectos); 

app.get("/api/proyectos/mtrs/:id", proyectosControllers.getProyectosMaestros);
app.get("/api/proyectos/alum/:id", proyectosControllers.getProyectosAlumno)

app.put("/api/proyectos/:id",
    [
        check("idUsuario", "Se requiere el ID del Maestro").not().isEmpty(),
        check("nombre", "Se requiere un nombre para el proyecto").not().isEmpty(),
        check("descripcion", "Se requiere una descripcion para el proyecto").not().isEmpty(),
        check("areaInvestigacion", "Indica el area que corresponde a dicha aplicación").not().isEmpty(),
        check("vacante", "Agrega un nombre para la vacante solicitada").not().isEmpty(),
        check("fechaInicio", "Agrega la fecha en que iniciara la vacante").isDate(),
        check("fechaFinal", "Agrega la fecha en la que culmina el proyecto").isDate(),
        validarCampo
    ],
    proyectosControllers.putProyecto
);

app.delete("/api/proyectos/:id/:idUsuario", proyectosControllers.deleteProyecto);

module.exports = app;

// [
//     check("idUsuario", "Se requiere el ID del Maestro").not().isEmpty(),
//     check("nombre", "Se requiere un nombre para el proyecto").not().isEmpty(),
//     check("descripcion", "Se requiere una descripcion para el proyecto").not().isEmpty(),
//     check("areaInvestigacion", "Indica el area que corresponde a dicha aplicación").not().isEmpty(),
//     check("vacante", "Agrega un nombre para la vacante solicitada").not().isEmpty(),
//     check("fechaInicio", "Agrega la fecha en que iniciara la vacante").isDate(),
//     check("fechaFinal", "Agrega la fecha en la que culmina el proyecto").isDate(),
//     validarCampo
// ],