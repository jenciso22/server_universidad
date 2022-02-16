const express = require("express");
const app = express();


app.use(require("./usuarios"));
app.use(require("./auth"));
app.use(require("./habilidades"));

module.exports = app;