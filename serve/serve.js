const express = require("express");
const app = express();
const cors = require('cors');
require('dotenv').config();


app.use( cors() );
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use(require("../route/index"));

app.listen("4000",  () => {
    console.log("COnectando al servidor");
});