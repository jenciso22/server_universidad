const sql = require("mssql");
const bcrypt = require("bcrypt");
const getConnection = require("../config/db");
const querys = require("../config/querys");
const generarJWT = require("../helpers/jwt");

exports.authUsuario = async (req, res) => {
    //Validar que correo exista en usuarios
    //Validar que la contraseña ingrresada sea igual a la hasheada 
    //Generar token
    
    const {correo, password} = req.body;
    
    try {
        const pool = await getConnection();
        const result = await pool.request().input("correo", correo).query(querys.getUsuarioCorreo);

        if( result.recordset.length === 0){
            return res.status(400).json({
                ok: false,
                msg: "Credenciales Invalidas"
            })
        }
         //Comprobar contraseña 
        const {idUsuario, nombre, apellido, tipoUsuario} = result.recordset[0];
        if( bcrypt.compareSync(password, result.recordset[0].password) ){
            //Crear json web token 
           const token = await generarJWT(idUsuario, nombre, apellido, correo, tipoUsuario);
           res.json({
                 ok: true, 
                 idUsuario,
                 nombre,
                 apellido,
                 correo,
                 tipoUsuario,
                 token
           });

        }else{
             res.status(401).json({
                 ok: false,
                 msg: "Credenciales no válidas"
             })
        }
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error en la aplicación, contacte un administrador"
        })
    }
}

exports.authRenew = async (req, res) => {
    //Verificar si el toquen es valido
    if( !req.usuario ){
        return res.status(400).json({
            ok: false,
            msg: "Token no valido"
        });
    }

    const { idUsuario, nombre, apellido, correo, tipoUsuario } = req.usuario;

    //Consultar usuario a la base de datos
    // let usuario = await Usuario.findById(uid);
    // const { correo } = usuario;
    
    //renovar token
    const token = await generarJWT(idUsuario, nombre, apellido, correo, tipoUsuario);

    res.json( 
        { 
            ok: true, 
            idUsuario,
            nombre,
            apellido,
            correo,
            tipoUsuario,
            token
        } 
    );
}