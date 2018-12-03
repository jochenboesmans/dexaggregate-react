const socketio = require("socket.io");

const getMarket = require("../model/getMarket");
const exchanges = require("../model/exchanges");

module.exports = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    setInterval(() => {
      socket.emit("marketBroadcast", getMarket());
      socket.emit("exchangeBroadcast", exchanges);
    }, 5 * 1000);

  })
};

