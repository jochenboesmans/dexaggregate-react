"use strict";

var socketio = require("socket.io");

var _require = require("../market/market"),
    getMarket = _require.getMarket;

var _require2 = require("./updateNotifier"),
    getModelNeedsBroadcast = _require2.getModelNeedsBroadcast,
    setModelNeedsBroadcast = _require2.setModelNeedsBroadcast;

var initialize = function initialize(server) {
  var io = socketio(server);
  io.on("connection", function (socket) {
    socket.emit("marketBroadcast", getMarket());
  });
  setInterval(function () {
    if (getModelNeedsBroadcast()) {
      io.emit("marketBroadcast", getMarket());
      setModelNeedsBroadcast(false);
    }
  }, 100);
};

module.exports = {
  initialize: initialize
};