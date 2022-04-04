const express = require("express");
const app = express();
const solicitarControllers = require("../controllers/solicitarControllers");
const { check } = require("express-validator");
const validarCampo = require("../middleware/validar-campos");

app.post("/api/solicitar", 
    [
        check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
        check("idProyecto", "El id del proyecto es obligatorio").not().isEmpty(),
        check("descripcion", "La solicitud requiere una descripcion").not().isEmpty(),
        validarCampo
    ],
    solicitarControllers.solicitarProyecto
);

app.put("/api/solicitar", 
    [
        check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
        check("idSolicitar", "El id del la solicitud es obligatorio").not().isEmpty(),
        check("idProyecto", "El id del proyecto es obligatorio").not().isEmpty(),
        check("estado", "Se debe indicar si la solicitud se acepto o se denego").not().isEmpty(),
        check("descripcion", "Agrega una descripcion al proyecto").not().isEmpty(),
        validarCampo
    ],
    solicitarControllers.editarSolicitud
);

app.delete("/api/solicitar/:idUsuario/:idProyecto/:idSolicitar", 
    // [
    //     check("idUsuario", "El id del usuario es obligatorio").not().isEmpty(),
    //     check("idProyecto", "El id del proyecto es obligatorio").not().isEmpty(),
    //     check("idSolicitar", "El id del la solicitud es obligatorio").not().isEmpty(),
    //     validarCampo
    // ],
    solicitarControllers.eliminarSolicitud
);

app.get("/api/solicitar/alum/:id", 
    solicitarControllers.obtenerSolicitudesDeUnUsuario
);

app.get("/api/solicitar/mtrs/:id", 
    solicitarControllers.obtenerSolicitudDeUnMaestro
);

app.get("/escuchar", solicitarControllers.escuchar);

module.exports = app;