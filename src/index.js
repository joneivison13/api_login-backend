const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");
const route = require("./routes");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "temp")));
app.use(cors());
app.use(route);

app.listen(3333, () => console.log("Servidor rodando!"));
