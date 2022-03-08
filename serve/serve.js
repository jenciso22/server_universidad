const express = require("express");
const cors = require('cors');
const socketIO = require("socket.io");
const http = require("http");
//const { socketController } = require("../sockets/socketController");
require('dotenv').config();
const app = express();
const server = http.createServer(app);


app.use( cors() );
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(require("../route/index"));

module.exports.io = socketIO(server);
require("../sockets/socket");

// cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "DELETE", "PUT"]
// }
// }

app.listen("4000",  () => {
    console.log("COnectando al servidor");
});