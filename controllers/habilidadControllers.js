const sql = require("mssql");
const getConnection = require("../config/db");
const querys = require("../config/querys");

//Agregar habilidad 
exports.addHabilidad = async (req, res) => {
    const {idUsuario, habilidad} = req.body;

    try {
        const pool = await getConnection();
        //const result = await pool.request().input("correo", correo).query(querys.getUsuarioCorreo);
        // if( result.recordset.length > 0){
        //     return res.status(400).json({
        //         ok: false,
        //         msg: "Usuario ya registrado con este correo"
        //     })
        // }

        const result2 = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("habilidad", sql.VarChar, habilidad)
        .query(querys.addNewHabilidad);

        res.json({
             ok: true,
             habilidad,
             msg: "Habilidad agregada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }

}

//Obtener Habilidad
exports.getHabilidad = async (req, res) => {
    const { idUsuario } = req.params;
    //console.log(idUsuario);
    try {
        const pool = await getConnection();

        const result2 = await pool
        .request()
        .input("idUsuario", idUsuario)
        .query(querys.obtenerHabilidades);
        res.json({
             ok: true,
             result: result2.recordset
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

//Eliminar Habilidad
exports.deleteHabilidad = async (req, res) => {
    const { idUsuario, idHabilidad } = req.params;

    try {
        const pool = await getConnection();

        const result2 = await pool
        .request()
        .input("idUsuario", idUsuario)
        .input("idHabilidad", idHabilidad)
        .query(querys.deleteHabilidad);

        res.json({
             ok: true,
             msg: "Habilidad eliminada con exito"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

/*Agregar materias */

exports.addNewMateria = async (req, res) => {
    const { idUsuario, materia } = req.body;

    try {
        const pool = await getConnection();

        const result2 = await pool
        .request()
        .input("idUsuario", sql.Int, idUsuario)
        .input("materia", sql.VarChar, materia)
        .query(querys.addNewMateria);

        res.json({
             ok: true,
             materia,
             msg: "Materia agregada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

exports.getMaterias = async (req, res) => {
    const { idUsuario } = req.params;
    //console.log(idUsuario);
    try {
        const pool = await getConnection();

        const result2 = await pool
        .request()
        .input("idUsuario", idUsuario)
        .query(querys.obtenerMaterias);
        res.json({
             ok: true,
             result: result2.recordset
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}

exports.deleteMateria = async (req, res) => {
    const { idUsuario, idMateria } = req.params;

    try {
        const pool = await getConnection();

        const result2 = await pool
        .request()
        .input("idUsuario", idUsuario)
        .input("idMateria", idMateria)
        .query(querys.deleteMaterias);

        res.json({
             ok: true,
             msg: "Materia eliminada con exito"
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            error
        });
    }
}