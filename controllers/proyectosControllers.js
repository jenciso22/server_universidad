const sql = require("mssql");
const getConnection = require("../config/db");
const querys = require("../config/querys");

exports.addNewProyecto =  async (req, res) => {
    let { idUsuario, nombre, descripcion, areaInvestigacion, vacante, fechaInicio, fechaFinal } = req.body;

    try {
        const pool = await getConnection();

        const result = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("nombre", sql.VarChar, nombre)
        .input("descripcion", sql.VarChar, descripcion)
        .input("areaInvestigacion", sql.VarChar, areaInvestigacion)
        .input("vacante", sql.Char, vacante)
        .input("fechaInicio", sql.Date, fechaInicio)
        .input("fechaFinal", sql.Date, fechaFinal)
        .query(querys.altaProyecto);

        res.json({
             ok: true,
             nombre,
             descripcion
        });
    } catch (error) {
        res.status(400).json({
            ok:false,
            msg: "Error en la aplicacion"
        });
    }
}

exports.putProyecto = async (req, res) => {
    const idProyecto = req.params.id;
    let { idUsuario, nombre, descripcion, areaInvestigacion, vacante, fechaInicio, fechaFinal } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("idProyecto", sql.Int, idProyecto)
        .input("idUsuario", sql.Int, idUsuario)
        .input("nombre", sql.VarChar, nombre)
        .input("descripcion", sql.VarChar, descripcion)
        .input("areaInvestigacion", sql.VarChar, areaInvestigacion)
        .input("vacante", sql.Char, vacante)
        .input("fechaInicio", sql.Date, fechaInicio)
        .input("fechaFinal", sql.Date, fechaFinal)
        .query(querys.editarProyecto);

        res.json({
             ok: true,
             msg: "Proyecto actualizado correctamente",
             result
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: "Error en la aplicacion",
            result
        });
    }
}

exports.deleteProyecto = async (req, res) => {
    const idProyecto = req.params.id;
    const idUsuario = req.params.idUsuario;

    try {
        const pool = await getConnection();
        const result = await pool.request()
        .input("idProyecto", idProyecto)
        .input("idUsuario", idUsuario)
        .query(querys.eliminarProyecto);
        
        res.json({
            ok: true,
            msg: "Proyecto eliminado correctamente eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        })
    }
}

exports.getProyectos = async (req, res) => {
    try {
         const pool = await getConnection();
         const result = await pool.request().query(querys.obtenerTodosLosProyectos);
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

exports.getProyectosMaestros = async (req, res) => {
     const idUsuario = req.params.id;
     try {
         const pool = await getConnection();
         const result = await pool.request().input("idUsuario", idUsuario).query(querys.obtenerProyectosGeneradosPorMaestroEspecifico);
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

exports.getProyectosAlumno = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const pool = await getConnection();
        const result = await pool.request().input("idUsuario", idUsuario).query(querys.obtenerProyectosEnLoQueNoestaesealumno);
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