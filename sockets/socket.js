const { io } = require('../serve/serve');
const solicitarControllers = require("../controllers/solicitarControllers");

io.on('connection', (socket) => {
    console.log("Hola mundo");
    //Mandaer notificacion
    //Recibir Notificacion
    //Solicitud en false se envia al maestro
    //Solicitud en true se manda a usuario especifico

    socket.emit("notificar-maestro", () => {
        solicitarControllers.escuchar
    });


});