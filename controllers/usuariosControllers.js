const sql = require("mssql");
const bcrypt = require("bcrypt");
const getConnection = require("../config/db");
const querys = require("../config/querys");

exports.crearUsuario = async (req, res ) => {
    //Validar que no exista usuario con el mismo correo
    let {nombre, apellido, correo, tipoUsuario, password } = req.body;
    ///console.log(req.body);
    try {
        const pool = await getConnection();
        const result = await pool.request().input("correo", correo).query(querys.getUsuarioCorreo);
        if( result.recordset.length > 0){
            return res.status(400).json({
                ok: false,
                msg: "Usuario ya registrado con este correo"
            })
        }
        //Hashear el password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const result2 = await pool
        .request()
        .input("nombre", sql.VarChar, nombre)
        .input("apellido", sql.VarChar, apellido)
        .input("correo", sql.VarChar, correo)
        .input("tipoUsuario", sql.Char, tipoUsuario)
        .input("password", sql.VarChar, password)
        .query(querys.addNewUsuario);

        //console.log(result2);

        res.json({
             ok: true,
             nombre,
             correo
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: "Error en la aplicacion"
        });
    }
}

exports.obtenerUsuarios = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(querys.getUsuarios);
        res.json({
            ok: true, 
            result: result.recordset
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        })
    }
}

exports.obtenerUsuarioId = async (req, res) => {
    const idUsuario = req.params.id;
    try {
        const pool = await getConnection();
        const result = await pool.request().input("idUsuario", idUsuario).query(querys.getUsuariosId);

        if( result.recordset.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "No existe usuario con el ID proporcionado"
            });
        }

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

exports.deleteUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    
    try {
        const pool = await getConnection();
        const result = await pool.request().input("idUsuario", idUsuario).query(querys.deleteUsuario);
        console.log(result);
        res.json({
            ok: true,
            msg: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        })
    }

}

exports.putUsuario = async (req, res) => {
    const idUsuario = req.params.id;
    const { nombre, apellido, direccion, fNacimiento, telefono, correo, acercaDeMi, linkeidn } = req.body;
    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input("nombre", sql.VarChar, nombre)
            .input("apellido", sql.VarChar, apellido)
            .input("direccion", sql.VarChar, direccion)
            .input("fNacimiento", sql.Date , fNacimiento)
            .input("telefono", sql.VarChar, telefono)
            .input("correo", sql.VarChar, correo)
            .input("acercaDeMi", sql.VarChar, acercaDeMi)
            .input("linkeidn", sql.VarChar, linkeidn)
            .input("idUsuario", idUsuario)
            .query(querys.updateUsuarioById);

            res.json({
                ok: true,
                nombre,
                correo,
                msg: "Producto actualizado correctamente"
           });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Ocurrio un error contacte con un administrador"
        })
    }

}