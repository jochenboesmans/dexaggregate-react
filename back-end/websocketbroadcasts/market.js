const socketio = require("socket.io");

const market = require("../model/market");

module.exports = (server) => {
  const io = socketio(server);

  io.on("connection", (socket) => {
    setInterval(() => {
      socket.emit("marketBroadcast", market.globalMarket);
      socket.emit("exchangeBroadcast", market.exchanges);
      console.log("marketBroadcast");
    }, 5 * 1000);

  })
};

