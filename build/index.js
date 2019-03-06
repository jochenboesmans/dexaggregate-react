"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _market = require("./market/market");

_dotenv.default.config();

var express = require("express");

var app = express();

var server = require("http").createServer(app);

(0, _market.initialize)();

require("./routes")(app);

require("./websocketbroadcasts/broadcastSession").initialize(server);

server.listen(process && process.env && process.env.SERVER_PORT || "5000" || 5000);