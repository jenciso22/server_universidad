const express = require("express");
const app = express();

app.use(require("./usuarios"));
app.use(require("./auth"));
app.use(require("./habilidades"));
app.use(require("./proyectos"));
app.use(require("./solicitar"));

module.exports = app;