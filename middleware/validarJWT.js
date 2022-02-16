const jwt = require("jsonwebtoken");
require("dotenv").config();


module.exports = (req, res, next) => {

    const authHeader = req.header("x-token");

    if(authHeader){
        //Comprobar el JWT
        try {
            const usuario = jwt.verify(authHeader, process.env.SECRETA);
            req.usuario = usuario;
            //console.log("Desde middleware " , usuario);
            //res.json({usuario});   
        } catch (error) {
            console.log(error);
            console.log("JWT no valido");
        }

    }
    
    return next();

}