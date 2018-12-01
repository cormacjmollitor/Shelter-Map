"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express = require("express");
var morgan = require("morgan");
var bodyParser = require("body-parser");
var app_1 = require("./configurations/app");
var v1_1 = require("./routes/v1");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var app = express();
/*Configuration*/
app.use(morgan("dev")); // req logging
app.use(bodyParser.json()); // parsing json req formats
app.use(bodyParser.urlencoded({ extended: true })); // parsing form req formats
app.disable("etag");
/*Routes*/
v1_1.default(app);
/*RunServer*/
app.listen(app_1.default.port);
console.log("Server has successfully started on PORT: " + app_1.default.port);
typeorm_1.createConnection();
//# sourceMappingURL=server.js.map