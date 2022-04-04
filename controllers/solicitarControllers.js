const res = require("express/lib/response");
const sql = require("mssql");
const getConnection = require("../config/db");
const querys = require("../config/querys");

exports.solicitarProyecto = async (req, res) => {
    let { idUsuario, idProyecto, descripcion } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("idProyecto", sql.Int, idProyecto)
        .input("descripcion", sql.VarChar, descripcion)
        .query(querys.solicitarProyecto);

        res.json({
             ok: true,
             msg: "Solicitud enviada correctamente"
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: "Error en la aplicacion"
        });
    }
}

exports.editarSolicitud = async (req, res) => {
    let { idUsuario, idSolicitar, idProyecto, estado, descripcion } = req.body;
    console.log(req.body);
    try {
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("idSolicitar", sql.Int, idSolicitar)
        .input("idProyecto", sql.Int, idProyecto)
        .input("estado", sql.VarChar, estado)
        .input("descripcion", sql.VarChar, descripcion)
        .query(querys.editarSolicitud);

        res.json({
             ok: true,
             result: result.recordset
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: "Error en la aplicacion"
        });
    }
}

exports.eliminarSolicitud = async (req, res) => {
    const {idUsuario, idProyecto, idSolicitar} = req.params;

    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("idUsuario", idUsuario)
        .input("idProyecto", idProyecto)
        .input("idSolicitar", idSolicitar)
        .query(querys.eliminarSolicitud);
        res.json({
            ok: true,
            result: result.recordset
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        })
    }
}

exports.obtenerSolicitudesDeUnUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("idUsuario", idUsuario)
        .query(querys.ObtenerSolicitudesDeUnUsuario);

        res.json({
            ok: true, 
            result: result.recordset
        });
   } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        });
   }
}

exports.obtenerSolicitudDeUnMaestro = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("idUsuario", idUsuario)
        .query(querys.ObtenerSolicitudesDeUnMaestro);
        
        res.json({
            ok: true, 
            result: result.recordset
        });

   } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        });
   }
}

exports.escuchar = async () => {
    res.json({mgs: "escuchando"});
}