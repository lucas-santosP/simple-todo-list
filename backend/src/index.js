const express = require("express");
const routes = require("./routes");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

server.use(express.json());
server.use(bodyParser.urlencoded({ extended: true })); //habilitando body da req
server.use(cors());

server.use(routes);

server.listen(1414);
