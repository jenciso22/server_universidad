const jwt = require("jsonwebtoken");


const generarJWT = ( idUsuario, nombre, apellido, correo, tipoUsuario ) => {

    return new Promise( (resolve, reject) => {

        const payload = { idUsuario, nombre, apellido, correo, tipoUsuario };

        jwt.sign( payload, process.env.SECRETA, {
            expiresIn: '8h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( 'No se pudo generar el token' )
            } else {
                resolve( token );
            }
        });

    });
}

module.exports = generarJWT;